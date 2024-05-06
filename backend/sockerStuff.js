const io = require("./server").io;

let offers = []


io.on("connection", (socket) => {
    socket.on("joinRoom", async (data) => {
        const numberOfPeronInRoom = (await io.in(data).fetchSockets()).length;
        if (numberOfPeronInRoom == 0) {
            socket.join(data);
        }
        else if (numberOfPeronInRoom == 1) {
            socket.to(data).emit("peerJoin")
            socket.join(data);
        }
    });
    socket.on("peerJoined", (room) => {
        socket.to(room).emit("peerJoined");
    });
    socket.on("offerFromPeer", (data) => {

        const { offer, room } = data;
        console.log(offer,room);
        offers[room] = {
            offer: offer,
            answer: null,
            answerIce: [],
            offerIce: [],
        }
        socket.to(room).emit("offerFromPeer", offer);
    });
    socket.on("answerFromUser", ({ answer, room }) => {
        offers[room].answer = answer;
        socket.to(room).emit("answerFromUser", answer);
    })
    socket.on("iceCandidate", ({ candidate, roomId }) => {
        socket.to(roomId).emit("iceCandidate",candidate);
    })

})