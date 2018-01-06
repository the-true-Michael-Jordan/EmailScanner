const fs = require('fs')//Filestream object to read/write files on the local disk
const {emails} = require('./emails')
const dataURL = 'D:/Documents/BreachCompilation/data'
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
    //Split element into array of letters
    const letters = email.split('')
    //Build URL
    //console.log(email)
    let buildUrl = `${dataURL}/${letters[0]}/${letters[1]}`
    //Check if URL is a file or directory
    fs.lstat(buildUrl, (err, stats) => {
        if(err) {
            console.log(err)
        }
        if(stats.isDirectory()){
            //If URL is directory, append extra letter to find the file
            buildUrl = buildUrl.concat(`/${letters[2]}`)
        }

        //Readfile for email
        const data = fs.readFileSync(buildUrl, 'utf-8')


        //=========CODE BELOW HERE DOES NOT RUN //
        console.log('Found file. . .')
        console.log('Searching for: ', email)
        if(data.includes(email)){
            let lastFoundEmail = 0
            while (true) {
                const emailPosition = data.indexOf(email, lastFoundEmail + 1)
                if (emailPosition === -1) break;
                const endOfLinePosition = data.indexOf('\n', emailPosition)
                const credentialsRawData = data.slice(emailPosition, endOfLinePosition)
                const password = credentialsRawData.split(':')[1]
                lastFoundEmail = emailPosition
                console.log('Found: ', email)
                console.log('Password: ', password)
            }
        } else {
         console.log('Not Found')
        }
    })
})

