const readLine = require("readline-sync")
const logger = require("./log")

var num = readLine.question("How many employees do you want to enter? ")


for(var i = 0; i < parseInt(num); i++){
    var id = readLine.question("Enter your employee id: ")
    var name = readLine.question("Enter your employee name: ")
    logger.logRecord(id, name);
    debugger;

}

logger.writeToFile();
debugger;
