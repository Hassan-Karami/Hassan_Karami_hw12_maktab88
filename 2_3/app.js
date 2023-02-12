const { log } = require("console");
const fsPromises = require("fs/promises");

//  fsPromises
//    .readFile("./numbers.txt")
//    .then((data2) => numbers=data2.toString().split("\r\n")).then(data2=>console.log(data2))

async function matchData() {
  let names = await fsPromises.readFile("./names.txt");
  names = names
    .toString()
    .split("\r\n")
    .map((elem) => {
      elem = elem.split("-");
      return { id: elem[0], name: elem[1] };
    });

  let numbers = await (
    await fsPromises.readFile("./numbers.txt")
  )
    .toString()
    .split("\r\n")
    .map((elem) => {
      elem = elem.split("-");
      return { id: elem[0], number: elem[1] };
    });

  result = "";

  for (let i = 0; i < names.length; i++) {
    let tempArray= [];
    for(number of numbers){
        if(names[i].id===number.id){
            tempArray.push(number.number);
        }
    }
    if(tempArray.length>1){
        result+=`\n ${names[i].name}'s phone numbers Are ${tempArray.join(",")}`
    }
    else if(tempArray.length===1){
        result+= `\n ${names[i].name}'s phone number is ${tempArray[0]}`
    }
    else{
        result+= `\n ${names[i].name}'s doesn't have any phone number` 
    }
  }

  await fsPromises.writeFile("./result",result);
}

matchData();
