/**
 * Created by Liam.k on 08.11-2018.
 * TODO: update and redo this
 */

//animation sync controllers 
var stopLeaveAnimations = false;
var stopBackgroundAnimation = false;
var leaveAnimationInProgress = false;
var MouseOverInProgress = false;

//list of background image ids
var backgroundImageIds = [];

//settings 
var settings = {
    maxImageOpacity: 0,
    minImageOpacity: 0,
    maxNumberImageAnimation : 10
};

//page tool tips
var toolTips = [
    "We are already here! Click for nothing to happen.",
    "CV, not much more to say... Have fun reading.",
    "MineSweeper, because I was bored an evening.",
    "SpaceFighter, a game build on PlayCanvas engine.",
    "Solias Boligstyling, a website I made.",
    "My GitHub Page."
];

var initDone = false;
function init(){
    if(initDone) return;
    initDone = true;
    FixLinks();
    loadImages();
}


/**
 * @param {int} num image num that call this
 * @param {String} action action to be performed
 */
function controller(num, action){
    if(action === "over"){
        MouseOverInProgress = true;
        stopLeaveAnimations = true;
        stopBackgroundAnimation = true;
        
        if(leaveAnimationInProgress){
            setTimeout(function() {
                controller(num, action);
            }, 3);
            return;
        }
        //performers mouse over actions 
        mouseOver(num);
        MouseOverInProgress = false;
    
    }else if(action === "leave"){
        if(leaveAnimationInProgress) return;

        stopBackgroundAnimation = true;
        if(MouseOverInProgress > 0){
            setTimeout(function() {
                controller(num, action);
            }, 3);
            return;
        }

        leaveAnimationInProgress = true;

        //performers mouse leave actions
        document.getElementById("mainGridElem" + num).style.opacity = 1;
        mouseLeaves(0.35, num);     
    }
}

/**
 * performers mouse over
 * @param {int} num image number that call this.
 */
function mouseOver(num){
    MouseOverInProgress = true;
    //show tool tip
    var ToolTipText = document.getElementById("ToolTip");
    ToolTipText.style.opacity = 1;
    ToolTipText.innerHTML = toolTips[num-1];
    
    //adjusting opacity of icons
    for (var j = 1; j < 7; j++) {
        if(num != j) document.getElementById("mainGridElem" + j).style.opacity = 0.45;
         else  document.getElementById("mainGridElem" + j).style.opacity = 1;
    }

    var imageCount = -1;
    var innerHeight = document.getElementById('body').clientHeight;
    //document.getElementById('body').style.backgroundColor = 'rgb(256,256,256)';

    //getting info for image 
    var images = getImageInfo(num);
    var imageHeight = document.getElementById(images.sampleImageId).clientHeight;

    var divElem = document.getElementById("backgroundDiv");
    divElem.style.opacity = 1;
    divElem.innerHTML = "";

    //remove all images from image list
    backgroundImageList = [];

    function CrateImageObj(elem, imageG){
        return {
            thisImage: elem,
            imageGroup: imageG,
            AnimationIterationLeft : random(10, 30),
            opacityChange: random(-25, 25)/1000,
            active: false,
            update: function() {
                if(!active) return false;
                if(this.AnimationIterationLeft-- < 1){
                    //change the image
                    init();
                    this.thisImage.src = imageGroup.folder + imageGroup.names[random(0,images.names.length)];
                    this.active = false;
                    this.AnimationIterationLeft = random(5, 30);
                    return true;
                }
                //play animation for this image
                var imageOpacity = 0.0;
                try {
                    imageOpacity = parseFloat(window.getComputedStyle(thisImage).getPropertyValue("opacity"));
                }catch(error) { imageOpacity = 0.5; }
                
                if(imageOpacity < settings.minImageOpacity && opacityChange < 0)
                    opacityChange = Math.abs(opacityChange);
                else if(imageOpacity > settings.maxImageOpacity && opacityChange > 0)
                    opacityChange = 0 - opacityChange;
                
                thisImage.style.opacity = (opacityChange + imageOpacity);
                return false;
            }
        };
    }
    
    do{
        for (var i = 0; i < 4; i++) {
            var id = "backgroundImg" + (++imageCount);
            divElem.innerHTML += "<img src='" + 
                images.folder + images.names[random(0,images.names.length)] + 
                "' class='backgroundImg' id='" + id + "'>";

            imageElem = document.getElementById(id);
            backgroundImageList.push(CrateImageObj(imageElem, images));
            //top position
            imageElem.style.top = ((Math.floor(imageCount/4) * imageHeight)) + "px";

            //left position
            imageElem.style.left = ((i * document.getElementById(id).clientWidth)) + "px";
        }
    }while(innerHeight > ((imageCount/4) * imageHeight) - 10);

    var AnimationStarted = 0;
    while(AnimationStarted < settings.maxNumberImageAnimation && AnimationStarted < (backgroundImageList.length/1.5)){
        var randomImageNum = random(0,backgroundImageList.length);
        if(!backgroundImageList[randomImageNum].active){
            backgroundImageList[randomImageNum].active = true;
            AnimationStarted++;
        }
    }
    
    //starting background animation
    //stopBackgroundAnimation = false;
    //stopLeaveAnimations = false;
    playBackgroundAnimation(backgroundImageList);
}


