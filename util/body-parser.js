// body parser is created in node to take input from user to server
// in express it is in built
module.exports=async(request)=>{
    return new Promise((resolve,reject)=>{
        try{
          let body="";
          request.on("data",(chunk)=>{
            body+=chunk;
          });
          request.on("end",()=>{
            resolve(JSON.parse(body));
          })
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
};