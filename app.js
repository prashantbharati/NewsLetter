const express=require("express");
const bodyParser=require("body-parser");
//const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  //console.log("server is running");
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
   var firstname=req.body.fname;
   var secondname=req.body.lname;
   var email=req.body.email;
   console.log(firstname,secondname,email) ;

   const data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{ 
        FNAME: firstname,
        LNAME: secondname
        }
      }
    ]
  };
  
  const jsonData=JSON.stringify(data);
  
  const url="https://us6.api.mailchimp.com/3.0/lists/f691df79d2";
  
  const options={
    method:"POST",
    auth:"bharati672:4fdcc88aa721733f80130c9a41cd0196-us6"
  }
  
  const request=https.request(url,options,function(response){

    if(response.statusCode==200)
    res.sendFile(__dirname+"/sucess.html");
    else res.sendFile(__dirname+"/failure.html");
     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
  })
  
  request.write(jsonData);
  request.end();

});



app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});

// Api Key
// 4fdcc88aa721733f80130c9a41cd0196-us6
//id
//f691df79d2