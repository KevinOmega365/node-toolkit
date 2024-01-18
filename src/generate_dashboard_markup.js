
// todo...
// const fs = require('fs')

// todo...
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

const existingMarkup = "EXISTING_MARKUP_FROM_INTEGRATIONS_DASHBOARD_CONFIGURATION"

const columnConfig = {
    "columnDataField": "documentNumber",
    "pimsExistenceColumnName": "DocExistsInDCS",
    "pimsEntityLinkBaseUrl": "/dcs-documents-details",
    "pimsEntityLinkQueryStringParameters": [
        ["Domain", "DCS_Domain"],
        ["DocID", "documentNumber"]
    ],
    "apiViewerDataTargetField": "objectID",
    "apiViewerDataTargetSystem": "DTS Munin-Aibel",
    "apiViewerDataTargetEndpointname": "Documents",
    "apiViewerDataTargetEndpointType": "REST"
}

const generateMarkup = ({
    columnDataField,
    pimsExistenceColumnName,
    pimsEntityLinkBaseUrl,
    pimsEntityLinkQueryStringParameters,
    apiViewerDataTargetField,
    apiViewerDataTargetSystem,
    apiViewerDataTargetEndpointname,
    apiViewerDataTargetEndpointType
}) => {
    let ret = ""
    
    // conditional link Pims
    ret += `<span data-if='currentRow.${pimsExistenceColumnName} == 1'>`
    ret += `<a data-attr='href:${pimsEntityLinkBaseUrl}`
    ret += "?"
    ret += pimsEntityLinkQueryStringParameters.map(([key, value]) => `${key}=&lt%=${value}%&gt`).join('&')
    ret += "' target='_blank'>"
    ret += `<span data-field='${columnDataField}'></span>`
    ret += "</a>"
    ret += "</span>"
    // conditional no Pims link
    ret += `<span data-if='currentRow.${pimsExistenceColumnName} == 0'`
    ret += ` data-field='${columnDataField}'></span>`
    // API viewer link
    ret += "<div class='float-right pr-1 cursor-pointer'>"
    ret += "<a"
    ret += " data-target-action='API_JSON_VIEWER'"
    ret += ` data-target-field='${apiViewerDataTargetField}'`
    ret += ` data-target-system='${apiViewerDataTargetSystem}'`
    ret += ` data-target-endpointname='${apiViewerDataTargetEndpointname}'`
    ret += ` data-target-endpoint-type='${apiViewerDataTargetEndpointType}'`
    ret += " class=''"
    ret += " title='Click to show raw response from source'"
    ret += ">"
    ret += "<i class='far fa-cloud-download' aria-hidden='true'></i>"
    ret += "</a>"
    ret += "</div>"

    return ret
}

const generatedMarkup = generateMarkup(columnConfig)
console.log(generatedMarkup)

///////////////////////////////////////////////////////////////////// testing //

// console.log()
// console.log(`Generated markup ${
//     existingMarkup === generatedMarkup ? 'matches' : 'does not match'
//     } existing markup`)
// console.log()
// if(existingMarkup === generatedMarkup) {
//     // console.log(generatedMarkup) // tmi
// }
// else
// {
//     const { index, matchingPart } = findFirstMismatch(existingMarkup, generatedMarkup)
//     console.log(`The existing markup and the generated markup match to index ${index}`)
//     console.log(matchingPart)
// }

////////////////////////////////////////////////////////////////////////////////

/**
 *  work by ChatGPT 3.5
 * Would you write me a function in JavaScript that returns the first index where two string fail to match.
 * The function should return and object that contains the index and the matching parts of the string.
 */
function findFirstMismatch(str1, str2) {
    const minLength = Math.min(str1.length, str2.length);
    let index = 0;
  
    while (index < minLength && str1[index] === str2[index]) {
      index++;
    }
  
    const matchingPart = str1.substring(0, index);
  
    return {
      index,
      matchingPart
    };
  }