import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://192.168.100.248:4000");

module.exports = {socket}
