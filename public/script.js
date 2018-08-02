function getRandom(){

    //Return random number between 0 and 1.
    return (Math.random());

}

function getCircleOrSquare() {

    return Math.floor(getRandom()+10)+1;

}

function getRectById(id){
    return document.getElementById(id).getBoundingClientRect();
}

function getRandomPosition() {

    //This returns object with left, top, width and height fields.
    var rect = getRectById("game-space");
    //Vertical position
    var positionArray = [];
    positionArray[0] = (getRandom() * (rect.bottom - 200)) + 50;
    //Horizontal position    
    positionArray[1] = (getRandom() * (rect.right - 200)) + 50;

    return  positionArray;
}

function getRandomSize() {

    var size = 0;
    size = (getRandom() * 300) + 10;   
    return size;

}


function setRandomPositionById(id){

    var elementStyle = document.getElementById(id).style;
    elementStyle.position = "relative";
    elementStyle.display = "block";
    var positionArray = getRandomPosition();
    elementStyle.left = positionArray[1];
    elementStyle.top = positionArray[0];

}

function setRandomSizeById(newid){

    var size = getRandomSize();
    document.getElementById(newid).style.width = size + "px";
    document.getElementById(newid).style.height = size + "px";

}


function resetGame() {

    document.getElementById("circle").style.display = "none";
    document.getElementById("square").style.display = "none";
    var d = new Date();
    var nowTime = d.getTime();
    var reactionTime = nowTime - lastClick;
    lastClick = nowTime;
    document.getElementById("reaction-time").innerHTML = "Your time: " + reactionTime/1000 + " seconds!!!";
    console.log(reactionTime);
    var rand = Math.round(Math.random() * (2000 - 200)) + 200;
    setTimeout(function(){
        var newid = getRandomId();
        setRandomSizeById(newid);
        setRandomColorById(newid);
        setRandomPositionById(newid);


    }, rand);

}

function colorGenerator () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

function setRandomColorById(newid) {

    var color = colorGenerator();
    if (color != "#FFFFFF"){

           document.getElementById(newid).style.backgroundColor = color;

    }else {

        setRandomColorById(newid);

    }


}



function getRandomId() {
    var ids = ["circle", "square"];
    return(ids[Math.floor(Math.random() * ids.length)]);
}

function startGame() {

    var newid = getRandomId();
    setRandomSizeById(newid);
    setRandomPositionById(newid);
    var d = new Date();
    lastClick = d.getTime();
    return lastClick;
}





window.onload = startGame();


