// import axios from "axios";
const axios = require('axios'); 

const jsonrawtoxlsx = require("jsonrawtoxlsx");
const fs = require("fs");

// Make a request for a user with a given ID
axios
  .get("https://reqres.in/api/users?page=1")
  .then(function (response) {
    // handle success
    // console.log(response.data.data);
    convertToexcel(response.data.data);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });



  function convertToexcel(data){
    console.log(typeof data);
    const buffer = jsonrawtoxlsx(data);

    fs.writeFileSync("example.xlsx", buffer, "binary");
  }