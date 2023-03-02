const fs = require('fs');
const ini = require('ini');
const path = require('path');

export default (moduleName: string): any => {
    const configFile: string = fs.readFileSync(path.resolve(__dirname, '../configs/settings.ini'), 'utf-8');
    return ini.parse(configFile)[moduleName]
}
