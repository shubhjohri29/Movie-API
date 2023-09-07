 const http=require("http");
  const getReq=require("./methods/getrequest");
 const putReq=require("./methods/putrequest");
 const postReq=require("./methods/postrequest");
 const deleteReq=require("./methods/deleterequest");
 let movies=require("./data/movies.json");


 const PORT=process.env.PORT || 3000;

 const server=http.createServer((req,res)=>{
    // refering the data
   req.movies=movies;
      switch(req.method){

       case "GET":
       getReq(req,res);
       break;
        case "POST":
        postReq(req,res);
        break;
       case "PUT":
        putReq(req,res);
        break;
        case "DELETE":
        deleteReq(req,res);
        break;
       default:
        res.statusCode=404;
  res.setHeader("Content-Type","application/json");
  res.write(
    JSON.stringify({title:"not found", message:"route not found"})
    );
  res.end();
      }

 });

 server.listen(PORT,()=>{
    console.log(`server started on port : ${PORT}`);
 })
