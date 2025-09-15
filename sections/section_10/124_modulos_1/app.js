// Importando o módulo inteiro (receberá apenas nome e sobrenome devido ao module.exports no final do arquivo mod1.js)
const mod1 = require('./mod1');

// Importando módulo nativo do Node.js
const path = require('path');

// Importando elementos específicos do módulo (disponíveis por terem sido exportados antes do module.exports final)
const { Pessoa } = require('./mod1');
const { nome, sobrenome, falaNome } = require('./mod1');

// console.log(mod1);     // Útil para verificar o que foi importado
// console.log(path);     // Verificar o módulo path

// Criando uma instância da classe importada
const p1 = new Pessoa('Sergio');
// console.log(p1);       // Verificar a instância criada

// Importando e usando o módulo axios (biblioteca externa)
const axios = require('axios');

// Fazendo uma requisição HTTP com axios
axios('https://jsonplaceholder.typicode.com/todos')
    .then(response => console.log(response.data))  // Tratando resposta com sucesso
    .catch(e => console.log(e));                   // Tratando erros
