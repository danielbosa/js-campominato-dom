/*EXPLANATION
12) get btn element from html;
13) add eventlistener on click;
14) declaration + assignation of array that contains two elements: datum1 refers to numSquares, datum2 refers to widthClass; as chooseLevel() returns an array with two elements, I assign datum1 to the first returned value, datum2 to the second returned value; 
15) call squareWrapperGen function, using datum1 and datum2 (the two elements that are contained within the array returned from chooseLevel()) as parameters;
16) declaration of box variable + assignation to the element got from html (from the html the squareWrapperGen() has previously injected into html) by class .square;
17) add eventListener to each box;
18) at click, toggle 'clicked' class to/from classList;
19) print the content of html of the box clicked;
*/

const btn = document.getElementById('btn-start');
let bombList = [];

btn.addEventListener('click',function(){
    let bombList = [];
    bombsGen(1, datum1, bombList);

    const [datum1, datum2] = chooseLevel()
    squareWrapperGen(datum1, datum2);

    const box = document.querySelectorAll(".square");
    box.forEach(box => {
    box.addEventListener('click',function(){
        box.classList.toggle('clicked');
        console.log(box.innerHTML);
        });
    });
});

/*EXPLANATION FUNCTION
35) declaration fuction squareWrapperGen with two parameters;
36) get element from html assigned to squareWrapper variable; 
37) add class to the squareWrapper;
38) declaration of tempHtml: in which "park" all the squares the the following for cycle would create;
39) for cycle to create as many squares as numSquares parameter tells;
40) how to create square? Write into tempHtml "parking/container" a div with classes (dynamic classes for widthClass parameter and the text, that is the index + 1 as I want numbers starting from 1 and not 0) and adding this string to the tempHtml "container" at every cycle;
46) push tempHtml into squareWrapper: so there is only one element to be pushed into html (and not every div/square once at time);
*/

function squareWrapperGen(numSquares, widthClass){
    const squareWrapper = document.querySelector('section');
    squareWrapper.className = 'd-flex flex-wrap db-square-wrapper'
    let tempHtml = '';
    for(i = 0; i < numSquares; i++){
        tempHtml += `
            <div class="square ${widthClass} d-flex justify-content-center align-items-center">
                    ${i + 1}
            </div>
            `
    }
    squareWrapper.innerHTML = tempHtml;
};

/*EXPLANATION FUNCTION
57) declaration of fuction chooseLevel;
58) declaration of two variables (that serve as elements of the array this function returns; in order to use them as parameter into other functions);
59) declaration variable levelSelected + assignation: got value from select input tag from html;
61-63) assignation of values to variables depending on levelSelected value;
64) return --> array/object with the two elements I'll use as parameters in other function;
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


//^ NEW CODE  
function generateUniqueRandomNumber(min, max, bombList){
    let numberGenerated = RndNumberGen(min, max);
    //console.log(numberGenerated);

    while(bombList.includes(numberGenerated)){
        numberGenerated = RndNumberGen(min, max);
        //console.log(numberGenerated);
    }
    //console.log('Numero nuovo!!!: ' + numberGenerated);
    bombList.push(numberGenerated);
    //console.log(bombList);
    return numberGenerated;
}

// funzione genera una bomba
// io voglio 16 bombe
// metto funzione dentro ciclo for che cicla 16 volte

function bombsGen(min, max, blacklist){
for (i = 0; i < 16; i++){
    generateUniqueRandomNumber(min, max, blacklist);
    }
    console.log(blacklist);
}


// let min = 1
// let max = 100
// bombsGen(min, max, bombList);
// generateUniqueRandomNumber(min, max, bombList)