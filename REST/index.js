const express =require("express");
const app =express();
const port=8080;
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const { faker } = require('@faker-js/faker'); // to generate random data

createRandomUser= ()=>{
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}

const mysql=require("mysql2");  // to build connection with database .

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'project1',
    password: 'Nischay1'
  });


  let user=[];

    for(let i=1;i<=100;i++){

        user.push(createRandomUser());
    }

  let usercout=0;
  let q="INSERT INTO users (id, name, email, password) VALUES ?";
  let count ="select count(*) from users";
  let users="select * from users";

  
try{

    connection.query(q,[user],(err,result)=>{

        if(err) throw err;
    
        console.log(result);
    });
    
}catch(err){

    console.log("Error occured !! : "+err);
}


try{

    connection.query(count,(err,result)=>{

        if(err) throw err;
    
        usercount=result[0]["count(*)"];
    });
    
}catch(err){

    console.log("Error occured !! : "+err);
}


app.listen(port,(req,res)=>{

    console.log("Listening To Port 8080..");
});

app.get("/",(req,res)=>{

  res.render("home.ejs",{usercount})
});

app.get("/users",(req,res)=>{

    try{

        connection.query(users,(err,usersdata)=>{
    
            if(err) throw err;
        
            res.render("users.ejs",{usersdata});
        });
        
    }catch(err){
    
        console.log("Error occured !! : "+err);
    }
});

