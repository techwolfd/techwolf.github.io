//esta variable sigue el paso de como turna esto
let activePlayer = 'X';
//este array almacena un array de movimiento nosotros usamos esto para determinar una condicion de ganador
let selecctedSquares =[];

//esta funcion esta por placing an x or o in un jugador
function placeXOrO(squareNumber){
// esta condicion ensures un jugador que no tiene esta seleciconado realmente
//el .some() metodo es usado para revisar cada elemento de seleccion jugador arreglo
// para ver si este contador del jugador clickeo
    if (!selecctedSquares.some(element => element.includes(squareNumber))){
            //esta variavle revisa el html elemento id que fue clickeado
        let select = document.getElementById(squareNumber);
        //esta condicion checa quien es el turno
        if(activePlayer === 'X'){
            //si el jugador activo es igual a x la imagen x.png es puesto en el html
            select.style.backgroundImage = 'url("images/x.png")';
            //el jugador activo mmay solo  estar x o o ssi no x es el mas ser o
        } else {
            select.style.backgroundImage = 'url("images/o.png")'; 
        }
        //squarenumber y active player esta concatenado junto y sumado al array
        selecctedSquares.push(squareNumber + activePlayer);
        //esta condicion esta por cambiando el jugador activo
        checkWinConditions();

        if (activePlayer === 'X') {

            activePlayer = 'O';

        }else {
            activePlayer = 'X';
        }
        //esta funcion plays placement  sonido
        audio ('./media/pass.mp3');
        //esta condicion revisa a mirar si esto es el turno de la pc
        if(activePlayer === 'O') {
            // this function disables clicking for computer choice
            disableClick();
            //esta funcion waits 1 second before computer places image and enables click
            setTimeout(function() { computersTurn(); }, 1000)
        }
        //returnig true is needed for our computersturn function to work
        return true;
    }

    //this function results in a random square being selected.
    function computersTurn(){
        //this boolean is needed for our while loop
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying if a square is selected already
        while(!success){
            //a random number between o and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluaed returns true the square hasnot been selected yet
            if(placeXOrO(pickASquare)){
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success= true;
            };
        }
    }

}


//this function parses the selectedsquares array to search for win conditione
//drawline function is called to draw line if condition is met
function checkWinConditions (){
    // x o 1 2 condicion
    if      (arrayIncludes('0X','1X','2X')) { drawWinLine(50,100,558,100)}
    //x 3 4 5 condicion
    else if (arrayIncludes('3X','4X','5X')) { drawWinLine(50,304,558,304)}
    //condition 3
    else if (arrayIncludes('6X','7X','8X')) { drawWinLine(50,508,558,508)}
    
    //condition 4
    else if (arrayIncludes('0X','3X','6X')) { drawWinLine(100,50,100,558)}
    //condition 5
    else if (arrayIncludes('1X','4X','7X')) { drawWinLine(304,50,304,558)}
    //condition 6
    else if (arrayIncludes('2X','5X','8X')) { drawWinLine(508,50,508,558)}
    
//condition 7
    else if (arrayIncludes('6X','4X','2X')) { drawWinLine(100,508,510,90)}
    //condition 8
    else if (arrayIncludes('0X','4X','8X')) { drawWinLine(100,100,520,520)}
    //condition 9
    else if (arrayIncludes('0O','1O','2O')) { drawWinLine(50,100,558,100)}
    
//condition 10
    else if (arrayIncludes('3O','4O','5O')) { drawWinLine(50,304,558,304)}
//condition 11
    else if (arrayIncludes('6O','7O','8O')) { drawWinLine(50,508,558,508)}
//condition 12
    else if (arrayIncludes('0O','3O','6O')) { drawWinLine(100,50,100,558)}

//condition 13
    else if (arrayIncludes('1O','4O','7O')) { drawWinLine(304,50,304,558)}
//condition 14
    else if (arrayIncludes('2O','5O','8O')) { drawWinLine(508,50,508,558)}
//condition 15
    else if (arrayIncludes('6O','4O','2O')) { drawWinLine(100,508,510,90)}

//condition 16
    else if (arrayIncludes('0O','4O','8O')) { drawWinLine(100,100,520,520)}
    //this condition checkc for ti if none of the above conditions register ans 9
    //squares are selectd the code execute

    else if (selecctedSquares.length >= 9){
        //this function playes the tie game sound
        audio('./media/wrong.mp3');
        //this function sets a 3 second timer before the resetgame is called
        setTimeout(function() {resetGame(); }, 1000);
    }


    //this function check if an array includes 3 string it is used to check fo
    //each win condition
function arrayIncludes(squareA, squareB, squareC){
    //these 3 variabless will be used to check for 3 in a row
    const a = selecctedSquares.includes(squareA)
    const b = selecctedSquares.includes(squareB)
    const c = selecctedSquares.includes(squareC)
    //if the 3 varibles we pass are all included in our array true is
    //returned and our else if condition executes the drawline function

    if(a=== true && b=== true && c === true){return true}
}

}

