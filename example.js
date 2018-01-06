const fs = require('fs')
const {emails} = require('./emails.json')
const utils = require('./utils')
//Structure of folder
/*
data -
    | - 0 - 1
    | - 1 - 2 
    | - a - b 
    | - b - a - c.file
            | - d.file
*/
emails.forEach(email => {
    console.log('Searching for:', email)
    const path = utils.findRelatedFilePath(email)
    if (path === null) {
        console.log('No corresponding file found for', email, '\n')
        return
    }
    console.log('Found file:', path)
    const data = fs.readFileSync(path, 'utf8')
    const queryResults = utils.queryDataForPasswords(email, data) //returns {email, passwords}
    const foundPasswords = queryResults.passwords

    const formattedResults = foundPasswords.join(', ')
    console.log(`Found ${foundPasswords.length} password/s`)
    console.log(`Query results: \n${formattedResults}`) 
})

