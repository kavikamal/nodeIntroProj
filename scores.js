const textBody = require("body");
const jsonBody = require("body/json");
var scores = [{name: "Vishwa", score: 50}, {name: "Kavya", score: 390},{name: "Suresh", score: 500},{name: "Rohit", score: 150},{name: "Kavitha", score: 200}];
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    console.log(req.url);
    if (req.url==="/scores"){
        if(req.method === "GET") {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            scores.sort((a, b)=>{return b.score - a.score});
            //if (scores.length>3){
                    body = scores.slice(0,3); 
            //}   
        }
        else if(req.method === "PUT") {
            res.statusCode = 201;
            jsonBody(req, res, (err, body) => {
                if (err) {
                    res.statusCode = 500
                    return res.end("NO U")
                }
                scores.push(body);    
            } )
        }
    }
    else{
        res.statusCode = 404;
    }
    // I am an echo server 
    console.log(res.statusCode);
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify(body))
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); 
});