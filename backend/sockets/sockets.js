const sockets = async (io, socket) => {
    socket.on("connection", function (socket) {
      console.log("a user connected");
    });
    socket.on("helloMessage", (data, callback) => {
      console.log("Data from front : ", data); // Réception de la data envoyée par le front : { message: "Hello world from the front" }
      callback("Hello back from the server"); // Retourne une réponse au front : "Hello back from the server"
    });
    socket.on("sendMessage", (message) => {
      console.log("Message from client:", message);
      // Envoyer le message à tous les clients connectés sauf l'émetteur
      socket.broadcast.emit("receiveMessage", message);
    });
  };
  
  module.exports = sockets;
  