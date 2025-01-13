//total = 2336;
altura = 32;
largura = 73;
const fields = [];

(() => {
    for (let i = 1; i <= altura; i++) {
        for (let j = 1; j <= largura; j++) {
            fields.push(`<div class="coord" data-x="${j}" data-y="${i}"></div>`);
        }
    }
    seletor(".optionsField").innerHTML += fields.join('');
    seletor(".drawField").innerHTML = fields.join('');
})()

