/**
 * Created by Liam.k on 08.11-2018.
 */

//animation sync controllers 
var stopLeaveAnimations = false;
var stopBackgroundAnimation = false;
var leaveAnimationInProgress = false;
var MouseOverInProgress = false;

// number of background animation being played 
var imageAnimationPlayingNow = 0;
var maxImageAnimationPlayingNow = 10;

//list of background image ids
var backgroundImageIds = [];

/**
 * 
 * @param {int} num image num that call this
 * @param {String} action action to be performed
 */
function controller(num, action){
    if(action === "over"){
        MouseOverInProgress = true;
        stopLeaveAnimations = true;
        stopBackgroundAnimation = true;
        if(leaveAnimationInProgress || imageAnimationPlayingNow > 0){
            setTimeout(function() {
                controller(num, action);
            }, 3);
            return;
        }
        //performers mouse over actions 
        mouseOver(num);
        MouseOverInProgress = false;
    }
    else if(action === "leave"){
        if(MouseOverInProgress) return;

        stopBackgroundAnimation = true;
        if(imageAnimationPlayingNow > 0){
            setTimeout(function() {
                controller(num, action);
            }, 3);
            return;
        }

        leaveAnimationInProgress = true;

        //performers mouse leave actions
        document.getElementById("mainGridElem" + num).style.opacity = 0.7;
        mouseLeaves(0.34, num);     
    }
}

/**
 * performers mouse over
 * @param {int} num image number that call this.
 */
function mouseOver(num){
    
    //adjusting opacity of icons
    for (var j = 1; j < 7; j++) {
        if(num != j) document.getElementById("mainGridElem" + j).style.opacity = 0.3;
         else  document.getElementById("mainGridElem" + j).style.opacity = 1;
    }

    var imageCount = -1;
    var innerHeight = document.getElementById('body').clientHeight;
    document.getElementById('body').style.backgroundColor = 'rgb(' + [100,100,100].join(',') + ')';

    //getting info for image 
    var images = getImageInfo(num);
    var imageHeight = document.getElementById(images.sampleImageId).clientHeight;

    var divElem = document.getElementById("backgroundDiv");
    divElem.style.opacity = 0.7;
    divElem.innerHTML = "";

    //remove all elements from image id list
    backgroundImageIds = [];
    
    do{
        for (var i = 0; i < 3; i++) {
            var id = "backgroundImg" + (++imageCount);
            divElem.innerHTML += "<img src='" + 
                images.folder + images.names[random(0,images.names.length)] + 
                "' class='backgroundImg' id='" + id + "'>";

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
    while(imageAnimationPlayingNow < maxImageAnimationPlayingNow &&
        imageAnimationPlayingNow < backgroundImageIds.length){

        imageAnimationPlayingNow++;
        var image = document.getElementById(
            backgroundImageIds[random(0,backgroundImageIds.length)]);
        //start animation thread            
        backBackgroundAnimation(
            random(5, 30),
            image,
            random(-25, 25)/1000
        ); 
    }    
}

/**
 * dancing image
 * @param {int} iteration 
 * @param {Image} image 
 * @param {Number} opacityChange 
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
        var imageOpacity;
        try {
            imageOpacity = parseFloat(window.getComputedStyle(image).getPropertyValue("opacity"));
        }catch(error) { imageOpacity = 0.5; }
        
        if(imageOpacity < 0.1 && opacityChange < 0) opacityChange = Math.abs(opacityChange);
        else if(imageOpacity > 0.9 && opacityChange > 0) opacityChange = 0 - opacityChange;
        
        //try for safety
        try{ 
            image.style.opacity = (opacityChange + imageOpacity);
        }catch(error){}
        if(iteration > 1) backBackgroundAnimation(iteration - 1, image, opacityChange);
        else{
            imageAnimationPlayingNow--;
            playBackgroundAnimation();
        }
    }, 30);
}

/**
 * @param {float} countUp counts up 
 * @param {int} num image num that call this
 */
function mouseLeaves(countUp, num){
    if(stopLeaveAnimations){
        document.getElementById("body").style.backgroundColor = "white";
        leaveAnimationInProgress = false;
        return;
    }
    setTimeout(function() {
        if(stopLeaveAnimations){
            document.getElementById("body").style.backgroundColor = "white";
            leaveAnimationInProgress = false;
            return;
        }
        for (var j = 1; j < 7; j++){
            if(num != j) document.getElementById("mainGridElem" + j).style.opacity = countUp;
        }
        var color = countUp * 350;
        document.getElementById("body").style.backgroundColor = 'rgb(' + [color,color,color].join(',') + ')';
        document.getElementById("backgroundDiv").style.opacity = (1-countUp);

        if(countUp < 0.7) mouseLeaves(countUp + 0.03, num);
        else {
            document.getElementById("body").style.backgroundColor = "white";
            document.getElementById("backgroundDiv").innerHTML = "";
            leaveAnimationInProgress = false;
        }
    }, 30);
}

/**
 * get a random number
 * @param {Number} from range
 * @param {Number} to range, but not including
 * @returns {Number} a random number
 */
function random(from, to){
    return Math.floor(((to - from) * Math.random()) + from);
}

/**
 * pre-loads background images
 */
function loadImages(){
    var body = document.getElementById("body");
    for (var i = 1; i < 7; i++) {
        var imageG = getImageInfo(i);

        body.innerHTML += "<img src='" +
                imageG.folder + imageG.names[0] +
                "' class='backgroundImg' id='" +
                imageG.sampleImageId +
                "' style='top: -500px;'></img>";

        for (var j = 1; j < imageG.names.length; j++) {
            body.innerHTML += "<img src='" +
                imageG.folder + imageG.names[j] +
                "' class='backgroundImg'" +
                "  style='top: -500px;'></img>";            
        }        
    }
}

/**
 * @param {Number} num 
 * @returns image info
 */
function getImageInfo (num){
    /**
     * Image group object 
     * @param {Number} num 
     * @param {string[]} names file names 
     * @param {Number} count 
     * @param {String} sampleImageId 
     */
    function image(num, names, count, sampleImageId){
        this.folder = "../img/" + num + "/";
        this.names = names; 
        this.numberOfImages = count;
        this.sampleImageId = sampleImageId;
        //height = document.getElementById(this.sampleImageId).clientHeight;  
        height = 5;
    }
    switch(num){ 
        case 1: return new image(num, ["testImage.png"]                         , 1, "sampleImageId1");
        case 2: return new image(num, ["CV.png"]                                , 1, "sampleImageId2");
        case 3: return new image(num, ["minesweeper1.png", "minesweeper2.png"]  , 2, "sampleImageId3");
        case 4: return new image(num, ["sf1.png", "sf2.png", "sf3.png"]         , 3, "sampleImageId4");
        case 5: return new image(num, ["Solias1.png", "Solias2.png"]            , 2, "sampleImageId5");
        case 6: return new image(num, ["GitHub.svg"]                            , 1, "sampleImageId6");
    }
}