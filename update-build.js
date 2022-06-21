const fs = require('fs')
const filePath = './package.json'

const packageJson = JSON.parse(fs.readFileSync(filePath).toString())
packageJson.buildDate = new Date().getTime()

fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2))

const jsonData = {
    buildDate: packageJson.buildDate
}

const jsonContent = JSON.stringify(jsonData)

fs.writeFile('./public/meta.json', jsonContent, 'utf8', function (error) {
    if (error) {
        return error
    }
})
