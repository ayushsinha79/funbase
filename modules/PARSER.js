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

module.exports = parser