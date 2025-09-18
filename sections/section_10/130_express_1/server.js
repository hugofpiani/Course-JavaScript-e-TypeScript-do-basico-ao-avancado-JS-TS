const express = require('express');

const app = express();

// CRUD -> CREATE, READ, UPDATE, DELETE
//         POST    GET   PUT     DELETE

// http://meusite.com/ <- GET -> Entrega a página /.
app.get('/', (req, res) => {
    res.send(`
        <form action="/" method="POST">
        Nome: <input type="text" name="nome">
        <button>Enviar</button>
        </form>    
    `);
});

app.post('/', (req, res) => {
    res.send('Recebemos.')
})

app.get('/som', (req, res) => {
    res.send('Som?');
});

app.listen(3000, () => {
    console.log('Tá rodando chefe. http://localhost:3000')
});