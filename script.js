let arrayDeTarefas = [];
let botao = document.querySelector("#adicionar-tarefa");

function getDataAtual() {
    const data = new Date();

    dia = String(data.getDate()).padStart(2, '0');
    mes = String(data.getMonth() + 1).padStart(2, '0');
    ano = String(data.getFullYear());

    return (`${ano}-${mes}-${dia}`)
}

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
        setLocalStorageArrayEqualsToArrayDeTarefas();
        titulo.value = "";
        data.value = "";
    }
    exibirListaTarefas()
});


function exibirListaTarefas() {
    setArrayDeTarefasEqualsToLocalStorageArray(); //alert(arrayDeTarefas.length);
    ordenarPrioridade()
    let elemento = document.querySelector("#tbody-tarefas-incompletas");
    let elemento2 = document.querySelector("#tbody-tarefas-completas");
    let text, text2 = ""
    text = `<tr>
                <th>tarefa</th>
                <th>data</th>
                <th>prioridade</th>
                <th colspan="2">Ações</th>
            </tr>`;
    text2 = `<tr>
                <th>tarefa</th>
                <th>data</th>
                <th>prioridade</th>
                <th colspan="2">Ações</th>
            </tr>`;
    for (let x = 0; x < arrayDeTarefas.length; x++) {
        if (arrayDeTarefas[x].tCompleta == false) {
            text += `
        <tr>
            <td id="tarefa${x}" onclick="concluirTarefa(${x})">${arrayDeTarefas[x].tTitulo}</td>
            <td`
            if (getDataAtual() > arrayDeTarefas[x].tData) {
                text += ` class="atrasado"`;
            }
            text += `>${arrayDeTarefas[x].tData}</td>
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
    arrayDeTarefas[index].tDataConclusao = getDataAtual();

    if (arrayDeTarefas[index].tDataConclusao > arrayDeTarefas[index].tData) {
        arrayDeTarefas[index].tNoPrazo = false;
    }
    if (arrayDeTarefas[index].tNoPrazo == true) {
        arrayDeTarefas[index].tDataConclusao += `\n(concluida no prazo [${arrayDeTarefas[index].tData}])`;
    } else {
        arrayDeTarefas[index].tDataConclusao += `\n(concluida fora do prazo [${arrayDeTarefas[index].tData}])`;
    }

    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function excluirTarefa(index) {
    arrayDeTarefas.splice(index, 1);

    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function limpartTudo() {
    let arrayDeIdex = [];
    setArrayDeTarefasEqualsToLocalStorageArray();

    for (let x = 0; x < arrayDeTarefas.length; x++) {
        if (arrayDeTarefas[x].tCompleta == true) {
            arrayDeIdex.push(x);
        }
    }

    for (let x = arrayDeIdex.length - 1; x >= 0; x--) {
        arrayDeTarefas.splice(arrayDeIdex[x], 1)
    }
    console.log(arrayDeIdex);
    setLocalStorageArrayEqualsToArrayDeTarefas();
    exibirListaTarefas();
}

function ordenarPrioridade() {
    let prioridadeAtual = 0;
    let prioridadeProx = 0;

    let suporte;

    for (let i = 0; i < arrayDeTarefas.length - 1; i++) {
        for (let j = 0; j < arrayDeTarefas. length - 1; j ++) {
            (arrayDeTarefas[j].tPrioridade == "alta") ? prioridadeAtual = 3 : null ;
            (arrayDeTarefas[j].tPrioridade == "media") ? prioridadeAtual = 2 : null ;
            (arrayDeTarefas[j].tPrioridade == "baixa") ? prioridadeAtual = 1 : null ;
            
            (arrayDeTarefas[j + 1].tPrioridade == "alta") ? prioridadeProx = 3 : null ;
            (arrayDeTarefas[j + 1].tPrioridade == "media") ? prioridadeProx = 2 : null ;
            (arrayDeTarefas[j + 1].tPrioridade == "baixa") ? prioridadeProx = 1 : null ;

            if (prioridadeAtual < prioridadeProx) {
                suporte = arrayDeTarefas[j];
                arrayDeTarefas[j] = arrayDeTarefas[j + 1];
                arrayDeTarefas[j + 1] = suporte;
            }
        }
    }
    setLocalStorageArrayEqualsToArrayDeTarefas();
}
