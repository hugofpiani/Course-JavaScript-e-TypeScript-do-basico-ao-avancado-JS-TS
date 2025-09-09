/* 
ASYNC/AWAIT: Uma sintaxe mais limpa e legível para trabalhar com Promises
- 'async': palavra-chave que marca uma função como assíncrona
- 'await': palavra-chave que pausa a execução até a Promise ser resolvida
- Transforma código assíncrono para parecer síncrono
- Facilita o tratamento de erros com try/catch
*/

function rand(min, max) {
    min *= 1000; // Converte o valor mínimo de segundos para milissegundos
    max *= 1000; // Converte o valor máximo de segundos para milissegundos

    // Retorna um número aleatório entre min e max (em milissegundos)
    return Math.floor(Math.random() * (max - min) + min)
}

// =============================================================================
// EXEMPLO 1: FUNÇÃO ASYNC BÁSICA
// =============================================================================

// Uma função async SEMPRE retorna uma Promise
// Mesmo que você retorne um valor simples, ele será "envolvido" em uma Promise
async function exemploBasicoAsync() {
    // Esta função automaticamente retorna uma Promise resolvida com 'Hello World'
    return 'Hello World';
}

// Testando a função async básica
console.log('1. Exemplo básico de função async:');
exemploBasicoAsync().then(resultado => {
    console.log('Resultado:', resultado); // Output: "Hello World"
});

// Você também pode usar await para aguardar o resultado
(async () => {
    const resultado = await exemploBasicoAsync();
    console.log('Resultado com await:', resultado);
})();

// =============================================================================
// EXEMPLO 2: REFATORANDO O CÓDIGO DE PROMISES PARA ASYNC/AWAIT
// =============================================================================

// Função que simula uma requisição à API
function simularRequisicaoAPI(dados, tempoResposta) {
    return new Promise((resolve, reject) => {
        console.log(`Fazendo requisição: ${dados}`);

        setTimeout(() => {
            // Simula erro ocasional (10% de chance)
            if (Math.random() < 0.1) {
                reject(new Error(`Falha na requisição: ${dados}`));
                return;
            }

            resolve(`Resposta: ${dados} processado com sucesso`);
        }, tempoResposta);
    });
}

// VERSÃO COM PROMISES (.then/.catch) - código mais verboso
function exemploComPromises() {
    console.log('\n2. Exemplo com Promises tradicionais:');

    simularRequisicaoAPI('Dados do usuário', 1000)
        .then(resposta1 => {
            console.log(resposta1);
            return simularRequisicaoAPI('Dados do perfil', 800);
        })
        .then(resposta2 => {
            console.log(resposta2);
            return simularRequisicaoAPI('Dados de configuração', 600);
        })
        .then(resposta3 => {
            console.log(resposta3);
            console.log('Todas as requisições concluídas!');
        })
        .catch(erro => {
            console.error('Erro nas requisições:', erro.message);
        });
}

// VERSÃO COM ASYNC/AWAIT - código mais limpo e legível
async function exemploComAsyncAwait() {
    console.log('\n3. Mesmo exemplo com async/await:');

    try {
        // Cada 'await' pausa a execução até a Promise ser resolvida
        const resposta1 = await simularRequisicaoAPI('Dados do usuário', 1000);
        console.log(resposta1);

        const resposta2 = await simularRequisicaoAPI('Dados do perfil', 800);
        console.log(resposta2);

        const resposta3 = await simularRequisicaoAPI('Dados de configuração', 600);
        console.log(resposta3);

        console.log('Todas as requisições concluídas!');

    } catch (erro) {
        // O bloco catch captura qualquer erro que ocorra em qualquer await
        console.error('Erro nas requisições:', erro.message);
    }
}

// =============================================================================
// EXEMPLO 3: DIFERENÇAS ENTRE EXECUÇÃO SEQUENCIAL E PARALELA
// =============================================================================

