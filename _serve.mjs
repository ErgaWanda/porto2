import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.join(process.cwd(), "out");
const types = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".svg":"image/svg+xml", ".pdf":"application/pdf", ".ico":"image/x-icon", ".woff2":"font/woff2" };
http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split("?")[0]);let f=path.join(root,url);if(!path.extname(f))f=path.join(f,"index.html");fs.readFile(f,(err,buf)=>{if(err){res.writeHead(404);return res.end("404");}res.writeHead(200,{"content-type":types[path.extname(f)]||"application/octet-stream"});res.end(buf);});}).listen(4321,()=>console.log("up"));
