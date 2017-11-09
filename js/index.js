/**
 * Created by Liam.k on 28.08-2017.
 */
var change = 0;
var SpaceFighter = false;
function frameChange (pageName){
    var frame = document.getElementById('mainFrame');
    SpaceFighter = pageName == 'SpaceFighter';
    //spacialView();
    if(change == 1){
        document.getElementById('buttonDiv').style.display = "none";
        document.getElementById('menuButton').className = "icon-menu";
    }
    if(pageName == 'cv'){
        frame.contentWindow.document.location.href = "./ViewerJS/?zoom=page-width#../CV-Liam Kokab.pdf";
    }else if(pageName == 'minesweeper'){
        frame.contentWindow.document.location.href = "./minesweeper/";
    } else {
        frame.contentWindow.document.location.href = './pages/' + pageName + '.html';
    }
}
/*
function spacialView() {
    if(SpaceFighter){
        document.getElementById('body').style.backgroundColor = 'black';
        document.getElementById('over').className = 'over-black';
    }else{
        document.getElementById('body').style.backgroundColor = 'white';
        document.getElementById('over').className = 'over';
    }
    WebBuilder();
}*/

function showMenu() {
    var menuButton  = document.getElementById('menuButton');
    var buttonDiv = document.getElementById('buttonDiv');
    var menuIsShowing = (buttonDiv.style.display != 'inherit');
    console.log(" - " + menuIsShowing);
    if(menuIsShowing){
        menuButton.innerHTML = '<i class="fa">&#xf00d;</i>';
        buttonDiv.style.display = 'inherit';
    }else{
        menuButton.innerHTML = '<i class="fa">&#xf0c9;</i>';
        buttonDiv.style.display = 'none';
    }
    menuIsShowing = !menuIsShowing;
}

function getWidth() {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}
function getHeight() {
    return  window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
}
/*
function WebBuilder() {
    var frame = document.getElementById('mainFrame');
    var buttonDiv = document.getElementById('buttonDiv');
    var menuButton = document.getElementById('menuButton');
    var headDiv = document.getElementById('headDiv');
    var over = document.getElementById('over');
    console.log(SpaceFighter);

    if(getWidth() < getHeight() || SpaceFighter){
        headDiv.style.width = getWidth() + 'px';
        if(change != 1){
            headDiv.style.textAlign = "center";
            menuButton.className = 'icon-menu';
            menuButton.style.display = 'inherit';
            frame.className = 'mainFrameFull';
            buttonDiv.style.display = 'none';
            change = 1;
        }

        frame.style.width = getWidth() + 'px';

    }else{
        var peding = (getWidth() - 1250)/2;
        headDiv.style.width = Math.max((peding + 200) , 210) + 'px';
        if(peding > 10){
            headDiv.style.textAlign = "end";
            over.style.padding = "25px 35px";
            buttonDiv.style.paddingLeft = peding +'px';
            frame.style.width = (getWidth() - (peding + 210)) + 'px';
        }else{
            over.style.padding = "25px 0px";
            headDiv.style.textAlign = "center";
            buttonDiv.style.paddingLeft = 10 +'px';
            frame.style.width = (getWidth() - 220) + 'px';
        }
        if(change != 2){

            buttonDiv.style.display = 'inherit';
            frame.className = 'mainFramePartial';
            menuButton.style.display = 'none';
            change = 2;
        }

    }

    if(getHeight() < 650){
        document.getElementById('bottomimg').style.display = "none";
    }
    else{
        document.getElementById('bottomimg').style.display = "inherit";
    }
}
*/