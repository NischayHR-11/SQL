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

app.use(express.urlencoded({extended:true})); // to accept url data.
const method= require("method-override"); // for method override { forms post request can be converted to patch }
app.use(method('_method'));


  let user=[];

    for(let i=1;i<=5;i++){

        user.push(createRandomUser());
    }

  let usercout=0;
  let q="INSERT INTO users (id, name, email, password) VALUES ?";
  let users="select * from users";

  
try{

    connection.query(q,[user],(err,result)=>{

        if(err) throw err;
    
        console.log(result);
    });
    
}catch(err){

    console.log("Error occured !! : "+err);
}



app.listen(port,(req,res)=>{

    console.log("Listening To Port 8080..");
});

app.get("/",(req,res)=>{

    let count ="select count(*) from users";

    try{

        connection.query(count,(err,result)=>{
    
            if(err) throw err;
        
            usercount=result[0]["count(*)"];
        });
        
    }catch(err){
    
        console.log("Error occured !! : "+err);
    }
    
    res.render("home.ejs",{usercount});
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


app.get("/user/:id/edit",(req,res)=>{

    let {id}=req.params;

    let q=`select * from users where id='${id}'`;

    try{

        connection.query(q,(err,id)=>{

            if(err) throw err;
            
            let user=id[0];
            res.render("edit.ejs",{user});
        })

    }catch( err){

    console.log("ERROR is : "+err);
        
    }
});

app.patch("/user/:id",(req,res)=>{

    let {id}=req.params;

    let q=`select * from users where id='${id}'`;
    let{ password , name}= req.body;

    try{

        connection.query(q,(err,id)=>{

            if(err) throw err;
            
            let user=id[0];

            if(password==user.password){

                let qi=`UPDATE users SET name='${name}' WHERE id='${user.id}'`;

                try{

                    connection.query(qi,(err,result)=>{
            
                        if(err) throw err;
                        
                        res.redirect("/users");
                    })
            
                }catch( err){
            
                console.log("ERROR is : "+err);
                    
                }

            }else{

                res.send("<h1> INCORRECT PASSWORD !! <h1>");
            }
        })

    }catch( err){

    console.log("ERROR is : "+err);
        
    }

});

app.get("/user/new",(req,res)=>{

    res.render("new.ejs");
})

app.post("/user",(req,res)=>{

    let {name,email,password}=req.body;
    let userid=faker.string.uuid();
    let qa=`insert into users (id,name,email,password) values ('${userid}','${name}','${email}','${password}')`


    try{

        connection.query(qa,(err,result)=>{

            if(err) throw err;
            
            user.push({userid,name,email,password})
            res.redirect("/users");
        })

    }catch( err){

    console.log("ERROR is : "+err);
        
    }
});

app.delete("/user/:id",(req,res)=>{

    let {id}=req.params;

    let q=`select * from users where id='${id}'`;

    try{

        connection.query(q,(err,id)=>{

            if(err) throw err;
            
            let userid=id[0];
            
            let qd=`delete from users where id='${userid.id}'`;

              
            try{

                connection.query(qd,(err,result)=>{

                    if(err) throw err;
                    
                    user=user.filter((p)=>userid.id!=p.id);
                    res.redirect("/users");
                });
                
            }catch(err){

                console.log("Error occured !! : "+err);
            }


        })

    }catch( err){

    console.log("ERROR is : "+err);
        
    }
})