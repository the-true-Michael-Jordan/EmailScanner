module.exports = {
    findPasswordsInBlob(email, blob) {
        if(blob.includes(email)){
            let passwords = []
            let lastFoundEmail = 0
            while (true) {
                const emailPosition = blob.indexOf(email, lastFoundEmail)
                if (emailPosition === -1) break
                const endOfLinePosition = blob.indexOf('\n', emailPosition)
                const emailPasswordPair = blob.slice(emailPosition, endOfLinePosition)
                const password = emailPasswordPair.split(':')[1]
                passwords.push(password)
                lastFoundEmail = endOfLinePosition
            }
            return passwords
        } else {
            return []
        }
    },
    findRelatedFilePath(email) {
        const letters = email.split('')
        let path = `${dataURL}/${letters[0]}/${letters[1]}`
        const fileStats = fs.lstatSync(buildUrl)
        return stats.isDirectory() ? `${path}/${letters[2]}` : path
    }
}