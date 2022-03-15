// Estado de la APP
let STATE = {
    currentWord: "", // Aquí debemos guardar el resultado de getNextWord()
    currentProgressWord: 0, // indica cual es la siguiente posición del "currentWord" a procesar

    // Si le pasas una letra, te dice si esa letra va justamente en la posición 'currentProgressWord'
    isCorrectLetter: function (inputLetter) {
        return this.currentWord[STATE.currentProgressWord] == inputLetter;
    },

    // Nos indica si hemos escrito ya toda la letra
    isWordFinished: function () {
        return this.currentProgressWord == this.currentWord.length;
    }
}

// Paso 1: al hacer click en el botón empezar, obtener la primera palabra a procesar. Debemos también ocultar el botón de empezar y mostrar el contenedor con la palabra a escribir. Añadir el listener de teclado

let start = document.querySelector("button") 
let word = document.querySelector("#next-word-card")
console.log();
start.addEventListener("click", function(event) {

    start.classList.add("w3-hide");

    word.classList.remove("w3-hide");

    STATE.currentWord = getNextWord();

    document.querySelector("#next-word").textContent = STATE.currentWord;

    Watch.startWatch();
})


// PASO 2: Escuchar el teclado

// Requisito 1: Añadir un listener para detectar las letras introducidas por el usuario (solo letras). Mostrar por console.log

document.body.addEventListener("keyup", function(event) {
    console.log(event.key);

    let keyPress = event.key 

    console.log(STATE.isCorrectLetter(event.key));

    if (!STATE.isCorrectLetter(keyPress)) {
        return;
    }  

    STATE.currentProgressWord++;

    let correctSubWord = STATE.currentWord.slice(0, STATE.currentProgressWord);
    let wordToProcess = STATE.currentWord.slice(STATE.currentProgressWord);
    document.querySelector("#next-word").innerHTML = `<span style="color:green">${correctSubWord}</span>${wordToProcess}`;

    if (STATE.isWordFinished()){
        Watch.stopWatch();
        console.log(STATE.currentProgressWord);
        console.log(STATE.currentWord.length);
        STATE.currentProgressWord = 0;
        STATE.currentWord =  getNextWord();
        document.querySelector("#next-word").textContent = STATE.currentWord
        Watch.startWatch();
        
    }


});

// Requisito 2: Cada vez que el usuario pulsa una tecla:
   // A. Ver si la tecla pulsada, es la que toca: STATE.isCorrectLetter(teclaPulsadaPorElUsuario). Si NO es la que toca, terminar la función inmediatamente

   // B. Su ha escrito correctamente la letra que toca
      // 1. Actualizar +1 la variable STATE.currentProgressWord
      // 2. Comprobar si ya hemos terminado la palanbra con STATE.isWordFinished
        // A. Resetear la variable STATE.currentProgressWord
        // B. Obtener una nueva palabra con getNextWord() y asignarla a STATE.currentWord;
        // C. Actualiar document.querySelector("#next-word") con la nueva palabra
      // 3. Actualizar la UX. Os ayudará el método substring o slice. Podeis usar <span> para este cometido; partiendo la STATE.currentWord por el índice de currentProgressWord https://oscarm.tinytake.com/msc/NjYyMTUyOF8xOTE2NDI1NQ





