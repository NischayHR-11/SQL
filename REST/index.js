const express =require("express");
const app =express();
const port=8080;
const path=require("path");

app.set("view engine","views");
app.set("views",path.join(__dirname,"/views"));

const { faker } = require('@faker-js/faker'); // to generate random data

createRandomUser= ()=>{
    return {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
}

const mysql=require("mysql2");  // to build connection with database .

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'project1',
    password: 'Nischay1'
  });

console.log(createRandomUser());

try{

    connection.query("show tables",(err,result)=>{

        if(err)
            throw err;
    
        console.log(result);
    });
    
}catch(er){

    console.log("Error occured !! : "+er);
}


app.listen(port,(req,res)=>{

    console.log("Listening To Port 8080..");
});

