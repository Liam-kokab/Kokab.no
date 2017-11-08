/**
 * Created by Liam-S on 04.10-2017.
 */

var jSocket = document.createElement('script');
jSocket.src = './jsocket/jsocket.js';
document.head.appendChild(jSocket);



//var ircClient = require('./node_modules/node-irc/lib/client');

var nickName = "";
var client = null;



function start() {
    nickName = document.getElementById("nickName").value;
    ConnectToServer();

}

function ConnectToServer() {

    // Host we are connecting to
    var host = 'irc.freenode.net';
    // Port we are connecting on
    var port = 6667;

    var socket = new jSocket();

    // When the socket is added the to document
    socket.onReady = function(){
        socket.connect(host, port);
    }

    // Connection attempt finished
    socket.onConnect = function(success, msg){
        if(success){
            console.log("conecrted")
        }else{
            console.log("feild: " + msg);
        }
    }
    socket.onData = function(data){
        console.log("data: " + data);
    }

    // Setup our socket in the div with the id="socket"
    socket.setup('mySocket');
}


