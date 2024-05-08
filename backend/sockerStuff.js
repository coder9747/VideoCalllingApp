const io = require("./server").io;

let offers = []


io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
        socket.join(room);
    })
    socket.on('ready', (room) => {
        socket.to(room).emit("ready");
    })
    socket.on("incommingOffer", ({ offer, room }) => {
        console.log('incomming offer');
        socket.to(room).emit("incommingOffer", offer)
    })
    socket.on("incommingAnswer", ({ answer, room }) => {
        console.log('incomming answer');
        console.log(room);
        socket.to(room).emit("incommingAnswer", answer);
    })
    socket.on("iceCandidate", ({ candidate, roomId }) => {
        console.log('ice comming');
        socket.to(roomId).emit("iceCandidate", candidate);
    })
})