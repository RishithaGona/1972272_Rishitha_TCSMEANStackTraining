let MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=>{
    let db = client.db("empdata")
    const fs = require('fs');
    let empData = fs.readFileSync('emp.json');  
    let empJson = JSON.parse(empData);  
    console.log(empJson)
    db.collection("employees").insertMany(empJson,(err2,result)=>{
        if(!err2){
            console.log(result+"---------------")

        }
        else{
            console.log(err2)
        }
        client.close();
    });  
    
   
})
