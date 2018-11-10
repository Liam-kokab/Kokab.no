var stopAnimations = false;
var stopBackgroundAnimation = false;
var animationInProgress = false;

var backgroundImageIds = [];

/**
 * 
 * @param {int} num image num that call this
 * @param {String} action action to be performd
 */
function controller(num, action){
    if(action === "over"){
        stopAnimations = true;
        if(animationInProgress){
            setTimeout(function() {
                controller(num, action);
            }, 5);
            return;
        }
        mouseOver(num);
        stopAnimations = false;
    }
    else if(action === "leave"){
        animationInProgress = true;
        stopAnimations = false;
        document.getElementById("mainGridElem" + num).style.opacity = 0.7;
        mouseLeaves(0.34, num);     
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

    //remove all elements from image id list
    backgroundImageIds = [];
    

    do{

        for (var i = 0; i < 3; i++) {
            var id = "backgroundImg" + (++imageCount);
            divElem.innerHTML += "<img src='.././img/SpaceFighter1.png' class='backgroundImg' id='" + id + "'>";
            backgroundImageIds.push(id);
            //top position
            document.getElementById(id).style.top = ((Math.floor(imageCount/3) * imageHeight)) + "px";

            //left position
            document.getElementById(id).style.left = ((i * document.getElementById(id).clientWidth)) + "px";
        }
    }while(inneHeight > ((imageCount/3) * imageHeight) - 10);
    stopAnimations = false;
    playBackgroundAnimation();

}
var imageAnimationPlayingNow = 0;
function playBackgroundAnimation(){
    if(stopAnimations || stopBackgroundAnimation) return;
    while(imageAnimationPlayingNow < 10){
        let image = document.getElementById(
            backgroundImageIds[random(0,backgroundImageIds.length,true)]);
        backBackgrounAnimation(
            random(5,30,true),
            image,
            random(3, 3, true)/100
        );
        imageAnimationPlayingNow++;
    
    }    

}

//TODO: fix this.........
/**
 * 
 * @param {int} itrastion 
 * @param {*} image 
 * @param {*} opacityChange 
 */
function backBackgrounAnimation(itrastion, image, opacityChange){
    if(stopAnimations || stopBackgroundAnimation) return;
    setTimeout(function() {
        if(stopAnimations || stopBackgroundAnimation) return;

        
        let imageOpacity = window.getComputedStyle(image).getPropertyValue("opacity");
        if(imageOpacity < 0.3 && opacityChange < 0) opacityChange = Math.abs(opacityChange);
        else if(imageOpacity > 0.75 && opacityChange > 0) opacityChange = -opacityChange;
        //console.log("image.style.opacity: " + window.getComputedStyle(image).getPropertyValue("opacity") + "\n opacityChange: " + opacityChange);
        console.log("opacaty: " + imageOpacity + "\nchange: " + opacityChange);
        
        image.style.opacity = opacityChange + imageOpacity;
        if(itrastion > 1) backBackgrounAnimation(itrastion - 1, image, opacityChange);
        else{
            imageAnimationPlayingNow--;
            playBackgroundAnimation();
            }
    }, 25);
}
/**
 * 
 * @param {float} countup counts up 
 * @param {int} num image num that call this
 */
function mouseLeaves(countup, num){
    if(stopAnimations){
        animationInProgress = false;
        return;
    }
    setTimeout(function() {
        if(stopAnimations){
            animationInProgress = false;
            return;
        }
        for (var j = 1; j < 7; j++){
            if(num != j) document.getElementById("mainGridElem" + j).style.opacity = countup;
        }
        document.getElementById("backgroundDiv").style.opacity = (0.84-countup);
        if(countup < 0.7) mouseLeaves(countup + 0.03, num);
        else {
            animationInProgress = false;
            document.getElementById("backgroundDiv").innerHTML = "";
        }
    }, 30);
}

/**
 * get a random number
 * @param {number} from scop
 * @param {number} to scop, but not including
 * @param {boolean} integer, true for integer and false for float
 * @returns {num} a random number
 */
function random(from, to, integer){
    if(integer) return Math.floor(((to - from) * Math.random()) + from);
    return ((to - from) * Math.random()) + from;
}

//window.addEventListener("onload", init());
//document.addEventListener("DOMContentLoaded", init(), false);
//window.addEventListener("resize", init());

/**
    setTimeout(function() {
        
    }, 10);
 */