// EXECUÇÃO SEQUENCIAL - uma operação após a outra
async function execucaoSequencial() {
    console.log('\n4. Execução SEQUENCIAL (uma após a outra):');
    const inicio = Date.now();

    try {
        // Estas operações executam uma após a outra (total: ~2.4 segundos)
        await esperaAi('Primeira operação', 800);
        console.log('Primeira operação concluída');

        await esperaAi('Segunda operação', 800);
        console.log('Segunda operação concluída');

        await esperaAi('Terceira operação', 800);
        console.log('Terceira operação concluída');

        const fim = Date.now();
        console.log(`Tempo total sequencial: ${fim - inicio}ms`);

    } catch (erro) {
        console.error('Erro na execução sequencial:', erro);
    }
}

// EXECUÇÃO PARALELA - todas as operações ao mesmo tempo
async function execucaoParalela() {
    console.log('\n5. Execução PARALELA (todas ao mesmo tempo):');
    const inicio = Date.now();

    try {
        // Promise.all executa todas as operações simultaneamente
        const resultados = await Promise.all([
            esperaAi('Primeira operação paralela', 800),
            esperaAi('Segunda operação paralela', 800),
            esperaAi('Terceira operação paralela', 800)
        ]);

        resultados.forEach((resultado, index) => {
            console.log(`${resultado} concluída`);
        });

        const fim = Date.now();
        console.log(`Tempo total paralelo: ${fim - inicio}ms`);

    } catch (erro) {
        console.error('Erro na execução paralela:', erro);
    }
}

// =============================================================================
// EXEMPLO 4: TRATAMENTO AVANÇADO DE ERROS
// =============================================================================

// Função que pode falhar
function operacaoQuePodefFalhar(sucesso = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sucesso) {
                resolve('Operação bem-sucedida!');
            } else {
                reject(new Error('Algo deu errado!'));
            }
        }, 500);
    });
}

async function exemploTratamentoErros() {
    console.log('\n6. Tratamento avançado de erros:');

    // Exemplo 1: Try/catch básico
    try {
        const resultado = await operacaoQuePodefFalhar(true);
        console.log(resultado);
    } catch (erro) {
        console.error('Erro capturado:', erro.message);
    }

    // Exemplo 2: Múltiplas operações com tratamento individual
    const operacoes = [true, false, true, false];

    for (let i = 0; i < operacoes.length; i++) {
        try {
            const resultado = await operacaoQuePodefFalhar(operacoes[i]);
            console.log(`Operação ${i + 1}:`, resultado);
        } catch (erro) {
            console.log(`Operação ${i + 1}:`, erro.message);
            // Continua com as próximas operações mesmo se uma falhar
        }
    }
}

// =============================================================================
// EXEMPLO 5: ASYNC/AWAIT COM Promise.allSettled
// =============================================================================

async function exemploAllSettled() {
    console.log('\n7. Promise.allSettled - Aguarda todas as Promises, independente do resultado:');

    const operacoes = [
        operacaoQuePodefFalhar(true),   // Sucesso
        operacaoQuePodefFalhar(false),  // Falha
        operacaoQuePodefFalhar(true),   // Sucesso
        operacaoQuePodefFalhar(false)   // Falha
    ];

    // Promise.allSettled não falha, retorna o status de cada Promise
    const resultados = await Promise.allSettled(operacoes);

    resultados.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            console.log(`Operação ${index + 1}: ${resultado.value}`);
        } else {
            console.log(`Operação ${index + 1}: ${resultado.reason.message}`);
        }
    });
}

// =============================================================================
// EXEMPLO 6: ASYNC/AWAIT EM LOOPS
// =============================================================================

async function exemploLoops() {
    console.log('\n8. Async/await em diferentes tipos de loops:');

    const dados = ['Item 1', 'Item 2', 'Item 3'];

    // FOR LOOP - execução sequencial
    console.log('\nFor loop (sequencial):');
    for (let i = 0; i < dados.length; i++) {
        const resultado = await esperaAi(dados[i], 300);
        console.log(`Processado: ${resultado}`);
    }

    // FOR...OF - execução sequencial
    console.log('\nFor...of (sequencial):');
    for (const item of dados) {
        const resultado = await esperaAi(item, 300);
        console.log(`Processado: ${resultado}`);
    }

    // MAP com Promise.all - execução paralela
    console.log('\nMap com Promise.all (paralelo):');
    const promessas = dados.map(item => esperaAi(item, 300));
    const resultados = await Promise.all(promessas);
    resultados.forEach(resultado => {
        console.log(`Processado: ${resultado}`);
    });
}

