var express = require('express')
const { hook } = require('express-git-hook')

const deploy = require("./deploy")

const mw = hook(process.env.WATCHED_REPO, "./cloned-repo")

var app = express()

app.post('/', mw, (req, res) => {
  // res.locals.files contains a list of all files with their full paths
  deploy(res.locals.files["compose"], res.status(200).end)
})

app.listen(5000, "0.0.0.0", () => {
  console.log("listening")
})