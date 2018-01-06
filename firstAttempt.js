const fs = require('fs')//Filestream object to read/write files on the local disk
const {emails} = require('./emails.json')
const dataURL = 'D:/Documents/BreachCompilation/data'
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
    const path = utils.findRelatedFilePath(email)
    if (path === null) return
    console.log('Found file: ', path)
    console.log('Searching for: ', email)
    const data = fs.readFileSync(path, 'utf8')
    const queryResults = utils.queryDataForPasswords(email, data)
    console.log('Query results', queryResults)
})

