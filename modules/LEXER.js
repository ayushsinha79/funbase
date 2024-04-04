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

module.exports= lexer