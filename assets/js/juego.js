/* 
    2C = Dos de Clubs (Tréboles)
    2D = Dos de Diamonds (Diamantes)
    2H = Dos de Hearts (Corazones)
    2S = Dos de Spades (Espadas)
*/

(() => {
  "use strict";
  let deck = []; // Se crea la baraja
  const tipos = ["C", "D", "H", "S"]; // Tipo de carta
  const especiales = ["A", "J", "Q", "K"]; // Cartas especiales
  let puntosJugador = 0,
    puntosComputadora = 0;
  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnDetener = document.querySelector("#btnDetener");
  const puntosHTML = document.querySelectorAll("small");
  const divCartasJugador = document.querySelector("#jugador-cartas");
  const divCartasComputadora = document.querySelector("#computadora-cartas");

  // Estas funcion me permite crear un nuevo deck
  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
    return deck;
  };

  crearDeck();

  // Esta función me permite tomar una carta del deck en este caso toma la ultima generada en el arreglo
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
  };
  // Aca se le asigna el valor numerico de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };
  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHTML[1].innerText = puntosComputadora;
      // Crear la carta de la computadora en el HTML
      const imgCarta = document.createElement("img");
      imgCarta.src = `./assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasComputadora.append(imgCarta);
      //Condicion para cuando el jugador tiene mas de 21 puntos
      if (puntosJugador > 21) {
        break;
      }
    } while (puntosComputadora < puntosJugador && puntosMinimos <= 21);
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nedie Gana 🤯");
      } else if (puntosMinimos > 21) {
        alert("La computadora Gana 🦾");
      } else if (puntosComputadora > 21) {
        alert("El usuario Gana 💪🏼");
      } else {
        alert("La computadora Gana 🦾");
      }
    }, 10);
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    // Crear la carta del jugador en el HTML
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);
    // Condición por si los puntos de pasan de 21
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora(puntosJugador);
    }
  });
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });
  btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });
})();
