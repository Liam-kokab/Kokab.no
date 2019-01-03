/**
 * Created by Liam-S on 17.09-2017.
 */


var x = 0;
var y = 0;
var mine = 0;
var clicked = 0;
var cells;
var html;
var play;
var firstClick = true; 

function pageInit(){
    var maxCellWidth = Math.floor((document.getElementById('body').clientWidth ) / 38);
    var maxCellHeight = Math.floor((document.getElementById('body').clientHeight - 88) / 38);

    var widthSelector = document.getElementById('widthSelect');
    var heightSelector = document.getElementById('heightSelect');

    var html = "";
    for (var i = 5; i < maxCellWidth; i++) {
        html += '<option value="' + i + '"';
        if(i === maxCellWidth-1) html += 'selected="selected"';
        html += '>' + i + '</option>';
    }
    document.getElementById('widthSelect').innerHTML = html;

    html = "";
    for (i = 5; i < maxCellHeight; i++) {
        html += '<option value="' + i + '" '; 
        if(i === maxCellHeight-1) html += 'selected="selected"';
        html += '>' + i + '</option>';
    }
    document.getElementById('heightSelect').innerHTML = html;
    updateMineSelect();
}

function updateMineSelect(){
    try{
        x = parseInt(document.getElementById("widthSelect").value);
        y = parseInt(document.getElementById("heightSelect").value);
    }catch(e){ return; }
    if(isNaN(x) || isNaN(y)) return;

    var html = "";

    for (var i = 5; i < (x*y/2); i++) {
        html += '<option value="' + i + '">' + i + '</option>';
    }
    document.getElementById('mineSelect').innerHTML = html;

    
}

/**
 * gameInit
 */
function gameInit() {
    html = "";
    play = true;
    clicked = 0;
    
    //get value from selectors
    x = parseInt(document.getElementById("widthSelect").value);
    y = parseInt(document.getElementById("heightSelect").value);
    mine = parseInt(document.getElementById("mineSelect").value);

    var endGameMsg = document.getElementById("endmsgDiv");
    endGameMsg.style.display='none';
    endGameMsg.style.width = (x * 37 + 10) + 'px';
    endGameMsg.style.top = (y*37/2 + 30) + 'px';

    document.getElementById("button").innerHTML = "Reset";

    genHtmlAndCells();
    document.getElementById("table").innerHTML = html;
    firstClick = true;
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
                "src='../img/minesweeper/10.png' onclick='cellClick(" + i +"," + j + ")'" +
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
 * @param {Number} i
 * @param {Number} j
 * @returns {String}
 */
function pos(i,j) {
    var stri = "" + i;
    var strj = "" + j;
    var pad = "000";
    return pad.substring(0, pad.length - stri.length) + stri + pad.substring(0, pad.length - strj.length) + strj;
}

/**
 * puts mines in random places
 * i ,j pos can't be mine
 * @param {Number} mineToPlace number mines to put in the map
 * @param {Number} i
 * @param {Number} j
 */
function randomize(mineToPlace, i , j){
    while(0 < mineToPlace){
        var Y = random(y);
        var X = random(x);
        if(cells[Y][X].num != 9 && !(X == j && Y == i)){
            cells[Y][X].num = 9;
            mineToPlace--;
        }
    }
}

/**
 * random int between 0 and i
 * @param {Number} i
 * @returns {Number} Random Integer
 */
function random(i) {
    return Math.floor((Math.random()*i));
}

/**
 * call on click
 * @param {Number} i
 * @param {Number} j
 */
function cellClick(i , j) {
    if(firstClick){
        randomize(mine, i, j);
        organize();
        firstClick = false;
    }

    if(cells[i][j].touchable == 1 || play == false) return;
    cells[i][j].touchable++;
    if(cells[i][j].num == 9) gameOver('You lost :(');
    clicked++;
    if(clicked >= (x*y)-mine ) gameOver('You won :)');
    if(cells[i][j].num == 0) openMore(i, j);
    var e = document.getElementById(pos(i, j));
    e.className="cellsT";
    e.src="../img/minesweeper/" + cells[i][j].num + ".png";
}

/**
 * in case of 0, open all around
 * @param {Number} i
 * @param {Number} j
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

/**
 * called in the end of the game!
 * @param {String} msg 
 */
function gameOver(msg) {
    document.getElementById("endmsg").innerHTML = msg;
    document.getElementById("endmsgDiv").style.display='inherit';
    play = false;
	for(var i=0; i<y;i++){
        for(var j=0; j<x; j++){
            if(cells[i][j].touchable == 0){
                var e = document.getElementById(pos(i, j));
                e.className="cellsT";
                e.src="../img/minesweeper/" + cells[i][j].num + ".png";
            }
        }
    }
}
