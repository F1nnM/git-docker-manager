const clone = require('git-clone/promise');
const fs = require('fs');
const path = require('path')
const deploy = require("./deploy")

// taken from express-git-hook's source
function buildFileTree(rootDir) {
  var dir = {}
  fs.readdirSync(rootDir).forEach(file => {
    if (file == ".git")
      return
    let filePath = path.resolve(rootDir, file)
    if (fs.lstatSync(filePath).isDirectory()) {
      dir[file] = buildFileTree(filePath)
    } else {
      dir[file] = filePath
    }
  })
  return dir
}

const clonePath = "./cloned-repo";

(async () => {
  if (fs.existsSync(clonePath)) {
    fs.rmdirSync(clonePath, { recursive: true })
  }

  await clone("https://github.com/" + process.env.REPOSITORY, clonePath)

  deploy(buildFileTree(clonePath)["compose"], () => console.log("Done!"))
})()
