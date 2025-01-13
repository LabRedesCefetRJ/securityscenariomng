var serverScript = `
    <button class="closeDetails">X</button>
    <p id="id"></p>  <p id="device">SERVER</p><br>

    <label for="role">Role:</label>
    <select name="role" id="role">
        <option value="normal">normal</option>
    </select><br>

    <label for="interNic">Interface:</label>
    <input type="text" name="interNic" id="interNic" placeholder="Nic">
    <input type="text" name="interId" id="interId" placeholder="Id"><br>
    
    <label for="so">Sistema Operacional:</label>
    <input type="text" name="so" id="so"><br>

    <label for="ip">Daemons:</label>
    <div class="daemons">
        <input type="text" name="daemons" id="daemons" class="daemonsField">
        <button class="newDaemon">+</button>
    </div>
    
`;

var pcScript = `
    <button class="closeDetails">X</button>
    <p id="id"><p id="device">PC</p><br>

    <label for="role">Role:</label>
    <select name="role" id="role" class="pcSelect">
        <option value="normal">normal</option>
        <option value="vitima">vitima</option>
        <option value="mestre">mestre</option>
    </select><br>

    <div class="forMestre">
        <label for="interNic">Interface:</label>
        <input type="text" name="interNic" id="interNic" placeholder="Nic">
        <input type="text" name="interId" id="interId" placeholder="Id"> <br>
    </div>
`;

var attackerScript = `
    <button class="closeDetails">X</button>
    <p id="id"></p> <p id="device"></p><br>
    <select name="role" id="role">
        <option value="man-in-the-middle">man in the middle</option>
        <option value="ddos">DDOS</option>
        <option value="brute-force">Brute Force</option>
    </select>
`;

// PcVitima, switch, atacante, infectado
var generalScript = `
    <button class="closeDetails">X</button>
    <p id="id"><p id="device"></p><br>
    
    <label for="role">Role:</label>
    <select name="role" id="role">
        <option value="normal">normal</option>
        <option value="vitima">vitima</option>
        <option value="infectado">infectado</option>
    </select>
`;


