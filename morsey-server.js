var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');
var morsey = require('./morsey.js');


var port = process.env.PORT || 3000;
var docRoot = process.env.DOCROOT;




function write404(response) {
    response.writeHead(404, [{'Content-Type': 'text/plain'}]);
    response.end("404: File not found!");
}

function writeResponse(response, string) {
    response.writeHead(200, [{'Content-Type': 'text/plain'}]);
    response.end(morsey.writeBloodyAwfulPoetry(string));
}

function foreignFile(response, docRoot, webPath) {
    docRoot = docRoot[docRoot.length-1] === '/' ? docRoot : docRoot + '/';
    webPath = docRoot + webPath;
    
    http.get(webPath, function(foreignResponse) {
	foreignResponse.on('data', function(chunk) {
	    var string = chunk.toString('utf-8');
	    var re = /\<Message>Access Denied\<\/Message\>/;

	    if (re.test(string)) {
		write404(response);
	    } else {
		writeResponse(response, string);
	    }
	});
    });
}

function localFile(response, webPath) {
    var filePath = path.resolve(webPath);

    try {
	var fileContents = fs.readFileSync(filePath, {'encoding': 'utf-8'});
    } catch(ENOENT) {
	write404(response);
    } finally {
	if (fileContents) {
	    writeResponse(response, fileContents);
	}
    }		
}

(http.createServer(function(request, response) {
    var webPath = url.parse(request.url).pathname;
    webPath = webPath[0] === '/' ? webPath.substr(1, webPath.length) : webPath;	

    if (docRoot) {
	foreignFile(response, docRoot, webPath);
    } else {
	localFile(response, webPath);
    }
})).listen(port);
