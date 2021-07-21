import http from "http";

//create a server object:
http
  .createServer(function (req: any, res: any) {
    res.write("Hello !"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
