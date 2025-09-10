const carregaPagina = async tag => {
    const href = tag.getAttribute('href');

    try {
        const response = await fetch(href);
        
        if (response.status !== 200) throw new Error(`${response.status}`);

        const resultado = document.querySelector('.resultado');
        resultado.innerHTML = await response.text();
        
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('click', e => {
    const tag = e.target.tagName.toLowerCase();

    if (tag === 'a') {
        e.preventDefault();
        carregaPagina(e.target);
    }
})

