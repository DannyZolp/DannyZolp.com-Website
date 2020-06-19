// Instantiation of the Date API
const date = new Date();

// Instantiation of the Terminal Data Cache
var dataCache = new Array();

// Instantiation of the Terminal
const terminal = new Terminal({
    cursorBlink: "block",
    cols: 150,
    rows: 40
});

terminal.open(document.getElementById('terminal'));

var promptText = "";

terminal.onData(ref => {
    switch (ref) {
        case '\r':
            HandleEnter(dataCache, res => {
                terminal.writeln("");
                terminal.write(res);
            });
            dataCache = new Array();
        case '\u0003':
            prompt(terminal);
            break;
        case '\u007F':
            if (terminal._core.buffer.x > promptText.length-2) {
                terminal.write('\b \b');
                dataCache.pop();
            }
            break;
        default:
            terminal.write(ref);
            dataCache.push(ref);
    }
});

function FixPrompt(callback) {
    if (Directory == "") {
        callback(promptText = "\r\nuser@very-real-machine-not-an-emulator:~$ ");
    } else {
        callback(promptText = `\r\nuser@very-real-machine-not-an-emulator/${Directory}/:~$ `);
    }
}

function prompt(terminal) {
    FixPrompt(ref => {
        terminal.write(ref);
    });
}

// Actually Start Creating the Environment
CreateStartingText(terminal);

// Terminal Functions
function CreateStartingText(terminal) {
    // Just a whole bunch of code that makes it look pretty, don't care enough to make this look nice ;)
    terminal.writeln("Welcome to DannyOS 69.42.0 LTS (GNU/Linux 5.3.0-1020 x86_64)");
    terminal.writeln(" ");
    terminal.writeln(" * Documentation:  https://github.zolp.dev");
    terminal.writeln(" * Management:     https://zolp.dev/project/website")
    terminal.writeln(" * Support:        danny@zolp.dev");
    terminal.writeln(" ");
    terminal.writeln(`For a list of commands, type "help" (or "howtouse" if you are really stuck)`)
    terminal.writeln(" ");
    terminal.writeln("2 packages can be updated.");
    terminal.writeln("0 updates are security updates.");
    terminal.writeln(" ");
    terminal.writeln("*** System restart required ***")
    GetCorrectDateFormat(date => {
        terminal.writeln(date);
        prompt(terminal);
    });
}

function GetCorrectDateFormat(callback) {
    var output = "Last login: ";

    // Gets the weekly day
    var dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    output = output + dates[date.getDay()] + " ";

    // Gets the calendar month
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
    output = output + months[date.getMonth()] + " ";

    // Gets the calendar day
    output = output + date.getDate() + " ";

    // Gets the correctly formatted 24-hour time
    output = output + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";

    // Gets the year
    output = output + date.getFullYear();

    // Adds the IP Address of the connector
    APICaller("https://ipapi.co/json/", res => {
        output = output + " from " + res.ip;
        callback(output);
    });
}

function HandleEnter(array, callback) {
    // First, grab the command
    GetCommandReference(array, command => {
        // Massive "if" chain to check the command types
        if (command == "echo") {
            RemoveEchoFromArray(array, ref => {
                callback(ref);
            });
        } else if (command == "ls") {
            FindProjects(res => callback(res));
        } else if (command == "cd") {
            FixDirectory(array, ref => {
                GotoProject(ref)
            });
        } else if (command == "sudo") {
            callback("Woah there bud, check your privilage.");
        } else if (command == "clear") {
            var output = "";
            for (i=0; i<=100; i++) {
                output += "\n";
            }
            callback(output);
        } else if (command == "back") {
            window.location.replace("index.html");
        } else if (command == "howtouse") {
            ExplainHowToUse(terminal);
        } else if (command == "help") {
            callback("Commands: [ls, cd, echo, sudo, clear, back, howtouse] -- More commands coming soon!")
        }
    });
}

function GetCommandReference(array, callback) {
    var output = "";
    array.forEach(char => {
        if (char != ' ') {
            output = output + char;
        } else {
            callback(output);
            output = null;
        }
    });
    if (output != null) {
        callback(output);
    }
}

function RemoveEchoFromArray(array, callback) {
    var count = 0;
    var output = "";
    array.forEach(char => {
        if (count <= 4) {
            count++;
        } else {
            output = output + char;
        }
    });
    callback(output);
}

function RemoveDirectoryFromArray(array, callback) {
    var count = 2;
    var output = "";
    
    array.forEach(char => {
        if (char == '/') {
            count = 3;
        }
    });

    array.forEach(char => {
        if (count >= 0) {
            count--;
        } else {
            output = output + char;
        }
    });
    callback(output);
}

function ExplainHowToUse(terminal) {
    terminal.writeln("");
    terminal.writeln("Welcome to the instructions of how to use DannyOS!");
    terminal.writeln("To see what package you can access, type 'ls'");
    terminal.writeln("To select a package, type 'cd [package name]'");
    terminal.writeln("There is also folders, so you must select the directory before you can access packages.");
    terminal.writeln("");
    terminal.writeln("Example Usage:");
    terminal.writeln("[ls]");
    terminal.writeln(" > GitHub/");
    terminal.writeln("[cd GitHub]");
    terminal.writeln(" /GitHub/> ");
    terminal.writeln("[cd example-project]");
    terminal.writeln(" /GitHub/> Opening GitHub Repo...");
}

// Project Management (Directories)
var Directory = "";

function FindProjects(callback) {
    if (Directory == "") {
        callback("/GitHub");
    } else if (Directory == "GitHub") {
        GetListOfGitlabProjects(res => {
            callback(res);
        });
    }
}

function GotoProject(ref) {
    if (Directory == "") {
        if (ref == "GitHub") {
            Directory = "GitHub";
        } else {
            Directory = "";
        }
    } else if (Directory == "GitHub") {
        SendSomeoneToAGitlabProject(ref);
    }
}

function FixDirectory(arr, callback) {
    var count = 2;
    var output = "";
    
    arr.forEach(char => {
        if (char == '/') {
            count = 3;
        }
    });

    arr.forEach(char => {
        if (count >= 0) {
            count--;
        } else {
            output = output + char;
        }
    });
    callback(output);
}

// API Call Functions
function APICaller (api_url, callback) {
    $.ajax({
        url: api_url,
        dataType: 'json',
        success: function(res) {
            callback(res);
        }
    });
}

// Github API Functions
var GithubCallCache;

APICaller("https://api.github.com/users/DannyZolp/repos", res => {
    GithubCallCache = res;
})

function GetListOfGitlabProjects(callback) {
    var output = "";
        GithubCallCache.forEach(ref => {
            if (ref.visability != "private") {
                output = output + "/" + ref.name + "   ";
            }
        });
        callback(output);
}

function SendSomeoneToAGitlabProject(selection) {
        GithubCallCache.forEach(ref => {
            if (ref.name == selection) {
                window.open(ref.html_url);
            }
        });
}