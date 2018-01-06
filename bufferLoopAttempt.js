const fs = require('fs')//Filestream object to read/write files on the local disk
const {emails} = require('./emails')
const dataURL = 'D:/Documents/BreachCompilation/data'


emails.forEach(email => {
    const letters = email.split('')

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
        let foundEmail = false
        const fileSizeMB = (fs.statSync(buildUrl).size()) / 1000000.0
        do {
        fs.read(buildUrl, 'utf-8', )

        } while(!foundEmail && fileSize > 256)

    })
})