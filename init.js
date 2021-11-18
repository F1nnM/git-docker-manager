const clone = require('git-clone/promise');
const fs = require('fs');
const path = require('path')
const deploy = require("./deploy");
const del = require('del');

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

const clonePath = "cloned-repo";

(async () => {
  del.sync([clonePath+"/**", clonePath+"/.**", "!"+clonePath])

  let cloneUrl
  const pat = process.env.PAT
  if(pat){
    cloneUrl = `https://user:${pat}@github.com/${process.env.REPOSITORY}`
  }else{
    cloneUrl = `https://github.com/${process.env.REPOSITORY}`
  }
  
  try {
    await clone(cloneUrl, clonePath, {args: ["--recursive", "-j8"]})
  } catch (e) {
    console.error(e)
    return
  }

  deploy(buildFileTree(clonePath)["compose"], () => console.log("Done!"))
})()
