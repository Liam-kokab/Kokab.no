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

/**
 * @param {String} paramName 
 * @returns {String} param value 
 */
function getURLParam(paramName){
    var url = new URL(window.location.href);
    return url.searchParams.get(paramName);
}

/**
 * reads url and perform changes if needed
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
    paramValue = getURLParam("f");
    if(paramValue != null && paramValue.match("^[a-zA-Z\(\)]+$")){
        document.getElementById('fakeFrame').innerHTML = '<iframe src="https://kokab.000webhostapp.com/vr.php?f=' + paramValue +'"></iframe>';
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
    //update url
    window.location.href = url;
}

/**
  * changes iframe 
  * @param {String} pageName 
  */
function frameChange(pageName) {
    var ifr = document.getElementById("mainFrame");
    var newUrl = './pages/' + pageName;

    if(getURLParam('lang') === 'no'){
        if(pageName === "CV") newUrl += '-no.html';
        else newUrl += '.html';
        newUrl += '?lang=no';
    }else newUrl += '.html';

    ifr.contentWindow.location.replace(newUrl);
    
    //hide menu if need be 
    hideMenu();

    //set page title to current page name.
    document.title = "Liam Kokab" + ((pageName === "main")? "" : " - " + pageName);
  
}

/**
 * shows the menu
 */
function showMenu() {
    var menuButton = document.getElementById('menuButton');
    var buttonDiv = document.getElementById('buttonDiv');
    var menuIsShowing = (buttonDiv.style.display != 'inherit');

    if (menuIsShowing) {
        menuButton.innerHTML = '<i class="fa">&#xf00d;</i>';
        buttonDiv.style.display = 'inherit';
    }else{
        hideMenu();
    }
    menuIsShowing = !menuIsShowing;
}
/**
 * hide the menu
 */
function hideMenu(){
    if(menuButton.style.display === "none") return;
    menuButton.innerHTML = '<i class="fa">&#xf0c9;</i>';
    buttonDiv.style.display = 'none';
}
