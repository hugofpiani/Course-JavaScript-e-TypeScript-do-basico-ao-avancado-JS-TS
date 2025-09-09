const request = obj => {
    const xhr = new XMLHttpRequest();

    xhr.open(obj.method, obj.url, true);
    // Caso seja 'POST', no .send() deve ser enviado os dados, como em um formulário.
    xhr.send();

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            obj.sucess(xhr.responseText);
        } else {
            obj.error({
                code: xhr.status,
                message: xhr.statusText
            });
        }
    });
};

const carregaPagina = tag => {
    const href = tag.getAttribute('href');

    request({
        method: 'GET',
        url: href,

        sucess(response){
            const resultado = document.querySelector('.resultado');
            resultado.innerHTML = response;
        },

        error(errorText){
            console.log(errorText);
        }
    })
}

document.addEventListener('click', e => {
    const tag = e.target.tagName.toLowerCase();
    
    if (tag === 'a') {
        e.preventDefault();
        carregaPagina(e.target);    
    }
})

