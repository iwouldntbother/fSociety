const terminalInput = document.getElementById("terminalInput")
const terminalOutputHolder = document.getElementById("terminalOutputHolder")

var currentDir = "~/"
var currentDirObject = directoryMap["~/"];
var beforeString = "admin@kali " + currentDir + ": "

// document.querySelector(':root').style.setProperty('--directory', "admin@kali " + currentDir + ": ")

function terminalFocus() {
    terminalInput.focus();
}

terminalFocus();

terminalInput.addEventListener('keydown', function(e){
    var command = terminalInput.innerHTML
    if(e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Tab"){
        e.preventDefault();
    } else if (e.key == "Enter") {
        e.preventDefault();
        
        input(command);
        
        if (command == "") {
            return
        }

        runCommand(command)

    }

});

terminalInput.addEventListener('blur', function(e){
    e.target.focus();
})

function input(string) {
    terminalOutputHolder.innerHTML += "<p class='terminalLine'>" + "admin@kali " + currentDir + ": " + string + "</p>"
}

function output(stringArray) {
    for (i=0; i<stringArray.length; i++) {
        terminalOutputHolder.innerHTML += "<p class='terminalLine output'>" + stringArray[i] + "</p>"
    }
    terminalOutputHolder.innerHTML += "<br>"
}

function runCommand(command) {
    instruction = command.split(" ")[0]
    variable = command.split(" ")[1]

    // console.log(command.split(" "))

    // if (!(instruction in commands)) {
    //     output(["Command not found!"])
    //     terminalInput.innerHTML = ""
    //     return
    // }

    if (instruction == "ls") {
        // console.log("*Files in dir*")
        lsFunction()
    } else if (instruction == "cd") {
        cdFunction(variable);
    } else if (instruction == "help") {
        helpFunction()
    } else {
        if (!(instruction in commands)) {
            output(["Command not found!"])
            terminalInput.innerHTML = ""
            return
        }
    }
    terminalInput.innerHTML = "";
}

function lsFunctionOld() {
    var files = ""
    // console.log(directoryMap[currentDirCode].length)
    for (i=0; i<directoryMapOld[currentDirCode].length; i++) {
        files += " " + directoryMapOld[currentDirCode][i][0]
    }
    output([files]);
}

function lsFunction() {
    var files = ""
    for (i=0; i<Object.keys(currentDirObject).length; i++) {
        files += " " + Object.keys(currentDirObject)[i]
    }
    output([files]);
}

function cdFunction(location) {
    posLocations = []
    for (i=0; i<Object.keys(currentDirObject).length; i++) {
        posLocations.push(Object.keys(currentDirObject)[i])
    }
    // console.log(posLocations)
    if (location == "..") {
        // console.log("move up dir")

        // var newDir;

        var newDir = directoryMap[(currentDirObject[".."][0])]

        for (i=1; i<currentDirObject[".."].length; i++) {
            newDir = newDir[currentDirObject[".."][i]]
        }

        // console.log(newDir)

        currentDirObject = newDir

        currentDir = currentDir.split("/")
        console.log(currentDir)
        currentDir.pop()
        currentDir.pop()
        currentDir = currentDir.join("/") + "/"

        document.styleSheets[0].addRule("#terminalInput::before", "content: '"+ "admin@kali " + currentDir + ": " + "';")

    } else if (posLocations.includes(location) && !(location.includes("."))) {
        // console.log("Possible")
        currentDir = currentDir + location + "/"
        // console.log(currentDir)
        currentDirObject = currentDirObject[location]
        // console.log(currentDirObject[location])
        // terminalInput.style.content =  "admin@kali " + currentDir + ": "
        document.styleSheets[0].addRule("#terminalInput::before", "content: '"+ "admin@kali " + currentDir + ": " + "';")
    } else {
        // console.log("Impossible")
    }
}

function helpFunction() {
    
    helpInfo = [];
    
    for (i=0; i<Object.keys(commands).length; i++) {
        helpInfo.push(Object.keys(commands)[i] + ": " + Object.values(commands)[i])
    }

    output(helpInfo);
}