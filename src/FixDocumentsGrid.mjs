import fs from 'fs'

const columnOrder = JSON.parse(fs.readFileSync('DocumentsColumnOrder.json'))
const config = JSON.parse(fs.readFileSync('CurrentConfig.json'))

const documentGrid = config.importGrids.find(g => g.id === 'gridDocuments')

const documentGridIndex =
    config.importGrids.findIndex(g => g.id === 'gridDocuments')
console.log(documentGridIndex)

const newColumn = (name) => ({
    name,
    caption: name,
    distinct: true,
    width: '100px'
})

const documentGridColumns = []
for(let i = 0; i < columnOrder.length; i ++)
{
    const column = 
        documentGrid.columns.find(c => c.name === columnOrder[i]) ??
        newColumn(columnOrder[i])

    if(
        (
            ! column.name.startsWith('DCS_') ||
            [
                'DCS_AssetCustomText1',
                'DCS_DocsCustomFreeText1',
                'DCS_DocsCustomText1',
                'DCS_DocsCustomText2',
                'DCS_DocsCustomText3',
                'DCS_DocsCustomText4',
                'DCS_Flag',
                'DCS_InstanceCustomText2',
                'DCS_InstanceCustomText3',
                'DCS_Comments'
            ].includes(column.name)
        ) && 
        ! [
            'INTEGR_REC_STATUS',
            'INTEGR_REC_ERROR',
            'companyDistribution',
            'otherCompanyDistributions_CONCATENATED'
        ].includes(column.name)
    ) {
        column.hidden = true
    }

    if(column.name.startsWith('DCS_'))
    {
        column.caption = column.name.substring(4)
    }

    if(['DCS_Domain', 'DCS_DocumentID'].includes(column.name))
    {
        column['class'] = 'bckground'
    }

    if(column.name === 'DCS_Title')
    {
        column.width = '300px'
    }

    documentGridColumns.push(column)
}

documentGrid.columns = documentGridColumns

fs.writeFileSync('UpdatedConfig.json', JSON.stringify(config, null, 2))