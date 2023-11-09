const fs = require('fs')

const query_text = fs.readFileSync('../data/query.graphql').toString()

const remove_line_breaks = (s) => s.replace(/(\r\n)+|\r+|\n+|\t+/g, '')
const reduce_whitespace = (s) => s.replace(/\s+/g, ' ')
const tighten_control_control = (s) => s.replace(/([,:{}()$"])\s+([,:{}()$"])/g, '$1$2')
const tighten_control_word = (s) => s.replace(/([,:{}()"])\s+(\w)/g, '$1$2')
const tighten_word_control = (s) => s.replace(/(\w)\s+([,:{}()"])/g, '$1$2')

const output = remove_line_breaks(
    reduce_whitespace(    
        tighten_control_control(
            tighten_control_control( // misses triplets
                tighten_control_word(
                    tighten_word_control(query_text)
                )
            )
        )
    )
)
.trim()

console.log(query_text.length)

fs.writeFileSync('../data/ugly.graphql', output)