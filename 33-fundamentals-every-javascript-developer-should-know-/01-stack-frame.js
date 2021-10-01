/*
Pilha de chamadas

O que é?

É uma pilha de todas as funções que estão sendo executadas naquele momento

First in first out = FIFO = O primeiro que entrou é o primeiro que sai
Last in first out = LIFO = O ultimo que entrar é o primeiro que sai

*/

function executaFun1() {
    executaFun2();
    console.log("Executou função 1");
}

function executaFun2() {
    executaFun3();
    console.log("Executou função 2");
}

function executaFun3() {
    console.log("Executou função 3");
}

executaFun1();

/*
Dessa forma que é executado o código javascript

Output

executaFun3()
executaFun2()
executaFun1()
*/
