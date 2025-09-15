// Dependências em pacotes:
// Caso na versão do pacote existir um '^', significa que ele poderá ser atualizado dentre as versões MINOR e PATCH quando houver uma nova release.
// Agora, caso exista um '~', ele será atualizado somente em PATCH.
// Caso instalemos o pacote com '-E (--save-exact)', ele estará 'bloqueado' naquela versão.
// Para instalarmos uma versão especifica de um pacote, usamos, por exemplo com o express express@2.1.0 (versão desejada)

// Caso rodemos 'npm update', ele irá atualizar todos pacotes nos quais haverem updates disponíveis.

// Dependências de desenvolvimento:
// São dependencias especificas que são somente usadas no desenvolvimento (como webpack, babel, etc)
// Para passarmos um pacote para dev. dependencies, usamos '-D (--save-dev)' ao instalar-mos tal.
// Salvar com '--save-prod' volta para dependências padrão.

// Para desinstalar-mos, podemos usar por exemplo, o comando 'npm uninstall express'
// Tambem podemos retirar as dependencias dentro 'package.json', e com isso rodar um 'npm prune', retirando de node.modules todos pacotes não listados como dependencias.

// Outros comandos úteis:
// 'npm ls --depth=0' ou 'npm ls --depth=1': Lista apenas os pacotes em node_modules instalados pelo usuário sem profundidade, ou apenas com 1 camada de profundidade, e assim vai.
// 'npm outdated': Mostra as dependências que estão desatualizadas, e retorna as ultimas versões (tanto 'latest' quanto a versão 'wanted' de acordo com a flag no pacote).