var imageCount = -1;
function mouseOver(num){
    
    
    //ajusting opacity
    for (var j = 1; j < 7; j++) {
        if(num != j) document.getElementById("mainGridElem" + j).style.opacity = 0.3;
         else  document.getElementById("mainGridElem" + j).style.opacity = 1;
    }

    

    var inneHeight = document.getElementById('body').clientHeight;
    //var minusTop = -Math.floor(inneHeight/20); 
    //var minusLeft = Math.floor(document.getElementById('body').clientWidth / 20);
    var imageHeight = document.getElementById("backgroundImg").clientHeight;

    var html = "";
    var divElem = document.getElementById("backgroundDiv");

    do{
        //console.log("ImageCount " + imageCount);
        for (var i = 0; i < 3; i++) {
            var id = "backgroundImg" + (++imageCount);
            html = "<img src='.././img/SpaceFighter1.png' class='backgroundImg' id='" + id + "'>";

            divElem.innerHTML += html;
            
            //top position
            document.getElementById(id).style.top = ((Math.floor(imageCount/3) * imageHeight)) + "px";

            //left position
            document.getElementById(id).style.left = ((i * document.getElementById(id).clientWidth)) + "px";
        }
    }while(inneHeight > ((imageCount/3) * imageHeight) - 10);
}

function mouseleave(){
    // setting opacity to normal
    for (var j = 1; j < 7; j++) document.getElementById("mainGridElem" + j).style.opacity = 0.7;

    //removing background
    document.getElementById("backgroundDiv").innerHTML = "";

    
}

//no one is calling this! TODO: remove
var count = 0;
function init(){
    console.log("resize and load: " + count++);
}

//window.addEventListener("onload", init());
//document.addEventListener("DOMContentLoaded", init(), false);
//window.addEventListener("resize", init());