//this function makes our body element temporality unclickable
function disableClick(){
    //this makes our body unclickable
    body.style.pointerEvents = 'none';

    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//this function takes a string parameter of the path you set earlier for
//placement sound 

function audio (audioURL){
    //we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays our audio sound
    audio.play();
}

//this function utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2){
//this line access our html canvas alement
    const canvas = document.getElementById('win-lines')
    //this line give us access to methods and properties sto use on canvas
    const c = canvas.getContext('2d');
    //this line indicates where the star of a lines x axis is
    let x1 = coordX1,
        // this line indicates where the start f a lines y axis is
        y1 = coordY1,
        // this line indicates where the end of a lines x axis is
        x2 = coordX2,
        // this line indicates where the end of a lines x axis is
        y2 = coordY2,
        //this variable stores temporary x axis data we update in our an
        x = x1,
        //this variable stores temporary x axis data we update in our an
        y = y1;

        //this function interacts with the canvas
        function animateLineDrawing(){
            //this variable creates a loop
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            //this method clears content from last loop iteration
            c.clearRect (0,0,608,608)
            //this method stars a new path
            c.beginPath();
            //this method moves us to a starting point for our line
            c.moveTo(x1,y1)
            //this method indicates the end point in our line
            c.lineTo(x,y)
            //this method ses the color of our line
            c.lineWidth=10;
            //this method sets the color of our line
            c.strockeStyle = 'rgba(70, 255, 33, .8)';
            //this method draws everything we laid our above
            c.stroke();
            //this condition checks if we ve reached the endpoint
            if(x1 <= x2 && y1 <= y2){
                //this condition adds 10 to the previous end x point
                if(x < x2) {x += 10;}
                //this condition adds 10 to the previous end y point
                if(y < y2) {y += 10;}
                //this condition cancels our animation loop
                //if weve reach the end points
                if(x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop); }
            }
            //this condition is similar to the one above.
            //this is necessary for the 6, 4, 2 win condition
            if(x1 <= x2 && y1 >= y2){
                if (x < x2) {x +=10;}
                if (y > y2) {y -=10;}
                if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
            }
        }
        //this function clears our canvas after our win line is drawn
        function clear(){
            //this line starts our animation loop
            const animationLoop = requestAnimationFrame(clear);
            //this line clears our canvas
            c.clearRect(0,0,608,608);
            //this line stops our animation loop
            cancelAnimationFrame(animationLoop);
        }
        //this line disallows clicking while the win sound is playing
        disableClick();
        //this line plays the win sounds
        audio('./media/win.mp3');
        //this line calls our main animation loop
        animateLineDrawing();
        //this line wais 1 second then clears canvas resets game and allows clicking again
        setTimeout(function () { clear (); resetGame(); },1000);

}
//this functin resets the game in the event of a tie or a win
function resetGame(){
    //this for loop iterates through each html square element
    for (let i = 0; i<9;i++){
        //this variable gets the html slement of 1
        let square = document.getElementById(String(i))
        //this removes our elements backgroundimage
        square.style.backgroundImage = ''
    }
    //this resets our array so it is empty and we can start over
    selecctedSquares = [];
}