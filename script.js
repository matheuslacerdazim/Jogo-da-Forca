const palavras = ["macaco", "elefante", "baleia", "cachorro","gato","rato","leão","zebra","cacatua","tartaruga"];
let btnNovaPalavra = document.getElementById("btnNovaPalavra");
let btnVerificarPalavra = document.getElementById("btnVerificarPalavra");
let spPalavraSecreta = document.getElementById("spPalavraSecreta");
let spLetrasJogadas = document.getElementById("spLetrasJogadas");
let img = document.getElementById("imgForca");
let ipPalavraResposta = document.getElementById("ipPalavraResposta");
let vGlobais = {    
  ipSplit: [],
  letra: "",
  letrasJogadas: [],
  quantErros: 0,
  pOculta: [],
  pSorteada: "",
  pSorteadaSplit: [],
}
btnVerificarPalavra.disabled = true;


//button nova palavra
btnNovaPalavra.addEventListener("click", () => {
  btnNovaPalavra.disabled = true;
  vGlobais.quantErros = 0;
  img.removeAttribute("src");
  img.setAttribute("src", "img/Forca00.png");
  btnVerificarPalavra.disabled = false;
  ipPalavraResposta.disabled = false;
  spLetrasJogadas.textContent = "";
  sortearPalavra();
  esconderPalavra();
});

function sortearPalavra() {
  
  //gera um número baseado no tamanho do array palavras, que contém todas as palavras disponíveis para o jogo.
  //baseado nesse número escolhe uma das palavras e a atribui à <pSorteada> que esta no objeto vGlobais.
  
  let nAleatorio = Math.floor(Math.random() * palavras.length);
  vGlobais.pSorteada = palavras[nAleatorio];
}; 

function esconderPalavra() {
  
  //transforma a palavra em um array e depois troca cada letra por "-"
  //depois apresenta apenas os traços para o usuário, para que ele saiba o tamanho da palavra
  
  vGlobais.pOculta = vGlobais.pSorteada.split("");
  for (let i = 0; i < vGlobais.pOculta.length; i++) {
    vGlobais.pOculta[i] = "_";
  };
  spPalavraSecreta.textContent = vGlobais.pOculta;
};

//button verificar
btnVerificarPalavra.addEventListener("click", () => {
  pegarLetra();
  verificarErros();
  atualizarPalavraForca();
  encerrarPartidaNaDerrota();
  encerrarPartidaNaVitoria();  
});

function pegarLetra() {
  
  //Pega cada letra inserida pelo usuário as mostra na tela, para que o usuário saiba as letras ja jogadas.
  //Por fim zera o input.
  
  vGlobais.letra = ipPalavraResposta.value.toLowerCase();
  vGlobais.letrasJogadas.push(vGlobais.letra);
  spLetrasJogadas.textContent += `${vGlobais.letra},`;
  ipPalavraResposta.value = "";
}; 

function verificarErros() {
  
  //Cada letra errada atualiza a imagem da forca.
  
  if (!vGlobais.pSorteada.includes(vGlobais.letra)) {
    ++vGlobais.quantErros;
    console.log(vGlobais.quantErros)
  };
  switch (vGlobais.quantErros) {
    case 1:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca01.png"); break;
    case 2:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca02.png"); break;
    case 3:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca03.png"); break;
    case 4:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca04.png"); break;
    case 5:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca05.png"); break;
    case 6:
      img.removeAttribute("src");
      img.setAttribute("src", "img/Forca06.png"); break;
  }
}; 

function atualizarPalavraForca() {
  
  //Se a letra digitada no input for igual à alguma das letras da palavra, substitui o traço da palavra oculta pela letra acertada.
  //Por fim mostra a palavra oculta, com os traços substituidos pelas letras acertadas.
  
  vGlobais.pSorteadaSplit = vGlobais.pSorteada.split("");
  for (let i = 0; i < vGlobais.pOculta.length; i++) {
    if (vGlobais.letra == vGlobais.pSorteadaSplit[i]) {
      vGlobais.pOculta[i] = vGlobais.letra;      
    }
  }
  spPalavraSecreta.textContent = vGlobais.pOculta;
}; 

function encerrarPartidaNaDerrota() {

  //Se forem cometidos 6 erros encerra o jogo, desabilitando os respectivos botões e zerando os dados para um novo jogo com uma nova palavra.
  
  if (vGlobais.quantErros == 6) {
    ipPalavraResposta.disabled = true;
    btnVerificarPalavra.disabled = true;
    btnNovaPalavra.disabled = false;
    spLetrasJogadas.textContent = "";
    spPalavraSecreta.textContent = `Perdeu, tente novamente com outra palavra. A palavra era ${vGlobais.pSorteada}`;
  }
}; 

function encerrarPartidaNaVitoria() {

  //Se o usuário acertar a palavra encerra o jogo, desabilitando os respectivos botões para que se inicie um novo jogo.
  
  if (spPalavraSecreta.textContent == vGlobais.pSorteadaSplit) {
    ipPalavraResposta.disabled = true;
    btnVerificarPalavra.disabled = true;
    btnNovaPalavra.disabled = false;
    spPalavraSecreta.textContent = `Parabéns, voce ganhou ! Palavra: ${vGlobais.pSorteada}`;
  }
}; 