// =============================================================================
// EXEMPLO 7: FUNÇÃO ASYNC QUE RETORNA DIFERENTES TIPOS DE DADOS
// =============================================================================

async function exemploRetornos() {
    console.log('\n9. Diferentes tipos de retorno em funções async:');

    // Retornando um valor primitivo
    async function retornaString() {
        return 'Sou uma string';
    }

    // Retornando um objeto
    async function retornaObjeto() {
        return {
            nome: 'João',
            idade: 30,
            ativo: true
        };
    }

    // Retornando uma Promise (será "desembrulhada")
    async function retornaPromise() {
        return Promise.resolve('Valor de uma Promise');
    }

    // Retornando resultado de outro async
    async function retornaOutroAsync() {
        return await retornaString();
    }

    // Testando todos os tipos
    console.log('String:', await retornaString());
    console.log('Objeto:', await retornaObjeto());
    console.log('Promise:', await retornaPromise());
    console.log('Outro async:', await retornaOutroAsync());
}

// =============================================================================
// EXECUTANDO TODOS OS EXEMPLOS
// =============================================================================

// Função principal que executa todos os exemplos em sequência
async function executarTodosExemplos() {
    console.log('Iniciando demonstrações de async/await...\n');

    try {
        // Aguarda um pouco entre cada exemplo para melhor visualização
        await new Promise(resolve => setTimeout(resolve, 2000));

        await exemploComAsyncAwait();
        await new Promise(resolve => setTimeout(resolve, 3000));

        await execucaoSequencial();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await execucaoParalela();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await exemploTratamentoErros();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await exemploAllSettled();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await exemploLoops();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await exemploRetornos();

        console.log('\nDemonstrações concluídas!');

    } catch (erro) {
        console.error('Erro durante as demonstrações:', erro);
    }
}

// Executar as versões com Promises primeiro, depois as com async/await
setTimeout(() => {
    exemploComPromises();
}, 1000);

// Depois executar todos os exemplos de async/await
setTimeout(() => {
    executarTodosExemplos();
}, 5000);

// =============================================================================
// CONCEITOS AVANÇADOS E ARMADILHAS COMUNS
// =============================================================================

console.log('\n=== CONCEITOS AVANÇADOS E BOAS PRÁTICAS ===\n');

/* 
CONCEITOS IMPORTANTES SOBRE ASYNC/AWAIT:

1. ASYNC sempre retorna uma Promise
2. AWAIT só pode ser usado dentro de funções ASYNC
3. AWAIT pausa a execução da função até a Promise resolver
4. Erros em funções ASYNC são automaticamente "wrapped" em Promises rejeitadas
5. Múltiplos AWAITs executam sequencialmente, use Promise.all para paralelismo
*/

// =============================================================================
// EXEMPLO 8: ARMADILHAS COMUNS E COMO EVITÁ-LAS
// =============================================================================

// ARMADILHA 1: Usar await desnecessariamente
async function armadilha1Ruim() {
    // Desnecessário - já estamos retornando uma Promise
    return await esperaAi('Mensagem', 1000);
}

// CORREÇÃO: Não precisa de await se é a última operação
async function armadilha1Bom() {
    // Mais eficiente - deixa a Promise "passar" diretamente
    return esperaAi('Mensagem', 1000);
}

// ARMADILHA 2: Loops sequenciais desnecessários
async function armadilha2Ruim() {
    const dados = ['A', 'B', 'C'];
    const resultados = [];

    // Executa sequencialmente, mas poderia ser paralelo
    for (const item of dados) {
        const resultado = await esperaAi(item, 500);
        resultados.push(resultado);
    }

    return resultados;
}

// CORREÇÃO: Usar Promise.all para operações independentes
async function armadilha2Bom() {
    const dados = ['A', 'B', 'C'];

    // Executa em paralelo - muito mais rápido!
    const promessas = dados.map(item => esperaAi(item, 500));
    return await Promise.all(promessas);
}

// ARMADILHA 3: Não tratar erros adequadamente
async function armadilha3Ruim() {
    // Se falhar, o erro não é tratado e "vaza" para quem chama
    const resultado = await operacaoQuePodefFalhar(false);
    return resultado;
}

