 module.exports=(req,res)=>{ 
// base url
let baseurl=req.url.substring(0,req.url.lastIndexOf("/")+1);
console.log(baseurl);
// uuid
let id=req.url.split("/")[3];
// to check uuid passed by client is valid or not 
const regexV4=new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

//  fetch all the movies

  if(req.url==="/api/movies"){
      res.statusCode=200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(req.movies));
      res.end();
  }else if(!regexV4.test(id)){
    res.writeHead(400,{"Content-Type": "application/json"});
       res.end(JSON.stringify({title:"validation failed", message:"uuid is not valid"}));

  }else if( baseurl==="/api/movies/"&&regexV4.test(id)){
    
    res.setHeader("Content-Type", "application/json");
    let filteredMovie=req.movies.filter((movie)=>{
        return movie.id===id;
    });
    // case if we have movie in our database 
    if(filteredMovie.length>0){
        res.statusCode=200;
        res.write(JSON.stringify(filteredMovie));
        res.end();
    }else{
        res.statusCode=404;
        res.write(JSON.stringify({title:"not found", message:"movie not found"}));
        
        res.end();
    }
    
  }else{
     res.writeHead(404,{"Content-Type": "application/json"});
       res.end(JSON.stringify({title:"not found", message:"route not found"}));

   }
 };