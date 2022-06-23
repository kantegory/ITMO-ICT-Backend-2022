import ini from 'ini'
import fs from 'fs'

const configParser = (path: string, moduleName: string): any => {
    const configFile: string = fs.readFileSync(path, 'utf-8')
    return ini.parse(configFile)[moduleName]
}

export default configParser
