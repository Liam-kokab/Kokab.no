/**
 * Created by Liam-S on 17.09-2017.
 */


var x;
var y;
var mine;
var clicked = 0;
var cells;
var html;
var play;

/**
 * init
 */
function init() {
    html = "";
    play = true;
    clicked = 0;
    document.getElementById("endmsgDiv").style.display='none';
    x = parseInt(document.getElementById("X").value);
    y = parseInt(document.getElementById("Y").value);
    mine = parseInt(document.getElementById("mine").value);
    var problem = false;

    if(x < 5 || x > 25 || y < 5 || y > 25 || isNaN(x) || isNaN(y)) {
        document.getElementById("p1").style.display = 'inherit';
        problem = true;
    }else document.getElementById("p1").style.display = 'none';
    if(mine < 5 || mine > Math.max((x*y)/2, 12) || isNaN(mine)){
        document.getElementById("p2").style.display = 'inherit';
        problem = true;
    }else document.getElementById("p2").style.display = 'none';
    if(problem){
        document.getElementById("table").innerHTML = html;
        return;
    }

    document.getElementById("endmsgDiv").style.width = (x * 37) + 'px';
    document.getElementById("endmsgDiv").style.top = (x*37/2 - 95) + 'px';
    document.getElementById("button").innerHTML = "Reset";

    genHtmlAndCells();
    document.getElementById("table").innerHTML = html;
    randomize(mine);
    organize();
    /**
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++){
            cellClick(i , j);
        }
    }*/

}

/**
 * generates game html
 */
function genHtmlAndCells() {
    cells = new Array(y);
    for (var i = 0; i < y; i++) {
        cells[i] = new Array(x);
        html = html + "<tr>";
        for (var j = 0; j < x; j++){
            html = html + "<th>";
            cells[i][j] = {
                num: 0,
                touchable: 0
            }
            html = html + "<img class='cells' " +
                "id='" + pos(i,j) +"'" +
                "src='./img/10.png' onclick='cellClick(" + i +"," + j + ")'" +
                " />";
            html = html + "</th>";
        }
        html = html + "</tr>";
    }
}

/**
 * give all the cells value
 */
function organize() {
    for(var i=0; i<y;i++){
        for(var j=0; j<x; j++){
            if(cells[i][j].num == 9) fixAround(i, j);
        }
    }
}
function fixAround(i, j) {
    if((i-1) >= 0 && cells[i-1][j].num != 9) cells[i-1][j].num++;
    if((i+1) < y && cells[i+1][j].num != 9) cells[i+1][j].num++;
    if((j-1) >= 0){
        if(cells[i][j-1].num != 9) cells[i][j-1].num++;
        if((i-1) >= 0 && cells[i-1][j-1].num != 9) cells[i-1][j-1].num++;
        if((i+1) < y && cells[i+1][j-1].num != 9) cells[i+1][j-1].num++;
    }
    if((j+1) < x){
        if(cells[i][j+1].num != 9) cells[i][j+1].num++;
        if((i-1) >= 0 && cells[i-1][j+1].num != 9) cells[i-1][j+1].num++;
        if((i+1) < y && cells[i+1][j+1].num != 9) cells[i+1][j+1].num++;
    }
}

/**
 * 1 -> 001
 * @param i
 * @returns {string}
 */
function pos(i,j) {
    var stri = "" + i;
    var strj = "" + j;
    var pad = "000";
    return pad.substring(0, pad.length - stri.length) + stri + pad.substring(0, pad.length - strj.length) + strj;
}

/**
 * puts mines in random places
 * @param i number mines to put in the map
 */
function randomize(i) {
    if(i==0) return;
    var Y = random(y);
    var X = random(x);
    if(cells[Y][X].num !=9){
        cells[Y][X].num = 9;
        randomize(i-1);
    }else randomize(i);
}

/**
 * random int between 0 and i
 * @param i
 * @returns {number}
 */
function random(i) {
    return Math.floor((Math.random()*i));
}

/**
 * call on click
 * @param i
 * @param j
 */
function cellClick(i , j) {
    if(cells[i][j].touchable == 1 || play == false) return;
    cells[i][j].touchable++;
    if(cells[i][j].num == 9) gameOver('You lost :(');
    clicked++;
    if(clicked >= (x*y)-mine ) gameOver('You won :)');
    if(cells[i][j].num == 0) openMore(i, j);
    var e = document.getElementById(pos(i, j));
    e.className="cellsT";
    e.src="./img/" + cells[i][j].num + ".png";
}

/**
 * in case of 0, open all around
 * @param i
 * @param j
 */
function openMore(i,j) {
    if((i-1) >= 0) cellClick(i-1,j);
    if((i+1) < y) cellClick(i+1,j);
    if((j-1) >= 0){
        cellClick(i,j-1);
        if((i-1) >= 0) cellClick(i-1,j-1);
        if((i+1) < y) cellClick(i+1,j-1);
    }
    if((j+1) < x){
        cellClick(i,j+1)
        if((i-1) >= 0) cellClick(i-1,j+1);
        if((i+1) < y) cellClick(i+1,j+1);
    }
}

function gameOver(msg) {
    document.getElementById("endmsg").innerHTML = msg;
    document.getElementById("endmsgDiv").style.display='inherit';
    play = false;
	for(var i=0; i<y;i++){
        for(var j=0; j<x; j++){
            if(cells[i][j].touchable == 0){
                var e = document.getElementById(pos(i, j));
                e.className="cellsT";
                e.src="./img/" + cells[i][j].num + ".png";
            }
        }
    }
}
