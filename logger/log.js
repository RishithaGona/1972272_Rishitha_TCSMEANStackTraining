const fs = require('fs');

let emps = new Array();

module.exports.logRecord = (id, name) => {
    var date = new Date();
    let emp = {"id":id, "name":name ,"date":date};
    emps.push(emp)
    console.log("Employee has been added "+id);
    debugger
}


module.exports.writeToFile = () => {
    
    var fileName = `./employees.json`;

    let jsonData = JSON.stringify(emps);
   
    fs.writeFile(fileName, jsonData, {flag : 'w'}, function(err) {
            if (err) 
                return console.error(err); 
            
        console.log(` ${fileName} updated!!!`);
    }); 
    debugger
 
}
