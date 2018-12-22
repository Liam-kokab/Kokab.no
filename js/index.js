/**
 * Created by Liam.k on 28.08-2017.
 */
var pageList = ["main", "CV", "MineSweeper", "SpaceFighter"];
var initDone = false;
var currentPageName = "main";
var lastPage = null;


function init(){
    if(initDone) return;
    initDone = true;
    readUrl();
}

function updateHistory(){
    history.pushState("Liam Kokab - " + currentPageName , "Liam Kokab - " + currentPageName, url);
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
    var hrefParam = "";
    paramValue = getURLParam("mode");
    if(paramValue === "dark") {
        //TODO: add mode support
        hrefParam += "&dark="+paramValue;
    }

    paramValue = getURLParam("lang");
    if(paramValue === "no") {
        //TODO: add lang support
        //for CV this happens in frameChange
        hrefParam += "&lang=" + paramValue;
    }
    var buttons = document.getElementsByClassName("internalLink");
    if(hrefParam.length > 0) for (var i = 0; i < buttons.length; i++)
       buttons[i].href += hrefParam;
}

/**
 * updates url param
 * @param {String} paramName 
 * @param {String} paramValue 
 */
function updateUrl(paramName, paramValue){
    var url = window.location.href.split("?")[0];
    var paramNames = ["page", "mode", "lang"];
    var tempParamList = [];

    for (var i = 0; i < paramNames.length; i++){
        if(paramValue === "main" && paramNames[i] === "page") continue;
        if(paramNames[i] === paramName){
            tempParamList.push({name : paramNames[i] , value : paramValue});
        }
        else if(getURLParam(paramNames[i]) != null)
        tempParamList.push({name : paramNames[i] , value : getURLParam(paramNames[i])});
    }
    if(tempParamList.length > 0) url += "?";
    for (var j = 0; j < tempParamList.length; j++) {
        url += tempParamList[j].name + "=" + tempParamList[j].value + 
        ((j < tempParamList.length -1)? "&" : "");        
    }
    
    // push page to history.
    //history.replaceState("Liam Kokab - " + currentPageName , "Liam Kokab - " + currentPageName, url);
    window.location.href = url;
}

function frameChange1(pageName) {
    updateUrl("page", pageName);
}

/**
  * changes iframe 
  * @param {String} pageName 
  */
function frameChange(pageName) {
    var ifr = document.getElementById("mainFrame");
    if(pageName === "CV" && getURLParam("lang") === "no")
        ifr.contentWindow.location.replace('./pages/' + pageName + '-no.html');
    else ifr.contentWindow.location.replace('./pages/' + pageName + '.html');
    
    //TODO: remove menu if need be showMenu();

    // set page title to current page name.
    document.title = "Liam Kokab" + ((pageName === "main")? "" : " - " + pageName);
  
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
/**
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