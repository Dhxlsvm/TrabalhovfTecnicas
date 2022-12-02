async function carregarItens() {
    let htmlItemGroup;
    await fetch(itemGroup)
        .then((response) => response.text())
        .then((html) => {
            htmlItemGroup = html;
        });

    let htmlItem;
    await fetch(itemList)
        .then((response) => response.text())
        .then((html) =>{
            htmlItem = html;
        });

    await fetch(itemsEndpoint)
        .then((response) => response.json())
        .then((data) => {
            if(data) {

                for(const [key, value] of Object.entries(data))
                {
                    let timeline = document.getElementById('timeline-content-itens');
                    let parser = new DOMParser();

                    const docItemGroup = parser.parseFromString(htmlItemGroup, "text/html");

                    const ItemDom = docItemGroup.getElementById('commit-item');

                    for (let invItem of value) {

                        let docInvItem = parser.parseFromString(htmlItem, "text/html");

                        docInvItem.getElementById('commit-li').setAttribute('item-id', invItem.codigo);
                        docInvItem.getElementById('nome-funcionario').textContent = invItem.funcionario.nome;
                        docInvItem.getElementById('periodo-item').textContent = invItem.intervaloCommit;
                        docInvItem.getElementById('modelo-item').textContent = invItem.modelo;
                        docInvItem.getElementById('ano-item').textContent = invItem.anoFabricacao;
                        docInvItem.getElementById('data-item').textContent = invItem.data;
                        docInvItem.getElementById('fabricante-item').textContent = invItem.fabricante;
                        docInvItem.getElementById('matricula-funcionario').textContent = invItem.funcionario.codigo;

                        ItemDom.appendChild(docInvItem.body);
                    }

                    timeline.appendChild(docItemGroup.body);
                }
            }
        });
}


function refUpdateItem(updateButton)
{
    let itemId = updateButton.closest('.inventario').getAttribute('item-id');

    let url = new URL(itemUpdate);

    url.searchParams.append('commit-id', itemId);

    location.href = url.href;
}

async function removeItem(removeButton)
{
    if (confirm('Deseja deletar o Item?')) {
        let itemId = removeButton.closest('.inventario').getAttribute('item-id');

        let item = new Item();

        await deleteData(itemsEndpoint, item);
    } else {
        console.log('Deletar item cancelado!');
    }
}

window.addEventListener("load", carregarItens);

