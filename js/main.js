var stopAnimation = false;
var animationInProgress = false;
var backgroundImageIds = [];

/**
 * 
 * @param {int} num image num that call this
 * @param {String} action action to be performd
 */
function controller(num, action){
    if(action === "over"){
        stopAnimation = true;
        if(animationInProgress){
            setTimeout(function() {
                controller(num, action);
            }, 5);
            return;
        }
        mouseOver(num);
        stopAnimation = false;
    }
    else if(action === "leave"){
        animationInProgress = true;
        stopAnimation = false;
        document.getElementById("mainGridElem" + num).style.opacity = 0.7;
        mouseLeave(0.34, num);     
    }
}

/**
 * 
 * @param {int} num image number that call this.
 */
function mouseOver(num){
    
    //ajusting opacity
    for (var j = 1; j < 7; j++) {
        if(num != j) document.getElementById("mainGridElem" + j).style.opacity = 0.3;
         else  document.getElementById("mainGridElem" + j).style.opacity = 1;
    }

    
    var imageCount = -1;
    var inneHeight = document.getElementById('body').clientHeight;
    //var minusTop = -Math.floor(inneHeight/20); 
    //var minusLeft = Math.floor(document.getElementById('body').clientWidth / 20);
    var imageHeight = document.getElementById("backgroundImg").clientHeight;

    var divElem = document.getElementById("backgroundDiv");
    divElem.style.opacity = 0.5;
    divElem.innerHTML = "";
    

    do{
        //console.log("ImageCount " + imageCount);
        for (var i = 0; i < 3; i++) {
            var id = "backgroundImg" + (++imageCount);
            divElem.innerHTML += "<img src='.././img/SpaceFighter1.png' class='backgroundImg' id='" + id + "'>";
            
            //top position
            document.getElementById(id).style.top = ((Math.floor(imageCount/3) * imageHeight)) + "px";

            //left position
            document.getElementById(id).style.left = ((i * document.getElementById(id).clientWidth)) + "px";
        }
    }while(inneHeight > ((imageCount/3) * imageHeight) - 10);
    stopAnimation = false;
    playAnimation(imageCount);
}

function playAnimation(count){
    if(stopAnimation) return;
}

function animation(time){
    if(stopAnimation) return;

}
/**
 * 
 * @param {float} countup counts up 
 * @param {int} num image num that call this
 */
function mouseLeave(countup, num){
    if(stopAnimation){
        animationInProgress = false;
        return;
    }
    setTimeout(function() {
        if(stopAnimation){
            animationInProgress = false;
            return;
        }
        for (var j = 1; j < 7; j++){
            if(num != j) document.getElementById("mainGridElem" + j).style.opacity = countup;
        }
        document.getElementById("backgroundDiv").style.opacity = (0.84-countup);
        if(countup < 0.7) removeBackground(countup + 0.03, num);
        else {
            animationInProgress = false;
            document.getElementById("backgroundDiv").innerHTML = "";
        }
    }, 30);
}

//window.addEventListener("onload", init());
//document.addEventListener("DOMContentLoaded", init(), false);
//window.addEventListener("resize", init());

/**
    setTimeout(function() {
        
    }, 10);
 */