const terminalInput = document.getElementById("terminalInput");
const terminalOutputHolder = document.getElementById("terminalOutputHolder");

var currentDir = "~/";
var currentDirObject = directoryMap["~/"];
var beforeString = "admin@kali " + currentDir + ": ";
var defaultMode = true;
var trustTest = false;
var investigate = false;
var currentHint = "You've just started, at least try by yourself!"

var commandHistory = [];
var commandPosition;

// document.querySelector(':root').style.setProperty('--directory', "admin@kali " + currentDir + ": ")

window.addEventListener("keypress",startListener)

function startListener(e) {
    if (e.code == "Space") {
        e.preventDefault();
        init();
    }
}

function init() {

    window.removeEventListener("keypress",startListener);
    document.getElementById("endingContainer").style.opacity = 0;
    terminalFocus();
    terminalInput.addEventListener('blur', function(e){
        e.target.focus();
    })
    startTimer();

}

function startTimer() {

    console.log("Timer started")
    
    window.setTimeout(function(){
        currentHint = "Okay, maybe look for some suspicious files?"
    }, 60000)

    window.setTimeout(function(){
        currentHint = "The rootkit folder looks weird..."
    }, 120000)

    window.setTimeout(function(){
        currentHint = "You've taken 3 minutes already, try opening the rootkit script file?"
        hintFunction("You've taken 3 minutes already, try opening the rootkit script file?")
    }, 180000)
    
    window.setTimeout(function(){
        currentHint = "You've got less than a minute left, Are you gonna do anything? Maybe just give up"
        hintFunction("You've got less than a minute left, Are you gonna do anything? Maybe just give up")
    }, 180000)

    window.setTimeout(function(){
        gameOver(0);
    }, 300000)

}



function terminalFocus() {
    terminalInput.focus();
}

// terminalFocus();

terminalInput.addEventListener('keydown', function(e){
    var command = terminalInput.innerHTML
    if(e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Tab"){
    // if(e.key == "Tab"){
        e.preventDefault();
    } else if (e.key == "Enter" && defaultMode) {
        e.preventDefault();

        input(command);
        
        if (command == "") {
            return
        }

        commandHistory.push(command)
        commandPosition = commandHistory.length;
        // console.log(commandPosition)
        runCommand(command)

    } else if (e.key == "Enter" && !defaultMode) {
        e.preventDefault();

        if (!investigate && !trustTest) {
            rootkitOption(command);
        } else if (investigate && !trustTest) {
            investigateOption(command);
        } else if (!investigate && trustTest) {
            trustTestOption(command);
        }

    } else if (defaultMode && e.key == "ArrowUp" && commandHistory.length > 0) {
        e.preventDefault();
        // console.log(commandPosition)
        if (commandPosition > 0) {
            // console.log(commandHistory[commandPosition - 1])
            terminalInput.innerHTML = commandHistory[commandPosition - 1]
            placeCaretAtEnd(terminalInput);
            commandPosition--;
        } else {
            // console.log(commandHistory[0])
            terminalInput.innerHTML = commandHistory[0]
            placeCaretAtEnd(terminalInput);
            commandPosition = 0;
        }
    } else if (defaultMode && e.key == "ArrowDown" && commandHistory.length > 0) {
        e.preventDefault();
        // console.log(commandPosition)
        if (commandPosition < commandHistory.length - 1) {
            // console.log(commandHistory[commandPosition + 1])
            terminalInput.innerHTML = commandHistory[commandPosition + 1]
            placeCaretAtEnd(terminalInput);
            commandPosition++;
        } else {
            // console.log(commandHistory[commandHistory.length - 1])
            terminalInput.innerHTML = commandHistory[commandHistory.length - 1]
            placeCaretAtEnd(terminalInput);
            commandPosition = commandHistory.length - 1;
        }
    }

});



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
    } else if (instruction == "help" || instruction == "?") {
        helpFunction()
    } else if (instruction == "hint" || instruction == "!") {
        hintFunction()
    } else if (instruction == "open") {
        openFunction(variable)
    }  else if (instruction == "shutdown") {
        shutdownFunction()
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

function hintFunction(text) {
    if (text) {
        document.getElementById("hintBox").innerHTML = text;
    } else {
        document.getElementById("hintBox").innerHTML = currentHint;
    }
}

function openFunction(file) {
    posLocations = []
    for (i=0; i<Object.keys(currentDirObject).length; i++) {
        posLocations.push(Object.keys(currentDirObject)[i])
    }
    console.log("Opening file" + file)
    if (files.includes(file) && posLocations.includes(file)) {
        console.log("File true")

        if (file == "fSociety.sh") {
            openRootkit()
        } else if (file == "passwords.txt") {
            hintFunction("Nothing of much interst here, try looking or something suspicious.")
        } else if (file == "README.md") {
            hintFunction("You skim the file, something about hacking maybe mass government hacking? maybe try running the .sh file?")
        }
    } else {
        output([file + " wasn't found or couldn't be opened, sure you spelt it right?"])
    }
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function openRootkit() {

    defaultMode = false;

    terminalOutputHolder.innerHTML = ""

    var rootkitOutput = [
        "fSociety Rootkit",
        "<br>",
        "{1}--Run Rootkit",
        "{2}--Mount kernal and inspect code",
        "{3}--Scan for viruses",
        "<br>",
        "{99}--Exit rootkit while its safe"
    ]

    output(rootkitOutput)

}

function rootkitOption(option) {
    if (option == "1") {
        gameOver(5)
    } else if (option == "2") {
        terminalOutputHolder.innerHTML = ""

        var rootkitOutput = [
            "fSociety Rootkit",
            "<br>",
            "Looking through the source code you become more suspicious.",
            "<br>",
            "{1}--Run",
            "{2}--Report Code",
            "{3}--Steal Code"
        ]

        output(rootkitOutput)
        investigate = true;
    } else if (option == "3") {
        terminalOutputHolder.innerHTML = ""

        var rootkitOutput = [
            "fSociety Rootkit",
            "<br>",
            "Virus Scan was halted due to unexpected error",
            "<br>",
            "{1}--Trust",
            "{2}--Don't Trust",
            "{3}--Check out code for yourself"
        ]

        output(rootkitOutput)
        trustTest = true;
    } else if (option == "99") {
        gameOver(1);
    } else {
        console.log("Error unknown input?")
    }
}

function investigateOption(option) {
    investigate = true;
    if (option == "1") {
        gameOver(5)
    } else if (option == "2") {
        gameOver(3)
    } else if (option == "3") {
        gameOver(2)
    }
}

function trustTestOption(option) {
    if (option == "1") {
        openRootkit()
        trustTest = false;
    } else if (option == "2") {
        gameOver(4)
    } else if (option == "3") {
        hintFunction("You don't trust the scan and decide to look at the code yourself.");
        rootkitOption("2");
        trustTest = false;
    }
}

function shutdownFunction(){
    gameOver(0);
}

function gameOver(ending) {
    var title = document.getElementById("endingTitle")
    var description = document.getElementById("endingDescription")
    var number = document.getElementById("endingNumber")

    title.innerHTML = endings[ending].title
    description.innerHTML = endings[ending].description
    number.innerHTML = (ending + 1) + "/6"

    document.getElementById("endingContainer").style.opacity = 1;
}