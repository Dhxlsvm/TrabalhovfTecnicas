window.onload = async function getBody() {
    await loadListeners();
}

async function loadListeners(){
    const form = document.querySelector("#form-create-item");
    const { elements } = document.querySelector("#form-create-item");

    if(form)
    {
        form.addEventListener("submit", function(e){

            e.preventDefault();

            let funcionario = new Funcionario(null, elements.namedItem('funcionario').value);
            let item = new Item(elements.namedItem('modelo').value, null, elements.namedItem('anoFabri').value, funcionario, elements.namedItem('fabricante').value);

            postData(itemsEndpoint, item, () => { window.location.href = baseUrl; });
        })
    }
}