// CORREÇÃO: Sempre tratar erros ou deixar claro que podem ocorrer
async function armadilha3Bom() {
    try {
        const resultado = await operacaoQuePodefFalhar(false);
        return { sucesso: true, dados: resultado };
    } catch (erro) {
        return { sucesso: false, erro: erro.message };
    }
}

// =============================================================================
// EXEMPLO 9: PADRÕES AVANÇADOS COM ASYNC/AWAIT
// =============================================================================

// PADRÃO 1: Timeout em operações assíncronas
function criarTimeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout!')), ms);
    });
}

async function operacaoComTimeout(operacao, timeoutMs) {
    try {
        // Promise.race retorna a primeira que resolver (operação ou timeout)
        const resultado = await Promise.race([
            operacao,
            criarTimeout(timeoutMs)
        ]);
        return resultado;
    } catch (erro) {
        throw new Error(`Operação falhou: ${erro.message}`);
    }
}

// PADRÃO 2: Retry automático
async function operacaoComRetry(operacao, maxTentativas = 3) {
    let ultimoErro;

    for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
        try {
            console.log(`Tentativa ${tentativa}/${maxTentativas}`);
            const resultado = await operacao();
            console.log(`Sucesso na tentativa ${tentativa}`);
            return resultado;
        } catch (erro) {
            ultimoErro = erro;
            console.log(`Falha na tentativa ${tentativa}: ${erro.message}`);

            if (tentativa < maxTentativas) {
                // Aguarda antes da próxima tentativa (backoff exponencial)
                const delay = Math.pow(2, tentativa) * 1000;
                console.log(`Aguardando ${delay}ms antes da próxima tentativa...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`Operação falhou após ${maxTentativas} tentativas: ${ultimoErro.message}`);
}

// PADRÃO 3: Rate limiting / Throttle
class ThrottledExecutor {
    constructor(limitePorSegundo = 5) {
        this.limitePorSegundo = limitePorSegundo;
        this.filaExecucao = [];
        this.executandoAtualmente = 0;
    }

    async executar(operacao) {
        return new Promise((resolve, reject) => {
            this.filaExecucao.push({ operacao, resolve, reject });
            this.processarFila();
        });
    }

    async processarFila() {
        if (this.executandoAtualmente >= this.limitePorSegundo || this.filaExecucao.length === 0) {
            return;
        }

        const { operacao, resolve, reject } = this.filaExecucao.shift();
        this.executandoAtualmente++;

        try {
            const resultado = await operacao();
            resolve(resultado);
        } catch (erro) {
            reject(erro);
        } finally {
            this.executandoAtualmente--;

            // Aguarda um pouco antes de processar o próximo
            setTimeout(() => this.processarFila(), 1000 / this.limitePorSegundo);
        }
    }
}

// =============================================================================
// EXEMPLO 10: CASOS DE USO REAIS
// =============================================================================

// Simulação de uma API de usuários
class UsuarioAPI {
    static async buscarUsuario(id) {
        await new Promise(resolve => setTimeout(resolve, rand(0.5, 1.5)));

        if (Math.random() < 0.1) {
            throw new Error(`Usuário ${id} não encontrado`);
        }

        return {
            id,
            nome: `Usuário ${id}`,
            email: `usuario${id}@email.com`,
            ativo: Math.random() > 0.2
        };
    }

    static async buscarPerfilUsuario(userId) {
        await new Promise(resolve => setTimeout(resolve, rand(0.3, 0.8)));

        return {
            userId,
            avatar: `https://avatar.com/${userId}.jpg`,
            bio: `Biografia do usuário ${userId}`,
            configuracoes: {
                tema: 'escuro',
                notificacoes: true
            }
        };
    }

    static async buscarPostsUsuario(userId) {
        await new Promise(resolve => setTimeout(resolve, rand(0.8, 1.2)));

        const numPosts = Math.floor(Math.random() * 5) + 1;
        return Array.from({ length: numPosts }, (_, i) => ({
            id: `${userId}-post-${i + 1}`,
            titulo: `Post ${i + 1} do usuário ${userId}`,
            conteudo: `Conteúdo do post ${i + 1}...`,
            curtidas: Math.floor(Math.random() * 100)
        }));
    }
}

// CASO DE USO 1: Carregar dados completos de um usuário
async function carregarDadosCompletos(userId) {
    console.log(`\nCarregando dados completos do usuário ${userId}:`);

    try {
        // Busca dados básicos primeiro
        console.log('Buscando dados básicos...');
        const usuario = await UsuarioAPI.buscarUsuario(userId);
        console.log('Dados básicos carregados:', usuario.nome);

        // Busca perfil e posts em paralelo (são independentes)
        console.log('Buscando perfil e posts em paralelo...');
        const [perfil, posts] = await Promise.all([
            UsuarioAPI.buscarPerfilUsuario(userId),
            UsuarioAPI.buscarPostsUsuario(userId)
        ]);

        console.log('Perfil carregado:', perfil.bio);
        console.log('Posts carregados:', posts.length, 'posts encontrados');

        return {
            usuario,
            perfil,
            posts,
            carregadoEm: new Date().toLocaleTimeString()
        };

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro.message);
        throw erro;
    }
}

