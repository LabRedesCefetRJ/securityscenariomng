const seletor = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const print = text => console.log(text);
const newElement = tag => document.createElement(tag);
let id = 0;
let deviceId;

let nodes = [];


const addGlobalEventListenerClosest = (event, selector, callback) => {
    document.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.closest(selector)) {
            callback(e.target.closest(selector));
        }
    });
    return false;
}
const addGlobalEventListener = (event, selector, callback) => {
    document.addEventListener(event, (e) => {
        e.stopPropagation();
        if (e.target.matches(selector)) {
            callback(e);
        }
    });
}

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

let items = selectAll('.option');
const coords = document.querySelectorAll('.coord');
let startDrag = '';

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

(function handleEventListeners() {

    addGlobalEventListener('dragstart', '.option', handleDragStart);
    addGlobalEventListener('dragend', '.option', handleDragEnd);
    addGlobalEventListenerClosest('contextmenu', '.option', openDetails, true);
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
})();

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function handleDragStart(e) {
    setTimeout(() => {
        e.target.parentElement.style.overflow = 'hidden';
    }, 1);
    startDrag = e.target.parentElement.parentElement.classList[0];
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

    if (startDrag == 'options' && [...e.target.parentElement.classList].includes('coord')) {

        e.target.dataset.id = ++id;

        let p = newElement('p');
        p.classList.add('role');
        p.style.display = 'block';
        e.target.appendChild(p);
    }

    seletor('.deleteBin').style.display = 'none';
    e.target.querySelector('.draggingPoint').style.backgroundColor = '#fff';

    while (selectAll(`#${e.target.classList[0]}Div > *`).length > 1)
        seletor(`#${e.target.classList[0]}Div`).removeChild(seletor(`#${e.target.classList[0]}Div`).lastChild);

    if (startDrag == 'options')
        openDetails(e.target);

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



function openDetails(option) {

    if ([...option.parentElement.classList].includes('coord')) {
        seletor('.detailsContent select').value = '';
        editDetails(option);
        seletor('.details').style.display = 'flex';
        completeDetails(option.dataset.id);

        seletor('.closeDetails').addEventListener('click', () => {
            changeRole();
            updateParticipants(option.dataset.id);

            startDrag = '';
            seletor('.details').style.display = 'none';
        })
    }
    return false;
}

function editDetails(option) {
    deviceId = option.dataset.id;

    array = ['pc', 'server', 'switch', 'attacker']

    array.forEach((type) => {
        if ([...option.classList].includes(type)) {
            switch (type) {
                case "pc":
                    detailsPc(deviceId);
                    break;
                case "server":
                    detailsServer(deviceId);
                    break;
                case "switch":
                    detailsSwitch(deviceId);
                    break;
                case "attacker":
                    detailsAttacker(deviceId);
                    break;
            }
        }
    })
}



function detailsServer(deviceId) {
    seletor('.detailsContent ').innerHTML = serverScript;
    seletor('.detailsContent #id').innerText = deviceId;

    seletor('.newDaemon').addEventListener("click", newDaemon);
}

function detailsPc(deviceId) {
    seletor(`[data-id="${deviceId}"] .role`).innerText = seletor('select').value;

    seletor('.detailsContent ').innerHTML = pcScript;
    seletor('.detailsContent #device').innerText = 'Desktop';
    seletor('.detailsContent #id').innerText = deviceId;

    seletor('.detailsContent .pcSelect').addEventListener("change", () => { isMestre() });

}

function detailsSwitch(deviceId) {
    seletor(`[data-id="${deviceId}"] .role`).innerText = seletor('select').value;

    seletor('.detailsContent ').innerHTML = generalScript;
    seletor('.detailsContent #device').innerText = 'Switch';
    seletor('.detailsContent #id').innerText = deviceId;

}

function detailsAttacker(deviceId) {
    seletor(`[data-id="${deviceId}"] .role`).innerText = seletor('select').value;
    seletor('.detailsContent ').innerHTML = attackerScript;

    seletor('.detailsContent #device').innerText = 'ATTACKER';
    seletor('.detailsContent #id').innerText = deviceId;

}




function serverFactory() {
    return {
        id: seletor('p#id').innerText,
        device: 'server',
        role: 'normal',
        so: seletor('input#so').value,
        daemons: getDaemons(),
        interface: {
            nic: seletor('#interNic').value,
            id: seletor('#interId').value
        }
    }
}

function getDaemons(){
    let daemons = [];
    [...selectAll('.daemonsField')].forEach(field =>{
        if(field.value.trim() != '')
            daemons.push(field.value);
    });

    return daemons;
}

function pcMestreFactory() {
    return {
        id: seletor('p#id').innerText,
        device: 'desktop',
        role: 'mestre',
        interface: {
            nic: seletor('#interNic').value,
            id: seletor('#interId').value
        }
    }
}

function generalFactory() {
    return {
        id: seletor('p#id').innerText,
        device: seletor('p#device').innerText.toLowerCase(),
        role: seletor('select#role').value
    }
}

function attackerFactory() {
    return {
        id: seletor('p#id').innerText,
        role: 'attacker',
        attackType: seletor('select#role').value
    }
}



function updateParticipants(id) {

    let device = [...seletor(`[data-id="${id}"]`).classList][0];

    let object = (() => {
        switch (device) {
            case "pc":
                if (seletor('select').value == 'mestre')
                    return pcMestreFactory();
                return generalFactory();
            case "server":
                return serverFactory();
            case "switch":
                return generalFactory();
            case "attacker":
                return attackerFactory();
        }
    })();

    let idx = id - 1;

    if (idx != -1) {
        nodes[idx] = object;
    }
    else
        nodes.push(object);
}

function changeRole() {
    seletor(`[data-id="${deviceId}"] .role`).innerText = seletor('select').value;
}

function deleteFromArray(id) {
    nodes = nodes.filter(obj => obj.id !== id);
}

function isMestre() {

    if (seletor('select').value == 'mestre') {
        seletor('.forMestre').style.display = 'block'
        return true;
    }
    else {
        seletor('.forMestre').style.display = 'none';
        return false;
    }
}

function newDaemon() {
    let daemonsFields = [...selectAll('.daemonsField')];
    let ultimo = daemonsFields[daemonsFields.length - 1]
    if (ultimo.value.trim() != '') {
        let input = newElement('input');
        input.classList.add('daemonsField');
        seletor('.daemons').insertBefore(input, ultimo.nextSibling);
    }
}


function completeDetails(id){
    nodes.forEach(node =>{
        if (node.id == id){
            console.log(node)

            switch(node.device){
                case "desktop":
                    completeDetailsPc(node);
                    break;
                case "server":
                    completeDetailsServer(node);
                    break;
                case "switch":
                    completeDetailsSwitch(node);
                    break;
                case "attacker":
                    completeDetailsAttacker(node);
                    break;
            }
        }
    });
}

function completeDetailsPc(node){
    seletor('select').value = node.role;
    if(isMestre()){
        seletor('#interNic').value = node.interface.nic;
        seletor('#interId').value = node.interface.id;
    }
}