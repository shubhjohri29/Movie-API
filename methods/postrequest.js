// will see to create a new movie
const crypto=require("crypto");
const requestBodyparser= require("../util/body-parser");
const writeToFile=require("../util/write-to-file");
module.exports=async(req,res)=>{
if(req.url==="/api/movies"){
    try{
        let body= await requestBodyparser(req);
        body.id=crypto.randomUUID();
        req.movies.push(body);
        writeToFile(req.movies);
        res.writeHead(201,{"Content_Type": "application/json"});
        res.end();
    }catch(err){
        console.log(err);
        res.writeHead(400,{"Content-Type": "application/json"});
       
        res.end(
             JSON.stringify({
                title:"validation failed",
                 message:"request body is not valid"
                })
       
        );

    }
}else{
    res.writeHead(404,{"Content-Type": "application/json"});
      res.end(JSON.stringify({title:"not found", message:"route not found"}));

  }
};