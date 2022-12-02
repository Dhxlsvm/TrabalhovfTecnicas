const baseUrl = 'http://localhost:8080';

const itemsEndpoint = baseUrl + '/api/inventario';
const itemList = baseUrl + '/item_list.html';
const itemGroup = baseUrl + '/item_group.html';
const itemUpdate = baseUrl + '/item_update.html';
const itemCreate = baseUrl + '/item_create.html';
//
class Funcionario
{
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
    }
}

class Item
{
    constructor(modelo, data, anoFabricacao, funcionario, fabricante) {
        this.modelo = modelo;
        this.data = data;
        this.anoFabricacao = anoFabricacao;
        this.funcionario = funcionario;
        this.fabricante = fabricante;
    }
}

function postData(){
  let funcionario = document.querySelector('#funcionario-input');
  let modelo = document.querySelector('#modelo-input');
  let fabricante = document.querySelector('#fabricante-input');
  let anoFabri = document.querySelector('#ano-input');

  let xhr = new XMLHttpRequest();
  let url = "api/inventario";

xhr.open("POST", url, true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

        result.innerHTML = this.responseText;

    }
};

var data = JSON.stringify({ "funcionario": funcionario.value, "anoFabri": anoFabri.value, "modelo": modelo.value, "fabricante": fabricante.value });
console.log(data);

xhr.send(data);
}

function putData(){
    let funcionario = document.querySelector('#funcionario-input');
    let modelo = document.querySelector('#modelo-input');
    let fabricante = document.querySelector('#fabricante-input');
    let anoFabri = document.querySelector('#ano-input');

    let xhr = new XMLHttpRequest();

    let json = JSON.stringify({"funcionario": funcionario.value, "anoFabri": anoFabri.value, "modelo": modelo.value, "fabricante": fabricante.value});

    xhr.open("PUT", "api/commits")
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(json);

}

function deleteData() {
    let xhr = new XMLHttpRequest();

    xhr.open("DELETE", "api/commits")
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(null);

}
