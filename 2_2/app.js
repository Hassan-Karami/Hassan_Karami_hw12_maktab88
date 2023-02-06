const fs= require("fs");
function readFilePromise(filePath, options){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,options,(error,data)=>{
            if(!!error) reject(error);
            else resolve(JSON.parse(data));
        })
    })
}
readFilePromise("./user-data.json","utf-8").then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
});

// fs.readFile("./user-data.json","utf-8",(err,data)=>{
//     if(err){
//         console.log("Error is: ",err);
//     }
//     else{
//         console.log(JSON.parse(data));
//     }
// })