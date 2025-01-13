
//altura option: 10.0
//altura coord; 1.5
let optionPrimeiroCLique;
let cord1 = {
    y: 0,
    x: 0
}
let cord2= {
    y: 0,
    x: 0
}
addGlobalEventListenerClosest("click", '.coord .option', option => {
    console.log(ehPrimeiroClique);
    if (ehPrimeiroClique) {
        ehPrimeiroClique = false;
        optionPrimeiroCLique = option;
        option.style.backgroundColor = "#00ff0018";
        cord1.y = option.closest('.coord').dataset.y;
        cord1.x = option.closest('.coord').dataset.x;
    }
    else {
        ehPrimeiroClique = true;
        optionPrimeiroCLique.style.backgroundColor = "transparent";
        cord2.y = option.closest('.coord').dataset.y;
        cord2.x = option.closest('.coord').dataset.x;

        console.log(cord1.y, cord2.y)

        if (cord1.y - cord2.y > 3) {
            console.log("tem q sair por CIMA")
        }
        else if(cord1.y - cord2.y < -3){
            console.log("tem q sair por baixo")
        }
        else{
            console.log("tem q sair lateral")

        }
    }
})