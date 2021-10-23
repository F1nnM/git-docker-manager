var express = require('express')
const { hook } = require('express-git-hook')
const { exec, execFile } = require('child_process');
const { stdout } = require('process');

const mw = hook(process.env.WATCHED_REPO, "./cloned-repo")

var app = express()

app.post('/', mw, (req, res) => {
  // res.locals.files contains a list of all files with their full paths

  // async wrapper so errors don't interupt anything else
  (async () => {
    const toCompose = res.locals.files["compose"]
    if (toCompose) {
      if (typeof toCompose === "string")
        throw new Error("./compose is not a directory!")

      for (const project in toCompose)
        // async wrapper so errors don't interrupt other deployments
        (async (project) => {
          if (typeof toCompose[project] === "string")
            throw new Error(`${project} is not a directory!`)

          execFile('/usr/local/bin/docker-compose', ['-f', toCompose[project]['docker-compose.yml'], 'up', '-d', '--remove-orphans'], async (error, stdout, stderr) => {
            if (error) {
              console.error(stderr)
              throw error
            }
            else console.log(stdout)
            res.status(200).end()
          })

        })(project)
    }
  })()
})

app.listen(5000, "0.0.0.0", () => {
  console.log("listening")
})