// Definindo uma classe para ser exportada
class Pessoa {
    constructor(nome) {
        this.nome = nome;
    }
}

// Constantes para exportação
const nome = 'Carlos';
const sobrenome = 'roberto';

// Função que pode ser exportada
const falaNome = () => {
    // console.log(nome + sobrenome);
};

// Exportando funções e classes individualmente
// module.exports.falaNome = falaNome; // Forma alternativa de exportar
exports.falaNome = falaNome;  // Atalho para module.exports.falaNome
exports.Pessoa = Pessoa;      // Atalho para module.exports.Pessoa

// Sobrescreve todas as exportações anteriores (apenas nome e sobrenome serão exportados)
module.exports = {
    nome, sobrenome
}

// 'this' aponta para 'module.exports' no escopo global de um módulo
this.qualquerCoisa = 'Qualquer coisa.';

// console.log(module); // Útil para depuração do objeto module
