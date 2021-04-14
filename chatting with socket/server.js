let app = require("express")();
let http = require("http").Server(app); 
let io = require("socket.io")(http);

port = 9090;
var numberOfClients = 0;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
	socket.on("chat", (msg) => {
		console.log(msg);
	});
	numberOfClients++;
	socket.emit('connected', {
		numberOfClients: numberOfClients
	});
	console.log("A user connected");
	console.log('Number Clients Connected:', numberOfClients);
});
http.listen(port, () => console.log(`Server running on port number: ${port}`));

    