// Envio de Nome

let nomeUsuario;
let nomeRecebido;

criarNome();

function criarNome(){
    nomeUsuario = prompt("Insira aqui um nome/apelido válido!");
    nomeValidacao();  
}

function nomeValidacao(){
    nomeRecebido = {
        name: `${nomeUsuario}`
    }
}

let exportaNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeRecebido);
exportaNome.then(nomeValido)
exportaNome.catch(nomeInvalido)

function nomeValido(){    
    renderizarMensagem();
}

function nomeInvalido(){    
    alert("Nome/Apelido já existente! Escolha outro!");
    criarNome();
}

// Buscar Mensagens // 

refrescaChat();

function refrescaChat(){
    setInterval(usuarioAtivo, 5000);
}

function usuarioAtivo(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeRecebido);
    promise.then(atualizou);
}

function atualizou(){
    return;
}

function renderizarMensagem(){

    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(retorno);
}

function retorno(mensagem){    
    const pacoteMensagens = document.querySelector(".meio");

    for(let i = 0; i < mensagem.data.length; i++){
        
    if(mensagem.data[i].type === "status"){
    pacoteMensagens.innerHTML += `<div
    class="msgs status"> 
    <h1>(${mensagem.data[i].time})</h1>
    <h2>${mensagem.data[i].from}</h2>
    <h3>${mensagem.data[i].text}</h3>
    </div>`;}

    if (mensagem.data[i].type === "message"){
    pacoteMensagens.innerHTML += `<div
    class="msgs message"> 
    <h1>(${mensagem.data[i].time})</h1>
    <h2>${mensagem.data[i].from}</h2> para <h2>${mensagem.data.to}:</h2>
    <h3>${mensagem.data[i].text}</h3>
    </div>`;}

    if (mensagem.data[i].type === "private_message" && mensagem.data.to){
    pacoteMensagens.innerHTML += `<div
    class="msgs private"> 
    <h1>(${mensagem.data[i].time})</h1>
    <h2>${mensagem.data[i].from}</h2> reservadamente para <h2>${mensagem.data.to}:</h2>
    <h3>${mensagem.data[i].text}</h3>    
    </div>`;}    
    }

    const rolagemAuto = document.querySelector('.meio div:last-child');
    rolagemAuto.scrollIntoView();
}

// Enviar Mensagem //

function enviarMensagem(){

    let mensagemEnviar = document.querySelector(".mensagemfeita").value;
    
    let mensagemCompleta = {
        from: `${nomeUsuario}`, to: "todos", text: `${mensagemEnviar}`, type: "message",
    }

    console.log(mensagemCompleta)
    
    let requerirMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemCompleta);
    requerirMensagem.then(envioValido);
    requerirMensagem.catch(envioInvalido);
    
    apagarInput();
} 

function apagarInput(){
    let apagaInput = document.querySelector(".base");
    apagaInput.innerHTML = `<img onclick="enviarMensagem()" src="img/Vector2.png" />`
    apagaInput.innerHTML = `<input type="text" class="mensagemfeita" placeholder="Escreva aqui..."/>
  <img onclick="enviarMensagem()" src="img/Vector2.png" />`
}

function envioValido(){
    renderizarMensagem();
}

function envioInvalido(erro){
   console.log(erro.data.status)
} 