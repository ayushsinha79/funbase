const lexer = require('./LEXER')
const parser = require('./PARSER')
const codeGen = require('./CODE_GEN')

function compiler (input) {
    const tokens = lexer(input)
    const ast = parser(tokens)
    const executableCode = codeGen(ast)
    return executableCode
}

module.exports = compiler