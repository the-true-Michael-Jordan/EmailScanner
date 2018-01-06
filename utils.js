const fs = require('fs')
const path = require('path')
module.exports = {
    queryDataForPasswords(email, data) {
        let passwords = []
        if(data.includes(email)){
            let lastFoundEmail = 0
            while (true) {
                const emailPosition = data.indexOf(email, lastFoundEmail)
                if (emailPosition === -1) break
                const endOfLinePosition = data.indexOf('\n', emailPosition)
                const emailPasswordPair = data.slice(emailPosition, endOfLinePosition)
                const password = emailPasswordPair.split(':')[1]
                passwords.push(password)
                lastFoundEmail = endOfLinePosition
            }
        }
        return {email, passwords}
    },
    findRelatedFilePath(email, dataPath = path.resolve('./data')) {
        const lowCaseLetters = email.toLowerCase()
        let path = `${dataPath}/${lowCaseLetters[0]}/${lowCaseLetters[1]}`
        if (fs.existsSync(path)) {
            const fileStats = fs.lstatSync(path)
            return fileStats.isDirectory() ? `${path}/${lowCaseLetters[2]}` : path
        }
        return null
    }
}