// CASO DE USO 2: Carregar múltiplos usuários com controle de concorrência
async function carregarMultiplosUsuarios(userIds, limiteConcorrencia = 3) {
    console.log(`\nCarregando ${userIds.length} usuários (limite: ${limiteConcorrencia} por vez):`);

    const resultados = [];

    // Processa em lotes para controlar a concorrência
    for (let i = 0; i < userIds.length; i += limiteConcorrencia) {
        const lote = userIds.slice(i, i + limiteConcorrencia);
        console.log(`Processando lote ${Math.floor(i / limiteConcorrencia) + 1}: usuários ${lote.join(', ')}`);

        const promessasLote = lote.map(async (userId) => {
            try {
                return await carregarDadosCompletos(userId);
            } catch (erro) {
                return { erro: erro.message, userId };
            }
        });

        const resultadosLote = await Promise.all(promessasLote);
        resultados.push(...resultadosLote);

        // Pequena pausa entre lotes para não sobrecarregar a "API"
        if (i + limiteConcorrencia < userIds.length) {
            console.log('Pausa entre lotes...');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    const sucessos = resultados.filter(r => !r.erro);
    const erros = resultados.filter(r => r.erro);

    console.log(`\nResultado final: ${sucessos.length} sucessos, ${erros.length} erros`);

    return { sucessos, erros };
}

// =============================================================================
// DEMONSTRAÇÕES DOS CONCEITOS AVANÇADOS
// =============================================================================

async function demonstrarConceitosAvancados() {
    console.log('\nDemonstrando conceitos avançados...');

    // Demonstração 1: Timeout
    console.log('\nTeste de timeout:');
    try {
        const operacaoLenta = esperaAi('Operação muito lenta', 3000);
        const resultado = await operacaoComTimeout(operacaoLenta, 2000);
        console.log('Resultado:', resultado);
    } catch (erro) {
        console.log('Timeout capturado:', erro.message);
    }

    // Demonstração 2: Retry
    console.log('\nTeste de retry:');
    const operacaoInstavel = () => {
        if (Math.random() < 0.7) {
            throw new Error('Falha simulada');
        }
        return Promise.resolve('Operação bem-sucedida!');
    };

    try {
        const resultado = await operacaoComRetry(operacaoInstavel, 3);
        console.log(resultado);
    } catch (erro) {
        console.log(erro.message);
    }

    // Demonstração 3: Rate limiting
    console.log('\nTeste de rate limiting:');
    const throttler = new ThrottledExecutor(2); // 2 operações por segundo

    const operacoes = Array.from({ length: 6 }, (_, i) =>
        throttler.executar(() => {
            console.log(`Operação ${i + 1} executada às ${new Date().toLocaleTimeString()}`);
            return `Resultado ${i + 1}`;
        })
    );

    await Promise.all(operacoes);

    // Demonstração 4: Casos de uso reais
    console.log('\nCasos de uso reais:');
    await carregarDadosCompletos(1);

    console.log('\nCarregamento em lote:');
    await carregarMultiplosUsuarios([1, 2, 3, 4, 5], 2);
}

// Executar demonstrações após um delay
setTimeout(() => {
    demonstrarConceitosAvancados();
}, 15000);
