const detailsScripts = {};

detailsScripts.generalScript = `
    <div class="detailsHeader">
        <span>
            <p>ID:</p>
            <p id="id">01</p>
        </span>
        <p id="deviceTxt">Device</p>
        <button class="closeDetails">X</button>
    </div>

    <form action="">
        <fieldset>
            <label for="name">Nome :</label>
            <input type="text" id="name" name="name">
        </fieldset>

        <fieldset>
            <label for="desc">Descrição :</label>
            <textarea name="desc" id="desc"></textarea>
        </fieldset>

        <fieldset>
            <label for="so">S.O : </label>
            <select name="so" id="so">
            </select>
        </fieldset>

        <fieldset id="servicosFieldset">
            <label for="servicos">Serviços :</label>
            <div id="servicosDiv" class="multipleFields">
                <select name="servicos" id="servicos" class="servicos">
                </select>
                <button id="novoServico" class="newBtn">+</button>
            </div>
        </fieldset>
            
        <p class="netConfigTxt">Configurações de Rede:</p>

        <fieldset class="dnsFieldset">
            <label for="dns">DNS :</label>

            <div class="multipleFields">
                <input type="text" id="dns" name="dns" class="dns">
                <button id="novoDns" class="newBtn">+</button>
            </div>
        </fieldset>

        <fieldset>
            <label for="gateway">Gateway :</label>
            <input type="text" name="gateway" id="gateway">
        </fieldset>

        <fieldset id="interfacesFieldset">
            <label for="interface">Interfaces :</label>
            <div class="multipleFields">
                <span class="interfaces">
                    <label for="interfaceId">Id:</label>
                    <input type="text" name="interfaceId" id="interfaceId">

                    <label for="ip">IP:</label>
                    <input type="text" name="ip" id="ip">

                    <label for="mask">Mask: </label>
                    <input type="text" name="mask" id="mask">
                </span>
                <button id="newInterface" class="newBtn">+</button>
            </div>
        </fieldset>
    </form>
`;

detailsScripts.switchScript = `    
    <div class="detailsHeader">
        <span>
            <p>ID:</p>
            <p id="id">01</p>
        </span>
        <p id="deviceTxt">SWITCH</p>
        <button class="closeDetails">X</button>
    </div>

    <form action="">
        <fieldset>
            <label for="name">Nome :</label>
            <input type="text" id="name" name="name">
        </fieldset>

        <fieldset>
            <label for="desc">Descrição :</label>
            <input type="text" name="desc" id="desc">
        </fieldset>

        <fieldset>
            <label for="qtdPortas">Qtd Portas:</label>
            <input type="number" name="qtdPortas" id="qtdPortas">
        </fieldset>

        <fieldset>
            <label for="portasLigadas">Portas Ligadas:</label>
            <input type="text" name="portasLigadas" id="portasLigadas">
        </fieldset>
    </form>
`;