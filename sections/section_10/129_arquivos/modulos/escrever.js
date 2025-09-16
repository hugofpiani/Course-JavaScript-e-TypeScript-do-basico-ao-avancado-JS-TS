const fs = require('fs').promises;

const escreverTxt = (caminho, frase) => fs.writeFile(caminho, frase, { flag: 'w' /*'a'*/, encoding: 'utf8' });
const escreverJson = (caminho, json) => fs.writeFile(caminho, json, { flag: 'w' /*'a'*/, encoding: 'utf8' });

module.exports = {
    escreverTxt,
    escreverJson
};