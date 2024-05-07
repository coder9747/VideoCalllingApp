const io = require("./server").io;

let offers = []


io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
        socket.join(room);
    })
    socket.on('ready', (room) => {
        socket.to(room).emit("ready");
    })
    socket.on("incommingOffer",({offer,room})=>
    {
        socket.to(room).emit("incommingOffer",offer)
    })
    socket.on("incommingAnswer",({answer,room})=>
    {
        console.log(room);
        socket.to(room).emit("incommingAnswer",answer);
    })
    socket.on("iceCandidate",({candidate,roomId})=>
    {
        socket.to(roomId).emit("iceCandidate",candidate);
    })
})