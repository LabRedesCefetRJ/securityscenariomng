// const seletor = seletor => document.querySelector(seletor);
// const selectAll = selector => document.querySelectorAll(selector);
// const newElement = tag => document.createElement(tag);
// const addGlobalEventListener = (evento, seletor, callback) => {
//     document.addEventListener(evento, (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.target.matches(seletor)) {
//             callback(e)
//         }
//     })
// }

let deviceId;

const details = {};
details.openDetails = (option) => {

    //vericação se o elemento foi deixado no campo do cenario.
    if ([...option.parentElement.classList].includes('coord')) {
        editDetailsByDevice(option);
        seletor('.details').style.display = 'flex';

        seletor('.closeDetails').addEventListener('click', () => {
            updateParticipants(option.dataset.id);
            main.changeStartDragPoint('');
            seletor('.details').style.display = 'none';
        })
    }
    return false;
}
details.setupDetails = (device) => {
    const id = device.dataset.id;
    const item = main.nodes.find(node => node.id == id);
    const qtdServicos = item.servicos.length;
    const qtdDns = item.rede.DNS.length
    let qtdInterfaces = 0;
    item.rede.interface.forEach(inter => { qtdInterfaces += inter.config.length });

    let i = 1;
    while (i < qtdServicos) {
        cloneMultipleField(seletor('#servicosDiv .newBtn'));
        i++;
    }

    i = 1;
    while (i < qtdDns) {
        cloneMultipleField(seletor('.dnsFieldset .newBtn'));
        i++;
    }

    i = 1;
    while (i < qtdInterfaces) {
        cloneMultipleField(seletor('#interfacesFieldset .newBtn'));
        i++;
    }

    fillFields(item);
}
details.detailsEventListeners = ()=>{

    addGlobalEventListener("click", ".newBtn", e => {
        e.preventDefault();
        cloneMultipleField(e.target);
        clearField(e);
    })

    addGlobalEventListener("click", ".deleteBtn", (e) => {
        e.target.parentElement.removeChild(e.target.previousElementSibling);
        e.target.parentElement.removeChild(e.target);
    })
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function editDetailsByDevice(option) {
    deviceId = option.dataset.id;

    let array = ['pc', 'server', 'switch']

    array.forEach((type) => {
        if ([...option.classList].includes(type)) {
            if (type == 'switch')
                detailsSwitch(deviceId);
            else
                detailsNormal(deviceId, type);
        }
    })
}

function detailsSwitch(deviceId) {
    seletor('.detailsBox ').innerHTML = detailsScripts.switchScript;
    seletor('.detailsBox #id').innerText = deviceId;
}

function detailsNormal(deviceId, type) {
    seletor('.detailsBox ').innerHTML = detailsScripts.generalScript;
    seletor('.detailsBox #id').innerText = deviceId;
    seletor('#deviceTxt').innerText = type.toUpperCase();


    let opcoesSo = gerarSelectOptions(utils.pcSos);
    opcoesSo.forEach(op => {
        seletor('#so').appendChild(op);
    })

    let opcoesServicos = gerarSelectOptions(utils.pcServices);
    opcoesServicos.forEach(op => {
        seletor('#servicos').appendChild(op);
    })

}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function switchFactory() {
    return {
        id: Number(seletor('p#id').innerText),
        device: "switch",
        nome: seletor('#name').value.trim(),
        descricao: seletor('#desc').value.trim(),
        qtdPortas: Number(seletor('#qtdPortas').value),
        portasLigadas: (seletor('#portasLigadas').value.trim())
    }
}

function normalFactory(device) {
    return {

        id: Number(seletor('p#id').innerText),
        device: device,
        nome: seletor('#name').value.trim(),
        descricao: seletor('#desc').value.trim(),
        SO: seletor('#so').value,
        servicos: [...selectAll('select.servicos')].map(servico => servico.value),

        rede: {
            DNS: [...selectAll('input.dns')].map(dns => dns.value),
            gateway: seletor('#gateway').value,
            interface: getInterfaceConfigs()
        }

    }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function updateParticipants(id) {

    let device = [...seletor(`[data-id="${id}"]`).classList][0];

    let object = device == 'switch' ? switchFactory() : normalFactory(device);

    // console.log(JSON.stringify(object, null, 2))

    let idx = id - 1;

    if (idx != -1) {
        main.nodes[idx] = object;
    }
    else
        main.nodes.push(object);

    // console.log(main.nodes)   
}

function fillFields(item) {

    seletor('#name').value = item.nome;
    seletor('#desc').value = item.descricao;
    seletor('select#so').value = item.SO;
    seletor('#gateway').value = item.rede.gateway;


    for (let i = 0; i < item.servicos.length; i++) {
        selectAll('select.servicos')[i].value = item.servicos[i];
    }

    for (let i = 0; i < item.rede.DNS.length; i++) {
        selectAll('input.dns')[i].value = item.rede.DNS[i];
    }

    let interfaces = getInterfaces(item.rede.interface);
    for (let i = 0; i < interfaces.length; i++) {
        selectAll('span.interfaces')[i].querySelector('#interfaceId').value = interfaces[i].id;
        selectAll('span.interfaces')[i].querySelector('#ip').value = interfaces[i].ip;
        selectAll('span.interfaces')[i].querySelector('#mask').value = interfaces[i].mask;
    }
}

function getInterfaceConfigs() {
    const interfaces = [...selectAll('span.interfaces')].map(inter => {
        return {
            id: inter.querySelector('#interfaceId').value,
            config: {
                ip: inter.querySelector('#ip').value,
                mask: inter.querySelector('#mask').value
            }
        }
    })

    let definitive = [];
    interfaces.forEach(item => {
        const alreadyExistant = definitive.find(unidade => unidade.id === item.id);

        if (alreadyExistant) {
            alreadyExistant.config.push(item.config);
        }
        else {
            definitive.push(
                {
                    id: item.id,
                    config: [
                        {
                            ip: item.config.ip,
                            mask: item.config.mask
                        }
                    ]
                }
            )
        }
    })
    return definitive;
}

function getInterfaces(interfaces) {
    let inters = [];
    interfaces.forEach(inter => {
        inter.config.forEach(int => {
            inters.push({
                id: inter.id,
                ip: int.ip,
                mask: int.mask
            })
        })
    })
    return inters;
}

function gerarSelectOptions(objArray) {
    let array = [];
    objArray.forEach(element => {
        let option = newElement('option');
        option.value = element.value;
        option.innerText = element.text;
        array.push(option)
    });
    return array;
}

function cloneMultipleField(target) {
    const clone = target.previousElementSibling.cloneNode(true);
    const deleteBtn = newElement('button');
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "X";

    target.parentElement.appendChild(clone);
    target.parentElement.appendChild(deleteBtn);
}

function clearField(e) {

    const field = e.target.previousElementSibling;
    const type = [...field.classList][0]

    if (type == 'dns') {
        field.value = '';
        field.focus();
    }

    else if (type == 'interfaces') {
        field.querySelectorAll('input').forEach(input => {
            input.value = '';
        })
        field.querySelectorAll('input')[0].focus();
    }
}