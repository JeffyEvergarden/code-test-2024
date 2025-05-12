const childProcess = require('child_process')
const currentTag = () => {
  try {
    return childProcess.execSync('git describe --tags').toString().trim()
  } catch (err) {
    console.error(err)
    return new Date().toLocaleDateString().replace(/\//g, '-')
  }
}

const _currentTag = currentTag()
console.log(_currentTag)
