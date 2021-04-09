let http = require("http");
let url = require("url");
var obj=require("readline-sync");
let fs=require("fs");

let port=9090;
var taskArray=new Array();

let taskForm=
`
<div>
<h3><u>Add Task</u></h3>
<form action="/store" method="GET">
        <label>Employee ID</label>
        <input type="Number" name="empId"/><br/>
        <label>Task ID</label>
        <input type="Number" name="taskId"/><br/>
        <label>Task-Name</label>
        <input type="text" name="task"/><br/>
        <label>DeadLine</label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task">
        
    </form>
    </div>
` 

let deleteTask=
`
<h3><u>Delete Task</u></h3>
<form action="/delete" method="GET">
        <label>Task ID</label>
        <input type="number" name="taskId"/><br/>
        <input type="submit" value="Delete Task">
       
    </form>
`

let taskData=fs.readFileSync("task.json");
let readData=JSON.parse(taskData);
taskArray=readData;
var tableStart = `<h3><u>List Tasks</u></h3><table><tr><th>EmployeeID</th><th>TaskID</th><th>Task</th><th>Deadline</th></tr>`;
var tableEnd = `</table>`;
var tableData=`${taskArray.map(rowTemplate).join("")}`;
var finalTable=tableStart+tableData+tableEnd;


let server = http.createServer((req,res)=> {
    var pathInfo=url.parse(req.url).pathname;
    console.log(req.url)
 

        if(req.url=="/")
      {
        res.setHeader("content-type","text/html");
                     
        var tableStart = `<h3><u>List Tasks</u></h3><table><tr><th>EmployeeID</th><th>TaskID</th><th>Task</th><th>Deadline</th></tr>`;
        var tableEnd = `</table>`;
        var tableData=`${taskArray.map(rowTemplate).join("")}`;
        var finalTable=(taskArray.length>0)?tableStart+tableData+tableEnd:"No Records Available";
        res.end(taskForm+deleteTask+finalTable);
      }
        else if(pathInfo=="/store"){
         
            let urlDetails=req.url;
            let data = url.parse(urlDetails,true).query;
            var empId=data.empId;
            var taskId=data.taskId;
            var task=data.task;
            var deadline=data.deadline;
            var taskObj={EmployeeID:empId,TaskID:taskId,Task:task,Deadline:deadline};
       
            if(fs.existsSync("task.json"))
            {
                let taskData=fs.readFileSync("task.json");
                let readData=JSON.parse(taskData);
                taskArray=readData;
                taskArray.push(taskObj);
                let jsonDataString=JSON.stringify(taskArray);
                fs.writeFileSync("task.json",jsonDataString);
                res.setHeader("content-type","text/html");
                       
               
                var tableData=`${taskArray.map(rowTemplate).join("")}`;
                var finalTable=(taskArray.length>0)?tableStart+tableData+tableEnd:"No Records Available";
                res.end(taskForm+deleteTask+finalTable);
              
         
            }
            else
            {
                taskArray.push(taskObj);
                let jsonDataString=JSON.stringify(taskArray);
                fs.writeFileSync("task.json",jsonDataString);
                res.setHeader("content-type","text/html");
                          
  
                var tableData=`${taskArray.map(rowTemplate).join("")}`;
                var finalTable=(taskArray.length>0)?tableStart+tableData+tableEnd:"No Records Available";
                res.end(taskForm+deleteTask+finalTable);
                
             
            }
             
        }
        else if(pathInfo=="/delete"){
       
            if(fs.existsSync("task.json"))
            {
                res.setHeader("content-type","text/html");
                let taskData=fs.readFileSync("task.json");
                let readData=JSON.parse(taskData);
                taskArray=readData;
            
                if(taskArray.length!=0)
                {
                    let urlDetails=req.url;
                    let data = url.parse(urlDetails,true).query;
                    var taskId=data.taskId;
                    let counter=0;
                    for(let i=0;i<taskArray.length;i++)
                    {
                      if(taskArray[i].TaskID==taskId)
                      {
                        taskArray.splice(i,1);
                        counter=1;
                        console.log("Deleted");
                      }
                    }
                    console.log("After Delete");
                    
                    
                
            }
            
        }
 
    
      }});

function rowTemplate(task) {
    return `
    
        <tr>
          <td>${task.EmployeeID}</td>
          <td>${task.TaskID }</td>
          <td>${task.Task}</td>
          <td>${task.Deadline}</td>
        </tr>
    `;
  }

server.listen(port,()=>console.log(`Server running on port number ${port}`));
