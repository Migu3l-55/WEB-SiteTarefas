let arrayDeTarefas = [];
let botao = document.querySelector("#adicionar-tarefa");

function tarefa(tTitulo, tData, tPrioridade) {
    this.tTitulo = tTitulo;
    this.tData = tData;
    this.tPrioridade = tPrioridade; 
}


function setLocalStorageArrayEqualsToArrayDeTarefas() {
    localStorage.setItem("arrayLocalTarefas", JSON.stringify(arrayDeTarefas));
}

function setArrayDeTarefasEqualsToLocalStorageArray() {
    arrayLocal = getLocalStorageArrayAsAnArray();

    arrayDeTarefas.splice(0, arrayDeTarefas.length);
    for (let x = 0; x < arrayLocal.length; x++) {
        arrayDeTarefas.push(arrayLocal[x]);
    }
}

function getLocalStorageArrayAsAnArray() {
    return JSON.parse(localStorage.getItem("arrayLocalTarefas"));
}


botao.addEventListener("click", function(){ 
    let titulo = document.querySelector("#tarefa");
    let data = document.querySelector("#dataVencimento");
    let prioridade = document.querySelector("#prioridade");

    if (titulo.length == 0 || data.length == 0) {
        alert("Informe os dados");
        
    } else {
        arrayDeTarefas.push(new tarefa(titulo.value, data.value, prioridade.value));
        setLocalStorageArrayEqualsToArrayDeTarefas();
        titulo.value = "";
        data.value = "";
    }
    exibirListaTarefas()
});

function exibirListaTarefas() {
    setArrayDeTarefasEqualsToLocalStorageArray();
    //alert(arrayDeTarefas.length);
    let elemento = document.querySelector("#tbody-tarefas");
    let text = ""
    text = `<tr>
                <th>tarefa</th>
                <th>data</th>
                <th>prioridade</th>
            </tr>`;
    for (let x = 0; x < arrayDeTarefas.length; x++) {
        text += `
        <tr>
            <td>${arrayDeTarefas[x].tTitulo}</td>
            <td>${arrayDeTarefas[x].tData}</td>
            <td>${arrayDeTarefas[x].tPrioridade}</td>
        </tr>`;
    }
    elemento.innerHTML = text;
    //alert(arrayDeTarefas.length);
}
