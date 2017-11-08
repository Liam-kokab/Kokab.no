/**
 * Created by Liam-S on 04.10-2017.
 */

var lastImage = 45;
var lastLoaded = 0;
var lastviwed = 0;
var play = false;
var firstInit = true;

function init() {
    document.getElementById("buttonDiv").style.top = (document.getElementById("Image0").clientHeight + 10) + "px";
    if(firstInit){
        load(1);
        firstInit = false;
    }
}

function load(i){
    var imgHtml = "";
    while(i < lastviwed + 7 && i <= lastImage){
        imgHtml += "<img src='./img/" + i + ".jpg' id='Image" + i + "' class='mainImage' style='display: none'>";
        lastLoaded = i++;
    }
    document.getElementById("imgDiv").innerHTML += imgHtml;
}

function changeImg(i) {
    var view = lastviwed + i;
    if(view < 0){
        view = lastLoaded;
    }else if(view > lastLoaded){
        view = 0;
    }
    var vi = document.getElementById("Image" + view);
    vi.style.display = 'inherit';
    vi.style.zIndex = 100;
    document.getElementById("buttonDiv").style.top = (vi.clientHeight + 10) + "px";
    if(play){
        changeImgAnimation(lastviwed, 1.0);
    }else{
        document.getElementById("Image" + lastviwed).style.display = 'none';
    }
    lastviwed = view;
    if(lastviwed > lastLoaded - 6 && lastImage != lastLoaded) load(lastLoaded + 1);
}

function changeImgAnimation(p, o) {
    var pre = document.getElementById("Image" + p);
    pre.style.zIndex = 200;
    setTimeout(function () {
        if(o > 0.001){
            pre.style.opacity = o;
            changeImgAnimation(p, o - 0.013);
        }else{
            pre.style.display = 'none';
            pre.style.opacity = 1.0;
        }
    }, 10);
}

function playPause() {
    if(play){
        document.getElementById("playButton").src = "./icon/play.svg";
        play = false;
    }else{
        document.getElementById("playButton").src = "./icon/pause.svg";
        play = true;
        goPlay();
    }
}
function goPlay() {
    setTimeout(function () {
        if(play){
            //console.log("changing image to: " + lastviwed + 1);
            changeImg(1);
            goPlay();
        }
    }, 3000);
}

function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}