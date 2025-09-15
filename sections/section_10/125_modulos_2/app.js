// const multiplicacao = require('./mod');
// console.log(multiplicacao(2, 2));

const DogClass = require('./mod.js');
const dog = new DogClass('Carlos Miguel');
console.log(dog.latir());

const path = require('path');
// Caminho absoluto até a pasta pai do arquivo:
console.log(__dirname);
// Caminho absolute até o arquivo:
console.log(__filename);
// Manipulação de caminho de arquivos:
console.log(path.resolve(__dirname, '..', '..'));