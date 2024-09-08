const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("مستخدم متصل");

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`مستخدم انضم إلى الغرفة ${room}`);
    });

    socket.on("toggleMic", (isMicOn) => {
        socket.broadcast.emit("micStatus", isMicOn);
    });

    socket.on("disconnect", () => {
        console.log("مستخدم غادر");
    });
});

server.listen(3000, () => {
    console.log("الخادم يعمل على المنفذ 3000");
});