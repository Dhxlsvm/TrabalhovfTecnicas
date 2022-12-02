async function carregarCommits() {
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
                    let timeline = document.getElementById('timeline-content-commits');
                    let parser = new DOMParser();

                    const docCommitGroup = parser.parseFromString(htmlItemGroup, "text/html");

                    const commitItemDom = docCommitGroup.getElementById('commit-item');

                    for (let commitItem of value) {

                        let docCommitItem = parser.parseFromString(htmlItem, "text/html");

                        docCommitItem.getElementById('commit-li').setAttribute('item-id', commitItem.codigo);
                        docCommitItem.getElementById('nome-commit').textContent = commitItem.funcionario.nome;
                        docCommitItem.getElementById('periodo-commit').textContent = commitItem.intervaloCommit;
                        docCommitItem.getElementById('modelo-item').textContent = commitItem.modelo;
                        docCommitItem.getElementById('ano-item').textContent = commitItem.anoFabricacao;
                        docCommitItem.getElementById('data-item').textContent = commitItem.data;
                        docCommitItem.getElementById('fabricante-item').textContent = commitItem.fabricante;
                        docCommitItem.getElementById('matricula-funcionario').textContent = commitItem.funcionario.codigo;

                        commitItemDom.appendChild(docCommitItem.body);
                    }

                    timeline.appendChild(docCommitGroup.body);
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

        let commit = new Item();

        await deleteData(itemsEndpoint, commit);
    } else {
        console.log('Deletar item cancelado!');
    }
}

window.addEventListener("load", carregarCommits);

