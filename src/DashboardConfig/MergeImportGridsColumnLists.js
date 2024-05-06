const fs = require('fs')

const current = JSON.parse(fs.readFileSync('./current.json'))
const more = JSON.parse(fs.readFileSync('./morecolumn.json'))
const combined = JSON.parse(fs.readFileSync('./current.json'))

for(let i = 0; i < current.importGrids.length; i++)
{
    console.log(current.importGrids[i].view)
    console.log(more.importGrids[i].view)

    const currentColumns = current.importGrids[i].columns
    const currentNames = currentColumns.map(c => c.name)
    
    const moreColumns = more.importGrids[i].columns
    
    for(let j = 0; j < moreColumns.length; j++)
    {
        if( ! currentNames.includes(moreColumns[j].name))
        {
            combined.importGrids[i].columns.push(moreColumns[j])
        }
    }
}

fs.writeFileSync('./combined.json', JSON.stringify(combined, null, 4))