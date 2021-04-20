 let app = require("express")();  //loading and creating express reference   
let port =9090;   //defining port
let bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({extended:true})); // avoiding type erro for body data   

let url = "mongodb://localhost:27017/courseList";  //Mongodb server url
let obj = require("mongoose");          //loading mongoose module 
obj.Promise = global.Promise;  
//avoiding errors using const
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

//defining Schema
let courseSchema = obj.Schema({
    _id:Number, 
    courseName:String, 
    courseDescription:String, 
    courseAmount:Number, 
});
// Home page html code
let homePage = `
<div style="background-color: #feae96; text-align: center;">
<h2 style="text-align: center;"> Course Platform <h2> 
    <hr>
    <a href="/add" style="text-align: center; text-decoration:none; color: #3e3b6f;" >Add Page</a> <br/> <br/> 
    <a href="/update" style="text-align: center;text-decoration: none;color:  #3e3b6f;" >Update Page</a> <br/> <br/> 
    <a href="/delete" style="text-align: center;text-decoration: none;color:  #3e3b6f;">Delete Page</a> <br/> <br/> 
    <a href="/fetch" style="text-align: center;text-decoration: none; color:  #3e3b6f;">Fetch Page</a>
</div>`

// Add course html code
let addCourse = 
`<div style="background-color: #feae96; text-align: center;">
        <h2> Add Course </h2> 
        <hr>
        <form action="/add/course" method="post">
            <label>Course Id</label>
            <input type="number" name="courseId"/><br/>
            <label>Course Name</label>
            <input type="text" name="courseName"/><br/>
            <label>Description</label>
            <input type="text" name="courseDescription"/><br/>
            <label>Amount</label>
            <input type="number" name="courseAmount"/><br/>
            <input type="submit" value="Add Course"/>
        </form>
    </div>`

// Update course html code
let updateCourse =  `
<div style="background-color: #feae96; text-align: center;">
<h2> Update Course Amount </h2> 
    <form action="/update/course" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>
        <label>Amount</label>
        <input type="number" name="amount"/><br/>
        <input type="submit" value="Change Amount"/>
        <input type="reset" value="Reset"/>
    </form>
    </div>`

//delete code html code
let deleteCourse = `
<div style="background-color: #feae96; text-align: center;">
<h2> Delete Course </h2> 
    <form action="/delete/course" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>
        <input type="submit" value="Delete"/>
        <input type="reset" value="Reset"/>
    </form>
    </div>`    


// Get request for homepage
app.get("/",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(homePage);
        res.end()
})
//Get for add course page
app.get("/add",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(addCourse);
        res.end()
})

//Get to update course page
app.get("/update",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(updateCourse);
        res.end()
})

//Get to delete course page
app.get("/delete",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(deleteCourse);
    res.end()
})

//Get to retrive data page
app.get("/fetch",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    var fetchPage =  `<div style="background-color: #feae96; text-align: center;">
    <h1>List of Courses</h1>
            <table border="1" style="background-color: #feae96; text-align: center;">
            <tr>
            <th>Course Id</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Amount</th>
            </div>`
    obj.connect(url, mongooseDbOption) // Connect with DB
    let db = obj.connection;
    db.on("error", (err) => console.log("--ERROR__" + err)) 
    let Course = obj.model("",courseSchema,"courseList");
     Course.find({},(err,result)=>{
        if(!err){
           
               console.log("-----result fetch---"+result)
               for(let i=0;i<result.length;i++){
                fetchPage+=`<tr>
                           <td>${result[i]._id}</td>
                           <td>${result[i].courseName} </td>
                           <td>${result[i].courseDescription}</td>
                           <td>${result[i].courseAmount}</td>
                           </tr>`
             }
             fetchPage+=`</table>`
                console.log(fetchPage)
               
            res.send(fetchPage)
           
           
         }
        obj.disconnect();
    })
})

//Post req to delete a course
app.post("/delete/course",(req,res)=> {
    let courseId = req.body.courseId;
    obj.connect(url, mongooseDbOption)  
    let db = obj.connection; // connected to database. 
    db.on("error", (err) => console.log("--ERROR--" + err)) 
    // Schema is predefined hence not using db.once("open",()=>{})
    // Creating Model using schema 
    let Course = obj.model("",courseSchema,"courseList");
    // Creating reference using model 
    Course.deleteOne({_id:courseId},(err,result)=> {
        if(!err){
            if(result.deletedCount>0){
                    console.log("Record deleted ");
                    res.redirect('http://localhost:9090/');
            }else {
                    console.log("Record not found");
            }
        }
        obj.disconnect();
    })
})


app.post("/update/course",(req,res)=> {
    let courseId = req.body.courseId;
    let amount = req.body.amount;
    obj.connect(url, mongooseDbOption) 
    let db = obj.connection;
    db.on("error", (err) => console.log("--Error--" + err))
    let Course = obj.model("",courseSchema,"courseList");
    Course.updateOne({_id:courseId},{$set:{amount:amount}},(err,result)=> {    
        if(!err){
            if(result.nModified>0){
                res.redirect('http://localhost:9090/');
                console.log("Update success")
            }else {
                console.log("Update failed")
            }
        }
        obj.disconnect();
    })
})

app.post("/add/course",(req,res)=> {
    let courseId = req.body.courseId;
    let courseName = req.body.courseName;
    let courseDescription = req.body.courseDescription;
    let courseAmount = req.body.courseAmount;

    obj.connect(url, mongooseDbOption)
    let db = obj.connection;  // Connected to db
    db.on("error", (err) => console.log("--Error--" + err));
    // Creating Model using schema 
    let Course = obj.model("",courseSchema,"courseList");
    // Creating reference using model 
    let p1 = new Course({_id:courseId,courseName:courseName,description:courseDescription, amount:courseAmount});
    p1.save((err,result)=>{
        if(!err){
            res.redirect('http://localhost:9090/');
            console.log("record inserted successfully")
        }else {
            console.log(err);
            res.send("Error Record could not be added" + err)
        }
        obj.disconnect();      
    })
})

app.listen(port,()=>console.log(`Server running on port nubmer ${port}`));