const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(retorno);

function retorno(mensagem){
    console.log(mensagem)
    const pacoteMensagens = document.querySelector(".meio");

    for(let i = 0; i < 10; i++){
     if(mensagem.data[i].type === "status"){
    pacoteMensagens.innerHTML = `<div
        class="msgs status"> 
        <h1>(${mensagem.data[i].time})</h1>
        <h2>${mensagem.data[i].from}</h2>
        <h3>${mensagem.data[i].text}</h3>
        </div>`;
    }
    if (mensagem.data[i].type === "message") {
        pacoteMensagens.innerHTML = `<div
        class="msgs message"> 
        <h1>${mensagem.data[i].time}</h1>
        <h2>${mensagem.data[i].from}</h2> para <h2>${mensagem.data.to}</h2>: 
        <h3>${mensagem.data[i].text}</h3>
        </div>`; 
    }
    if (mensagem.data[i].type === "private_message") {
        pacoteMensagens.innerHTML = `<div
        class="msgs private"> 
        <h1>${mensagem.data[i].time}</h1>
        <h2>${mensagem.data[i].from}</h2> reservadamente para <h2>${mensagem.data.to}</h2>: 
        <h3>${mensagem.data[i].text}</h3>    
        </div>`;
    }    
}
}

/* axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);

function novoNome(){
const nomeUsuario = {
    nome: prompt("Insira aqui um nome/apelido válido!")
}
}

Promise.then(nomeValido)
Promise.catch(nomeInvalido)

function nomeValido(){
     // fazer algum comando que direcione ao bate-papo já integrado com o nome escolhido
}

function nomeInvalido(erro){
    if(erro.reponse.status === 400){
        alert("Nome/Apelido já existente! Escolha outro!");
        novoNome();
    }
}

axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeValido);

function enviarMensagem(textoEnviar){
    const mensagemCompleta = `from: ${nomeValido}, to: ${todos/especifico}, text: ${textoEnviar}, type: ${private/message}`;
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemCompleta);
}


*/ 