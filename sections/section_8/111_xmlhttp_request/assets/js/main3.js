const request = obj => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(obj.method, obj.url, true);
        // Caso seja 'POST', no .send() deve ser enviado os dados, como em um formulário.
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    code: xhr.status,
                    message: xhr.statusText
                });
            }
        });
    });
};

const carregaPagina = async tag => {
    const href = tag.getAttribute('href');

    try {
        const response = await request({
            method: 'GET',
            url: href,
        });

        const resultado = document.querySelector('.resultado');
        resultado.innerHTML = response;
        
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('click', e => {
    const tag = e.target.tagName.toLowerCase();

    if (tag === 'a') {
        e.preventDefault();
        carregaPagina(e.target);
    }
})

