const io = require("./server").io;


io.on("connection", (socket) => {
    socket.on("joinRoom", async (data) => {
        const numberOfPeronInRoom = (await io.in(data).fetchSockets()).length;
        if (numberOfPeronInRoom == 0) {
            socket.join(data);
        }
        else if (numberOfPeronInRoom == 1) {
            socket.to(data).emit("peerJoin");
            socket.join(data);
        }
    })
})