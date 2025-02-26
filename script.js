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
    alert(arrayDeTarefas.length); 
    alert(arrayDeTarefas[0].tTitulo);
    alert(arrayDeTarefas[0].tData);
    alert(arrayDeTarefas[0].tPrioridade);
});

