let arrayDeTarefas = [];
let botao = document.querySelector("#adicionar-tarefa");

function tarefa(tTitulo, tData, tPrioridade) {
    this.tTitulo = tTitulo;
    this.tData = tData;
    this.tPrioridade = tPrioridade; 
    this.tCompleta = false;
    this.tDataConclusao = "";
    this.tNoPrazo = true;
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
        ordenarPrioridade();
        setLocalStorageArrayEqualsToArrayDeTarefas();
        titulo.value = "";
        data.value = "";
    }
    exibirListaTarefas()
});

function exibirListaTarefas() {
    setArrayDeTarefasEqualsToLocalStorageArray(); //alert(arrayDeTarefas.length);
    let elemento = document.querySelector("#tbody-tarefas-incompletas");
    let elemento2 = document.querySelector("#tbody-tarefas-completas");
    let text, text2 = ""
    text= `<tr>
                <th>tarefa</th>
                <th>data</th>
                <th>prioridade</th>
                <th>Ações</th>
            </tr>`;
    text2 = `<tr>
                <th>tarefa</th>
                <th>data</th>
                <th>prioridade</th>
                <th>Ações</th>
            </tr>`;
    for (let x = 0; x < arrayDeTarefas.length; x++) {
        if (arrayDeTarefas[x].tCompleta == false) {
            text += `
        <tr>
            <td id="tarefa${x}" onclick="concluirTarefa(${x})">${arrayDeTarefas[x].tTitulo}</td>
            <td>${arrayDeTarefas[x].tData}</td>
            <td>${arrayDeTarefas[x].tPrioridade}</td>
            <td><input id="${x}" type="button" value="concluir" onclick="concluirTarefa(${x})"></td>
            <td><input id="${x}" type="button" value="Excluir" onclick="excluirTarefa(${x})")></td>
        </tr>`;
        } else {
            text2 += `
        <tr class="concluida" title="DATA DE CONCLUSÃO: ${arrayDeTarefas[x].tDataConclusao}">
            <td id="tarefa${x}">${arrayDeTarefas[x].tTitulo}</td>
            <td>${arrayDeTarefas[x].tData}</td>
            <td>${arrayDeTarefas[x].tPrioridade}</td>
            <td><input id="${x}" type="button" value="Excluir" onclick="excluirTarefa(${x})"></td>
        </tr>`;
        }
    }
    elemento.innerHTML = text; //alert(arrayDeTarefas.length);
    elemento2.innerHTML = text2; //alert(arrayDeTarefas.length);
}

function concluirTarefa(index) {
    arrayDeTarefas[index].tCompleta = true;
    arrayDeTarefas[index].tDataConclusao = "xx-xx-xxxx";

    if (arrayDeTarefas[index].tNoPrazo == true) {
        arrayDeTarefas[index].tDataConclusao += "\n(concluida no prazo)";
    } else {
        arrayDeTarefas[index].tDataConclusao += "\n(concluida fora do prazo)";
    }
    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function excluirTarefa(index) {
    arrayDeTarefas.splice(index, 1);
    //alert(arrayDeTarefas.length);
    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function limpartTudo() {
    arrayDeTarefas.splice(0, arrayDeTarefas.length);
    //alert(arrayDeTarefas.length);
    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function ordenarPrioridade() {
    for (let i = 0; i < arrayDeTarefas.length; i++) {
        if (arrayDeTarefas[i].tPrioridade == "alta") {
            arrayDeTarefas.unshift(arrayDeTarefas[i]);
            arrayDeTarefas.splice(i+1, 1);
        }
        else if (arrayDeTarefas[i].tPrioridade == "media") {
            arrayDeTarefas.splice(1, 0, arrayDeTarefas[i]);
            arrayDeTarefas.splice(i+1, 1);
        }
        else if (arrayDeTarefas[i].tPrioridade == "baixa") {
            arrayDeTarefas.push(arrayDeTarefas[i]);
            arrayDeTarefas.splice(i+1, 1);
        }
    }
    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}