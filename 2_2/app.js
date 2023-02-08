const fs= require("fs");
const { resolve } = require("path");
let directory="./user-data.json";

const readFilePromise= (filePath, options)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,options,(error,data)=>{
            if(!!error) reject(error);
            else resolve(JSON.parse(data));
        })
    })
}

const writeFilePromise = (filePath,data,options)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(filePath,data,options,(err)=>{
            if(err) reject(err);
             else resolve(data);
        })
    })
}


let testUser={
    "uid": 123456789,
    "firstname": "Hassan",
    "lastname": "Karami",
    "city": "Karaj",
    "postalCode": "3148634774",
    "phoneNumber": "34495832",
    "position": "Back-End Developer"
}
const template = [
  "uid",
  "firstname",
  "lastname",
  "city",
  "postalCode",
  "phoneNumber",
  "position",
];


//(R) Read
readFilePromise("./user-data.json","utf-8").then((data)=>{
    console.log(data);

}).catch((error)=>{
    console.log(error);
});

//(D) Delete
const deleteUser= (id)=>{
    readFilePromise(directory,"utf-8").then((data)=>{
        let restOfUsers= data.filter(user=>user.uid !== id);
        return writeFilePromise(directory, JSON.stringify(restOfUsers), "utf-8")
          .then((data) => {
            console.log(`user with ID Number of ${id} deleted successfully`);
          })
          .catch((err) => {
            return console.log(err);
          });
    }
        
    )
    
}

//(C) Create
const createUser= (newUser)=>{
    readFilePromise(directory,"utf-8").then((data)=>{
        let duplicate= data.find((user)=>user.uid=== newUser.uid);
        if(!!duplicate) {
            throw new Error("this ID already exists");
        }
        let newData= [...data,newUser];
        return writeFilePromise(directory,JSON.stringify(newData),"utf-8");
    }).then((data)=>{
        console.log(`user with id ${newUser.uid} added successfully`)
    }).catch((err)=>{
        console.log(err);
    }

    )

}

//(U) Update
const updateUser = (id,newUser)=>{
    if(typeof id !== "number") return console.log("id must be a number");
    if(Array.isArray(newUser)===true || typeof(newUser) !== "object" ) return console.log("your data must be into an object");
      let keys = Object.keys(newUser);
      if(keys.length === 0 ) return console.log("data object must not be empty");
      let values= Object.values(newUser);
      if(values.some(value=>value.trim()==="")) return console.log("value of property must not be empty");

     readFilePromise(directory, "utf-8").then((data) => {
      let targetUser = data.find((user) => user.uid === id);
      if (!targetUser) {
        throw new Error(`user with this id doesn't exist`);
      }
      if(keys.find(property=> !template.includes(property)))  throw new Error(`property is not valid`);
      Object.assign(targetUser,newUser);
      return writeFilePromise(directory,JSON.stringify(data),"utf-8")
    }).then(x=>console.log("successfully updated"));
}





