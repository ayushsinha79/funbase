const fs = require('fs')
const compiler = require('./modules/COMPILER')
const runner = require('./modules/RUNNER')


function run(filename) {
    const code = fs.readFileSync(filename, 'utf8');
    const executable = compiler(code)
    runner(executable)
}

// for testing purpose
run('./test_files/testingCode.fb')

module.exports= {
    run
}
