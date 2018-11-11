/**
 * Created by Liam.k on 28.08-2017.
 */

 /**
  * changes iframe 
  * @param {String} pageName 
  */
function frameChange(pageName) {
    removeNow = true;
    var frame = document.getElementById('mainFrame');
    switch (pageName) {
        case 'cv':
            frame.contentWindow.document.location.href = './ViewerJS/?zoom=page-width#../CV-Liam Kokab.pdf';
            return;
        case 'minesweeper':
            frame.contentWindow.document.location.href = "./minesweeper/";
            return;
        default:
            frame.contentWindow.document.location.href = './pages/' + pageName + '.html';
    }
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