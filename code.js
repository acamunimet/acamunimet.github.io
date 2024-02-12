const usuarios = [];

// C L A S E S
// Clase jugador
class player {

    name = '';
    grid = [];
    victories = 0;

    constructor(nombre){
        this.name = nombre;
    }

    addVictory() {
        this.victories +=1;
    }

    setGrid(dimension) {
        this.grid = generateMatrix(dimension);
    }

    checkNumbers(number) {
        if (this.grid.length != 0) {
            for (let index = 0; index < this.grid.length; index++) {
                for (let index2 = 0; index2 < this.grid[index].length; index++) {
                    if (this.grid[index][index2].getContent == number) {
                        this.grid[index][index2].toggleChecked();
                    };
                };
                
            };
        };
    }
}

// Clase caja de matriz
class matrix_box {

    checked = false;
    content = 0;

    constructor(number){
        this.content = number;
    };

    getContent() {
        return  this.content;
    };

    toggleChecked() {
        if (this.checked == false) {
            this.checked == true;
        }else{
            this.checked == false;
        }
    };
}


// F U N C I O N E S

// Mostrar/Ocultar secciones
function showHideButton_Display(){
    var container = document.getElementsByClassName("button_display")[0];
    if (container.style.visibility == 'hidden') {
        container.style.visibility = 'visible';
    } else {
        container.style.visibility = 'hidden';
    }
}

// Comenzar juego
function startGame(dimension){
    const ingame_players = [];

    for (let i = -1; i > -5; i--) {
            ingame_players.push(usuarios[i]);                           // Registra los ultimos 4 jugadores de la lista de jugadores
        }                     
    let turn = 0;
    while (turn < 26) {
        if (turn == 0) {
            for (let index = 0; index < ingame_players.length; index++) {
                ingame_players[index].setGrid(dimension);                   // Genera los 4 cartones de juego
            };
        }
        let x = releaseNumber();                                        // Libera el numero de la ronda
        for (let i = 0; i < ingame_players.length; i++) {
            ingame_players[i].checkNumbers();                           // Chequea si el jugador tiene el numero seleccionado en su grilla para marcarlo como 
                                                                         
            
        }
        turn += 1;
    };


};


// Generar usuarios
function handleSubmit() {
    const nombre = document.getElementById('input-nombre').value;

    let player = new player(nombre);
    usuarios.push(player);
    return player
}

// Generar numero
function releaseNumber(){
    x = Math.floor((Math.random() * 50) + 1);
    return x;
}

// Generar matriz
function generateMatrix(dimension) {            //Dimension es un nro del 3 al 5
    const matrix = [];

    const matrix_numbers = [];
    while (matrix_numbers.length != dimension*dimension) {
        for (let i = 0; i < dimension*dimension; i++) {
            let x = Math.floor((Math.random() * 50) + 1);       //Seleccion de todos los numeros de la matriz sin repetir
            while (matrix_numbers.includes(x)) {
                x = Math.floor((Math.random() * 50) + 1);
            };
            matrix_numbers.push(x);
        };
    };

    while (matrix.length != dimension) {
        const matrix_row = [];
        while (matrix_row.length != dimension) {
          const y = new matrix_box(matrix_numbers[0]);
          matrix_row.push(y);                                   //Adicion de las cajas a la matriz de forma NxN
          matrix_numbers.shift();
        };
        matrix.push(matrix_row); 
      };

    return matrix;
};