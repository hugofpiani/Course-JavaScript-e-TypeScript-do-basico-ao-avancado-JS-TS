// Importando apenas as funções assincronas de 'fs':
const fs = require('fs').promises;
const path = require('path');

// Logando o nosso arquivo atual:
fs.readdir(path.resolve(__dirname))
    .then(files => console.log(files))
    .catch(e => console.log(e));

async function readDir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname);
    const files = await fs.readdir(rootDir);

    walk(files, rootDir);
}

async function walk(files, rootDir) {
    for(let file of files){
        const fileFullPath = path.resolve(rootDir, file);

        const stats = await fs.stat(fileFullPath);

        if (/\.git/g.test(fileFullPath) || /node_modules/g.test(fileFullPath) ) {
            continue;
        }
        
        if (stats.isDirectory()) {
            readDir(fileFullPath);
            continue;
        }

        console.log(file, stats.isDirectory());
    }
}

readDir(path.resolve(__dirname, '..', '..'));