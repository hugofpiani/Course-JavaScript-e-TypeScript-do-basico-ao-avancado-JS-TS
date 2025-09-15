// fetch('pessoas.json')
//     .then(resposta => resposta.json())
//     .then(responseText => carregaTudo(responseText));

axios.get('pessoas.json')
    .then(resposta => carregaTudo(resposta.data));

const carregaTudo = responseText => {
    const table = document.createElement('table');

    for (let pessoa of responseText) {
        const tr = document.createElement('tr')
        
        let td = document.createElement('td');
        td.innerHTML = pessoa.nome;
        tr.appendChild(td);
        
        td = document.createElement('td');
        td.innerHTML = pessoa.idade;
        tr.appendChild(td);
        
        td = document.createElement('td');
        td.innerHTML = pessoa.email;
        tr.appendChild(td);

        table.appendChild(tr);
    };
    const resultado = document.querySelector('.resultado');
    resultado.appendChild(table);
}