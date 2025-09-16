const path = require('path');

const escrever = require('./modulos/escrever');
const ler = require('./modulos/ler');

const caminhoArquivoTxt = path.resolve(__dirname, 'teste.txt');
const caminhoArquivoJson = path.resolve(__dirname, 'teste.json');

const pessoas = [
    { nome: 'Carlos' },
    { nome: 'Cleber' },
    { nome: 'Cesar' },
    { nome: 'Amarindo' }
];
const json = JSON.stringify(pessoas, '', 2);

escrever.escreverTxt(caminhoArquivoTxt, 'Alo!\n');
escrever.escreverJson(caminhoArquivoJson, json);

ler(caminhoArquivoJson)
    .then(dados => console.log(dados));