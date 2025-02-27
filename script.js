let arrayDeTarefas = [];
let botao = document.querySelector("#adicionar-tarefa");

function tarefa(tTitulo, tData, tPrioridade) {
    this.tTitulo = tTitulo;
    this.tData = tData;
    this.tPrioridade = tPrioridade; 
}

botao.addEventListener("click", function(){ 
    let titulo = document.querySelector("#tarefa").value;
    let data = document.querySelector("#dataVencimento").value;
    let prioridade = document.querySelector("#prioridade").value;

    arrayDeTarefas.push(new tarefa(titulo, data, prioridade));
    exibirListaTarefas()
});

function exibirListaTarefas() {
    alert(arrayDeTarefas.length);
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
    alert(arrayDeTarefas.length);
}
