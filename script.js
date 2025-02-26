let arrayDeTarefas = [];

let botao = document.querySelector("#adicionar-tarefa");

function tarefa(tTitulo, tData, tPrioridade) {
    this.tTitulo = tTitulo;
    this.tData = tData;
    this.tPrioridade = tPrioridade; 
}

alert(typeof(document.querySelector("#dataVencimento").value ));