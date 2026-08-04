const http=require("http");
const url="http://localhost:5000/api/worldcup/persons/115035";
http.get(url, res=>{
  let d="";
  res.on("data", c=>d+=c);
  res.on("end", ()=>{
    console.log("STATUS", res.statusCode);
    console.log(d);
  });
}).on("error", e=>{ console.error(e); process.exit(1); });
