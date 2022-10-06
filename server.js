const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // if the request was made by favicon.ico, then we dont want to send anything
    if(req.url === "/favicon.ico") {
        res.end();
        return;
    }
    console.log('request made from browser to server!');
    let path = "./views/";
    
    switch(req.url) {
        case "/":
            path += "index.html";
            break;
        case "/about":
            path += "aboutUs.html";
            break;
        case "/aboutUs":
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += "error.html";
            res.statusCode = 404;
            break;
    }
    // console.log('path-> ', path)
    fs.readFile(path, (err, fileData) => {
        if(err) {
            console.log('err -> ', err);
        }
        else {
            res.end(fileData);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('server is listening on port 3000.');
})