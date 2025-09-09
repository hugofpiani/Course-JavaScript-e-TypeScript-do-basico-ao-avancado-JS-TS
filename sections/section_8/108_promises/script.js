// Função para gerar um número aleatório em milissegundos
// Recebe valores em segundos e converte para milissegundos
function rand(min, max) {
    min *= 1000; // Converte o valor mínimo de segundos para milissegundos
    max *= 1000; // Converte o valor máximo de segundos para milissegundos

    // Retorna um número aleatório entre min e max (em milissegundos)
    return Math.floor(Math.random() * (max - min) + min)
}

// Função que simula uma operação assíncrona com delay
// Retorna uma Promise que resolve após um tempo determinado
function esperaAi(msg, temp) {
    return new Promise((resolve, reject) => {
        // Verifica se a mensagem é uma string
        if (typeof msg !== 'string') {
            reject() // Rejeita a Promise se não for string
        };

        // Define um timeout para simular operação assíncrona
        setTimeout(() => {
            resolve(msg) // Resolve a Promise com a mensagem após o tempo especificado
        }, temp)
    });
};

// Cadeia de Promises - demonstra o uso de .then() para encadear operações assíncronas
esperaAi('Alou?', rand(2, 7)) // Primeira Promise: espera entre 2-7 segundos
    .then(resposta => {
        console.log(resposta); // Exibe a primeira resposta
        return esperaAi('Olá?', rand(3, 5));
    })
    .then(resposta => {
        console.log(resposta); // Exibe a segunda resposta
        return esperaAi(1, rand(1, 9));
    })
    .catch(e => {
        // Captura qualquer erro que ocorra em qualquer parte da cadeia
        console.log('Error!', e);
    });

// Métodos estáticos da classe Promise para controle avançado:
// 'Promise.all()' - Espera todas as Promises resolverem (falha se uma falhar)
// 'Promise.race()' - Resolve com a primeira Promise que completar (seja sucesso ou erro)
// 'Promise.resolve()' - Cria uma Promise já resolvida
// 'Promise.reject()' - Cria uma Promise já rejeitada