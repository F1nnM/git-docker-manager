var express = require('express')
const {hook} = require('express-git-hook')

const mw = hook(process.env.WATCHED_REPO, "./cloned-repo")

var app = express()

app.post('/', mw, (req, res) => {
    // res.locals.files contains a list of all files with their full paths

    // async wrapper so errors don't interupt anything else
    (async () => {
      const toCompose = res.locals.files["compose"]
      if( toCompose ){
        if ( typeof toCompose === "string")
          throw new Error("./compose is not a directory!")
  
        for (const project of toCompose)
          // async wrapper so errors don't interrupt other deployments
          (async (project) => {
            if (typeof project === "string")
              throw new Error(`${project} is not a directory!`)
            
            exec('docker-compose up -d --remove-orphans', {cwd: project}, (error, stdout, stderr) => {
              if(err)
                throw new Error(stderr)
              else console.log(stdout)
            })

          })()
      }
    })()
})

app.listen(5000, "0.0.0.0", () => {
  console.log("listening")
})