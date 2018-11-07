var imageCount = -1;
function mouseOver(num){
    
    //opcity for others
    document.getElementById("mainGridElem2").style.opacity = 0.3;

    var inneHeight = document.getElementById('body').clientHeight;
    //var minusTop = -Math.floor(inneHeight/20); 
    //var minusLeft = Math.floor(document.getElementById('body').clientWidth / 20);
    var imageHeight = document.getElementById("backgroundImg").clientHeight;

    var html = "";
    var divElem = document.getElementById("backgroundDiv");

    console.log(imageHeight);

    do{
        //console.log("ImageCount " + imageCount);
        for (var i = 0; i < 3; i++) {
            var id = "backgroundImg" + ++imageCount;
            html = "<img src='.././img/SpaceFighter1.png' class='backgroundImg' id='" + id + "'>";

            divElem.innerHTML += html;
            
            //top position
            document.getElementById(id).style.top = ((Math.floor(imageCount/3) * imageHeight)) + "px";

            //left position
            document.getElementById(id).style.left = ((i * document.getElementById(id).clientWidth)) + "px";
        }
    }while(inneHeight > ((imageCount/3) * imageHeight) - 10);
}

function removeBackground(){
   // document.getElementById("backgroundDiv").innerHTML = "";
}