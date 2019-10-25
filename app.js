const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data={
        members:[
            {email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    }

    var jsonData= JSON.stringify(data);



    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/b5afbf3551",
        method:"POST",
        headers: {
            "Authorization": "anand1 d525c7075019c35d7f398009dd89dd00-us20"
        },
        body: jsonData

    }
    
    request(options,function(error,response,body){
        if(error){
            res.send("There was a problem signing into this page!");
        }else{
            if(response.statusCode === 200){
                res.send("You have succeessfully signed into the page!")
            }else
            res.send("There was a problem signing into the page.")
        }

    });


});

app.listen(3000,function(){
    console.log("The server is working!! ");
});


//api key
//d525c7075019c35d7f398009dd89dd00-us20

//list id
//b5afbf3551