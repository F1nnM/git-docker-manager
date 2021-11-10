const { execFile, spawn } = require('child_process');
const { stdout } = require('process');

module.exports = function deploy(toCompose, callback) {
  if (toCompose) {
    if (typeof toCompose === "string")
      throw new Error("./compose is not a directory!")

    for (const project in toCompose){
      if (typeof toCompose[project] === "string"){
        console.error(`${project} is not a directory!`)
        continue
      }
      proc = spawn('docker-compose', ['-f', toCompose[project]['docker-compose.yml'], 'up', '-d', '--remove-orphans', '--build', '-t', '180'])
      proc.stdout.on('data', (data) => {
        let header = `(${new Date().toLocaleTimeString('en-US')})[${project}]: `
        console.log(`${header}${(""+data).replace(/\n(.+)/gi, `\n${header}$1`)}`);
      })
      proc.stderr.on('data', (data) => {
        let header = `(${new Date().toLocaleTimeString('en-US')})[${project}]: `
        console.error(`${header}${(""+data).replace(/\n(.+)/gi, `\n${header}$1`)}`);
      })
      proc.on('exit', (code) => {
        console.log(`${project} exited with code ${code}`);
        callback(code)
      })
      proc.on('error', (code) => {
        console.error(`${project} failed to deploy`);
        callback(code)
      })
    }
  }
}
