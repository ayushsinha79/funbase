function codeGen(node) {
    switch(node.type) {
        case 'Program' :return node.body.map(codeGen).join('\n')
        case 'Declaration' : return `const ${node.name} = ${node.value}`
        case 'Print' : return `console.log(${node.expression})`
    }
}

module.exports = codeGen