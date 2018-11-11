//animation sync controllers 
var stopLeaveAnimations = false;
var stopBackgroundAnimation = false;
var leaveAnimationInProgress = false;
var waitingToPerformMouseOver = false;

// number of background animation being played 
var imageAnimationPlayingNow = 0;
var maxImageAnimationPlayingNow = 15;

var backgroundImageIds = [];

/**
 * 
 * @param {int} num image num that call this
 * @param {String} action action to be performed
 */
function controller(num, action){
    if(action === "over"){
        waitingToPerformMouseOver = true;
        stopLeaveAnimations = true;
        stopBackgroundAnimation = true;
        if(leaveAnimationInProgress || imageAnimationPlayingNow > 0){
            setTimeout(function() {
                controller(num, action);
            }, 2);
            return;
        }
        //performers mouse over actions 
        mouseOver(num);
        waitingToPerformMouseOver = false;
    }
    else if(action === "leave"){
        if(waitingToPerformMouseOver) return;
        stopBackgroundAnimation = true;
        if(imageAnimationPlayingNow > 0){
            setTimeout(function() {
                controller(num, action);
            }, 2);
            return;
        }

        leaveAnimationInProgress = true;

        //performers mouse leave actions
        document.getElementById("mainGridElem" + num).style.opacity = 0.7;
        mouseLeaves(0.34, num);     
    }
}

/**
 * 
 * @param {int} num image number that call this.
 */
function mouseOver(num){
    
    //adjusting opacity
    for (var j = 1; j < 7; j++) {
        if(num != j) document.getElementById("mainGridElem" + j).style.opacity = 0.3;
         else  document.getElementById("mainGridElem" + j).style.opacity = 1;
    }

    
    var imageCount = -1;
    var innerHeight = document.getElementById('body').clientHeight;
    var imageHeight = document.getElementById("backgroundImg").clientHeight;

    var divElem = document.getElementById("backgroundDiv");
    divElem.style.opacity = 0.7;
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
    }while(innerHeight > ((imageCount/3) * imageHeight) - 10);
    
    //starting background animation
    stopBackgroundAnimation = false;
    stopLeaveAnimations = false;
    playBackgroundAnimation();

}

/**
 * Starts the background animation 
 */
function playBackgroundAnimation(){
    if(stopBackgroundAnimation) return;
    while(imageAnimationPlayingNow < maxImageAnimationPlayingNow){
        let image = document.getElementById(
            backgroundImageIds[random(0,backgroundImageIds.length)]);
        
        imageAnimationPlayingNow++;
        backBackgroundAnimation(
            random(5, 30),
            image,
            random(-3, 3)/100
        );     
    }    
}

/**
 * dancing image
 * @param {int} iteration 
 * @param {*} image 
 * @param {*} opacityChange 
 */
function backBackgroundAnimation(iteration, image, opacityChange){
    if(stopBackgroundAnimation){
        imageAnimationPlayingNow--;
        return;
    }

    setTimeout(function() {
        if(stopBackgroundAnimation){ 
            imageAnimationPlayingNow--;
            return;
        }
     
        let imageOpacity = parseFloat(window.getComputedStyle(image).getPropertyValue("opacity"));

        if(imageOpacity < 0.1 && opacityChange < 0) opacityChange = Math.abs(opacityChange);
        else if(imageOpacity > 0.9 && opacityChange > 0) opacityChange = 0 - opacityChange;
        
        image.style.opacity = (opacityChange + imageOpacity);
       
        if(iteration > 1) backBackgroundAnimation(iteration - 1, image, opacityChange);
        else{
            imageAnimationPlayingNow--;
            playBackgroundAnimation();
        }
    }, 25);
}

/**
 * @param {float} countUp counts up 
 * @param {int} num image num that call this
 */
function mouseLeaves(countUp, num){
    if(stopLeaveAnimations){
        leaveAnimationInProgress = false;
        return;
    }
    setTimeout(function() {
        if(stopLeaveAnimations){
            leaveAnimationInProgress = false;
            return;
        }
        for (var j = 1; j < 7; j++){
            if(num != j) document.getElementById("mainGridElem" + j).style.opacity = countUp;
        }

        document.getElementById("backgroundDiv").style.opacity = (1-countUp);
        //backgroundImageIds.forEach(function (element) {
        //   document.getElementById(element).style.opacity = (0.84-countUp);
        //});

        if(countUp < 0.7) mouseLeaves(countUp + 0.03, num);
        else {
            leaveAnimationInProgress = false;
            document.getElementById("backgroundDiv").innerHTML = "";
        }
    }, 30);
}

/**
 * get a random number
 * @param {number} from range
 * @param {number} to range, but not including
 * @returns {num} a random number
 */
function random(from, to){
    return Math.floor(((to - from) * Math.random()) + from);
}

/**
    setTimeout(function() {
        
    }, 10);
 */