import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:8080", { transports : ['websocket'] });

function listen(audio) {
    socket.on('ready', console.log("recieved from server"));
    socket.emit('audio', audio);

}

export { listen, socket }