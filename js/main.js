// import * as details from "./details.js";

const main = {}
main.nodes = [];
main.changeStartDragPoint = (value) => {
    startDragPoint = value;
};

let ehPrimeiroClique = true;
let startDragPoint = '';
let id = 0;
const coords = document.querySelectorAll('.coord');


(function handleEventListeners() {

    addGlobalEventListener('dragstart', '.option', handleDragStart);
    addGlobalEventListener('dragend', '.option', handleDragEnd);
    
    addGlobalEventListenerClosest('dblclick', '.option', (e) => {
        details.openDetails(e);
        details.setupDetails(e);
    });
    addGlobalEventListener('dragover', '.coord', handleDragOver);

    seletor('.deleteBin').addEventListener('dragover', e => {
        e.preventDefault();
        seletor('.deleteBin').appendChild(seletor('.dragging'));
    });

    seletor('.deleteBin').addEventListener('dragend', e => {
        e.preventDefault();
        deleteFromArray(e.target.dataset.id);
        seletor('.deleteBin').innerHTML = '';
    });

   
    details.detailsEventListeners();
})();


/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function handleDragStart(e) {

    setTimeout(() => {
        e.target.parentElement.style.overflow = 'hidden';
    }, 1);
    startDragPoint = e.target.parentElement.parentElement.classList[0];
    if (![...selectAll('.coord .option')].includes(e.target))
        cloneElementWithEventListeners(e.target);

    e.target.classList.add('dragging');
    e.target.querySelector('.draggingPoint').style.backgroundColor = 'red';
    seletor('.deleteBin').style.display = 'block';
}

function handleDragEnd(e) {

    coords.forEach(coord => {
        coord.style.overflow = 'visible';
    })
    e.target.classList.remove('dragging');

    if (startDragPoint == 'options' && [...e.target.parentElement.classList].includes('coord')) {

        e.target.dataset.id = ++id;
        inserirTag(e.target);
    }

    seletor('.deleteBin').style.display = 'none';
    e.target.querySelector('.draggingPoint').style.backgroundColor = '#fff';

    //manter apenas um option de cada device no "OPTIONS"
    while (selectAll(`#${e.target.classList[0]}Div > *`).length > 1)
        seletor(`#${e.target.classList[0]}Div`).removeChild(seletor(`#${e.target.classList[0]}Div`).lastChild);

    //caso o dragging item não seja um que ja faça parte do cenário.
    if (startDragPoint == 'options')
        details.openDetails(e.target);
}

function handleDragOver(e) {
    e.preventDefault();
    if (e.target.innerHTML == '')
        e.target.style.overflow = 'hidden ';

    e.target.appendChild(seletor('.dragging'));
}

function cloneElementWithEventListeners(item) {
    let clone = item.cloneNode(true);
    seletor(`#${item.classList[0]}Div`).appendChild(clone);
    setTimeout(() => {
        seletor(`#${item.classList[0]}Div`).style.overflow = '';
    }, 10);
}

function inserirTag(element) {

    let p = newElement('p');
    p.classList.add('role');
    p.style.display = 'block';
    element.appendChild(p);
}

function deleteFromArray(id) {
    console.log(id)
    main.nodes = main.nodes.filter(obj => obj.id != id);
}

// addGlobalEventListenerClosest('contextmenu', '.option', (e) => {
    //     details.openDetails(e);
    //     details.setupDetails(e);
    // }, true);