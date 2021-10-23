const { execFile } = require('child_process');
const { stdout } = require('process');

module.exports = function deploy(toCompose, callback) {
  if (toCompose) {
    if (typeof toCompose === "string")
      throw new Error("./compose is not a directory!")

    for (const project in toCompose)
      // async wrapper so errors don't interrupt other deployments
      (async (project) => {
        if (typeof toCompose[project] === "string")
          throw new Error(`${project} is not a directory!`)

        execFile('/usr/local/bin/docker-compose', ['-f', toCompose[project]['docker-compose.yml'], 'up', '-d', '--remove-orphans', '--build'], async (error, stdout, stderr) => {
          if (error) {
            console.error(stderr)
            throw error
          }
          else console.log(stdout)
          callback()
        })

      })(project)
  }
}
