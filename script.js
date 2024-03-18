const btn = document.getElementById('btn-start');//get btn element from html;
const btnGameOver = document.getElementById('btn-game-over');
const scoreBoard = document.getElementById('score');
let bombList = [];
const gameOver = document.querySelector('section.game-over');
const gameWin = document.querySelector('section.game-win');


btn.addEventListener('click',function(){//add eventlistener on click;
    gameOver.classList.add('d-none'); //hide section
    gameWin.classList.add('d-none'); //hide section

    const [numSquares, widthClass] = chooseLevel() //get numSquares, widthClass as return from function
    
    let score = 0; //initialize score

    let bombList = [];//initialize array for bombList
    const bombListArmed = bombsGen(1, numSquares, bombList);//generate numbers-bomb pushed into array Armed
    squareWrapperGen(numSquares, widthClass, bombListArmed);//create game-board, squareWrapper, based on parameters that define: number of squares (based on difficulty), width of each square, which square is a bomb
    const square = document.querySelectorAll(".square");//select each square through class
    square.forEach(square => {
    square.addEventListener('click',function(){
        square.classList.toggle('clicked','true');//only one time: set class if clicked
            if(bombListArmed.includes(+ square.innerHTML)){//if the square clicked contains a bombArmed
                //console.log('hai perso');
                gameOver.classList.remove('d-none');//game over section un-hide
                scoreBoard.innerHTML =`
                    Your score: ${score}
                `;
            } else {
                score += 1;
                console.log('punteggio: ' + score);
            };
            if(score == (numSquares)){
                //console.log('Hai vinto!!!');
                gameWin.classList.remove('d-none');
                scoreBoard.innerHTML =`Your score: ${score}`;
            }
        });
    });
});

//To restart and try again, when "try again" button is clicked
btnGameOver.addEventListener('click',function(){
    squareWrapperGen(0, '', []);
    gameOver.classList.add('d-none');
})

/*EXPLANATION FUNCTION
- declaration fuction squareWrapperGen with two parameters;
- get element from html assigned to squareWrapper variable; 
- add class to the squareWrapper;
- declaration of tempHtml: in which "park" all the squares the the following for cycle would create;
- for cycle to create as many squares as numSquares parameter tells;
- how to create square? Write into tempHtml "parking/container" a div with classes (dynamic classes for widthClass parameter and the text, that is the index + 1 as I want numbers starting from 1 and not 0) and adding this string to the tempHtml "container" at every cycle;
- push tempHtml into squareWrapper: so there is only one element to be pushed into html (and not every div/square once at time);
*/

function squareWrapperGen(numSquares, widthClass, blacklist){
    const squareWrapper = document.querySelector('section.game-on');
    squareWrapper.className = 'd-flex flex-wrap db-square-wrapper game-on'
    let tempHtml = '';
    for(i = 0; i < numSquares; i++){
        if(blacklist.includes(i + 1)){//if i reoresents an armed bomb, then apply class "bomb" other than the same other classes
        tempHtml += `
            <div class="square ${widthClass} d-flex justify-content-center align-items-center bomb">
                    ${i + 1}
            </div>
            `
        } else {
            tempHtml += `
            <div class="square ${widthClass} d-flex justify-content-center align-items-center">
                    ${i + 1}
            </div>
            `
        }
    }
    squareWrapper.innerHTML = tempHtml;
};

/*EXPLANATION FUNCTION
- declaration of fuction chooseLevel;
- declaration of two variables (that serve as elements of the array this function returns; in order to use them as parameter into other functions);
- declaration variable levelSelected + assignation: got value from select input tag from html;
- assignation of values to variables depending on levelSelected value;
- return --> array/object with the two elements I'll use as parameters in other function;
*/

function chooseLevel(){
    let numSquares, widthClass;
    const levelSelected = document.getElementById("level").value;
    //console.log(levelSelected, typeof levelSelected);
    if(levelSelected.toLowerCase() == 'easy'){
        numSquares = 100;
        widthClass = 'db-width-easy';
        return [numSquares, widthClass];
    } else if (levelSelected.toLowerCase() == 'medium'){
        numSquares = 81;
        widthClass = 'db-width-medium';
        return [numSquares, widthClass];
    } else if (levelSelected.toLowerCase() == 'hard'){
        numSquares = 49;
        widthClass = 'db-width-hard';
        return [numSquares, widthClass];
    }
}


function generateUniqueRandomNumber(min, max, bombList){
    let numberGenerated = RndNumberGen(min, max);
    //console.log(numberGenerated);

    while(bombList.includes(numberGenerated)){
        numberGenerated = RndNumberGen(min, max);
        //console.log(numberGenerated);
    }
    //console.log('New number!!!: ' + numberGenerated);
    bombList.push(numberGenerated);
    //console.log(bombList);
    return numberGenerated;
}

function bombsGen(min, max, blacklist){
for (i = 0; i < 16; i++){
    generateUniqueRandomNumber(min, max, blacklist);
    }
    console.log(blacklist);
    return blacklist;
}