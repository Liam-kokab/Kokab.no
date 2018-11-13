/**
 * Created by Liam.k on 28.08-2017.
 */
var pageList = ["main", "CV", "minesweeper", "SpaceFighter"];
var initDone = false;
var currentPageName = "main";


function init(){
    if(initDone) return;
    initDone = true;
    readUrl();
}

/**
 * @param {String} paramName 
 * @returns param value 
 */
function getURLParam(paramName){
    var url = new URL(window.location.href);
    return url.searchParams.get(paramName);
}

/**
 * reads and perform changes if needed
 */
function readUrl(){
    var paramValue = getURLParam("page");
    if(pageList.includes(paramValue)) frameChange(paramValue);
    else frameChange("main");

    paramValue = getURLParam("mode");
    if(paramValue === "dark") {
        //TODO: add mode support
    }

    paramValue = getURLParam("lang");
    if(paramValue === "no") {
        //TODO: add lang support
    }
}

/**
 * updates url param
 * @param {String} paramName 
 * @param {String} paramValue 
 */
function updateUrl(paramName, paramValue){
    var url = window.location.href.split("?")[0] + "?";
    
    var paramNames = ["page", "mode", "lang"];
    for (var i = 0; i < paramNames.length; i++){
        if(paramNames[i] === paramName)
            url += paramName + "=" + paramValue + ((i != 2)? "&" : "");
        else if(getURLParam(paramNames[i]) != null)
            url += paramNames[i] + "=" + getURLParam(paramNames[i]) + ((i != 2)? "&" : "");   
    }
    history.pushState("Liam Kokab - " + currentPageName , "Liam Kokab - " + currentPageName, url);
}


/**
  * changes iframe 
  * @param {String} pageName 
  */
function frameChange(pageName) {
    //showMenu();
    document.title = "Liam Kokab" + ((pageName === "main")? "" : " - " + pageName);
    currentPageName = pageName;
    updateUrl("page",pageName);
    var frame = document.getElementById('mainFrame').src = './pages/' + pageName + '.html';
    //updateUrl("page",pageName);
}

var topOfBD = 0;
function showMenu() {
    var menuButton = document.getElementById('menuButton');
    var buttonDiv = document.getElementById('buttonDiv');
    var menuIsShowing = (buttonDiv.style.display != 'inherit');

    if (menuIsShowing) {
        menuButton.innerHTML = '<i class="fa">&#xf00d;</i>';
        buttonDiv.style.display = 'inherit';
    } else {
        menuButton.innerHTML = '<i class="fa">&#xf0c9;</i>';
        //TODO: Fix removing of the menu!
        //topOfBD = 0;
        //closeMenu(buttonDiv);
        buttonDiv.style.display = 'none';
        
    }
    menuIsShowing = !menuIsShowing;
}
/*
function closeMenu(elem){
    console.log(window.innerHeight);
    console.log("top: " + topOfBD);
    setTimeout(function() {
        if (window.innerHeight + topOfBD > 0) {
           elem.style.top = topOfBD + 'px';
           topOfBD = topOfBD - 50;
        } else {
            elem.style.display = 'none';
            return;
        }
    }, 50);
    closeMenu(elem,top);
}*/