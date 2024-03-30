const fs = require('fs')

function lexer (input) {
        const tokens = []
        let cursor = 0;


        while( cursor < input.length) {
            let char = input[cursor]

            //skip whitespace
            if (/\s/.test(char)) {
                cursor++
                continue
            }

            if(/[a-zA-Z]/.test(char)) {
                let word = ''
                while(/[a-zA-Z0-9]/.test(char) && cursor < input.length) {
                    word += char
                    char = input[++cursor]
                }

                if(word === 'dekh' || word === 'bol'){
                    tokens.push({type: 'Keyword', value: word})
                } else {
                    tokens.push({type: 'Identifier', value: word})
                }

                continue
            }

            if(/[0-9]/.test(char)){
                let num = ''
                while(/[0-9]/.test(char)){
                    num += char
                    char = input[++cursor]
                }
                tokens.push({type: 'number', value: parseInt(num)})
                continue
            }

            if(/[\+\-\*\/=]/.test(char)){
                tokens.push({type: 'Operator', value: char})
                cursor++
                continue
            }
        }
        return tokens
}

function parser(tokens) {
    const ast = {
        type: 'Program',
        body: []
    }

    while(tokens.length > 0) {
        let token = tokens.shift()

        if(token.type === 'Keyword' && token.value === 'dekh'){
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            }
            // Check for assignment
            if(tokens[0].type === 'Operator' && tokens[0].value === '='){
                tokens.shift()

                let expression = ''
                while(tokens.length > 0 && tokens[0].type !== 'Keyword'){
                    expression += tokens.shift().value
                }
                declaration.value = expression.trim()
            }

            ast.body.push(declaration)
        }

        if(token.type === 'Keyword' && token.value === 'bol'){
            ast.body.push ({
                type: 'Print',
                expression: tokens.shift().value
            })
        }

    }
    return ast
}

function codeGen(node) {
    switch(node.type) {
        case 'Program' :return node.body.map(codeGen).join('\n')
        case 'Declaration' : return `const ${node.name} = ${node.value}`
        case 'Print' : return `console.log(${node.expression})`
    }
}

function compiler (input) {
    const tokens = lexer(input)
    const ast = parser(tokens)
    const executableCode = codeGen(ast)
    return executableCode
}

function runner (input) {
    eval(input)
}

function run(filename) {
    const code = fs.readFileSync(filename, 'utf8');
    const executable = compiler(code)
    runner(executable)
}

module.exports= {
    run
}