/**
 * Starts the background animation 
 */
function playBackgroundAnimation(backgroundImageList){
    if(stopBackgroundAnimation) {
        MouseOverInProgress = false;
        return;
    }
    setTimeout(function() {
        if(stopBackgroundAnimation) {
            MouseOverInProgress = false;
            return;
        }
        for (var i = 0; i < backgroundImageList.length; i++) {
            if(backgroundImageList[i].update()){
                //if last iteration 
                var randomImageNum = random(0, backgroundImageList.length)
                while(backgroundImageList[randomImageNum].active){
                    randomImageNum = random(0, backgroundImageList.length);
                }
                backgroundImageList[randomImageNum].active = true;
            }
        }
        playBackgroundAnimation(backgroundImageList);
    },30);
}

/**
 * @param {float} countUp counts up 
 * @param {int} num image num that call this
 */
function mouseLeaves(countUp, num){
    //hide tool tip
    var ToolTipText = document.getElementById("ToolTip");
    ToolTipText.style.opacity = 0;
    ToolTipText.innerHTML = "";

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
            //if(num != j) 
            document.getElementById("mainGridElem" + j).style.opacity = countUp;
        }
        var color = 200 + countUp*10;
        if(color > 256) color = 256;
        //document.getElementById("body").style.backgroundColor = 'rgb(' + [color,color,color].join(',') + ')';
        document.getElementById("backgroundDiv").style.opacity = (1-((countUp-0.32)*3));

        if(countUp < 0.65) mouseLeaves(countUp + 0.03, num);
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
    class image {
        constructor(num, names) {
            this.folder = "../img/mainImages/";
            this.names = names;
            this.numberOfImages = names.length;
            this.sampleImageId = "sampleImageId" + num;
        }
    }
    switch(num){ 
        case 1: return new image(num, ["Home.png","CV.png","minesweeper.png", "SpaceFighter.png"]);
        case 2: return new image(num, ["CV1.png","CV2.png","CV2.png"]);
        case 3: return new image(num, ["minesweeper.png" ,"minesweeper1.png", "minesweeper2.png"]);
        case 4: return new image(num, ["SpaceFighter1.png", "SpaceFighter2.png", "SpaceFighter3.png", "SpaceFighter4.png"]);
        case 5: return new image(num, ["Solias1.png", "Solias2.png"]);
        case 6: return new image(num, ["github.png","github1.png","git.png"]);
    }
}

/**
 * reads url and fixes links
 */
function FixLinks(){
    var linksElements = document.getElementsByClassName("links");  
    if(new URL(window.location.href).searchParams.get("lang") === "no"){
        for (var i = 0; i < linksElements.length; i++){
            linksElements[i].href += "&lang=no";          
        }
    }
}