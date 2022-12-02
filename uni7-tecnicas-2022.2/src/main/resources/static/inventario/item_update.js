async function loadItemValues()
{
    const urlParams = new URLSearchParams(window.location.search);

    let itemId = urlParams.get('item-id');

    let getEndpoint = itemsEndpoint + `/${itemId}`;

    await fetch(getEndpoint)
        .then(response => response.json())
        .then(json => {
            fillItemForm(json);
        });
}

function fillItemForm(json)
{
    let { elements } = document.querySelector('#form-update-item');

    elements.namedItem('funcionario').value = json.funcionario.nome;
    elements.namedItem('codigo-autor').value = json.funcionario.codigo;
    elements.namedItem('modelo').value = json.modelo;
    elements.namedItem('fabricante').value = json.fabricante;
    elements.namedItem('codigo').value = json.codigo;
}

async function loadListeners(){
    const form = document.querySelector("#form-update-item");
    const { elements } = document.querySelector("#form-update-item");

    if(form)
    {
        form.addEventListener("submit", function(e){

            e.preventDefault();

            let funcionario = new Funcionario(null, elements.namedItem('funcionario').value);
            let item = new Item(elements.namedItem('modelo').value, null, elements.namedItem('anoFabri').value, funcionario, elements.namedItem('fabricante').value);

            putData(itemsEndpoint, item, () => { window.location.href = baseUrl; });
        })
    }
}

window.onload = async function getBody() {
    await loadListeners();
    await loadItemValues();
}