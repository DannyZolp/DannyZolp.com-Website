var github_api_url = 'https://api.github.com/users/DannyZolp/repos';
var ip_api_url = 'http://www.geoplugin.net/json.gp';
var githubrep;
var ip;

$.ajax({
    url: github_api_url,
    contentType: "application/json",
    dataType: 'json',
    success: function(res) {
        githubrep = res;
    }
});

var date = new Date();
var charlist = new Array();

var term = new Terminal({
    cursorBlink: "block",
    cols: 150,
    rows: 40
});

term.open(document.getElementById('terminal'));

term._initialized = true;

term.prompt = () => {
    term.write('\r\n$ ');
};

CreateStartingText();

term.onData(e => {
    switch (e) {
        case '\r': // Enter
            HandleEnter(charlist);
            charlist = new Array();
        case '\u0003': // Ctrl+C
            prompt(term);
            break;
        case '\u007F': // Backspace (DEL)
            // Do not delete the prompt
            if (term._core.buffer.x > 42) {
                term.write('\b \b');
                charlist.pop();
            }
            break;
        default: // Print all other characters for demo
            term.write(e);
            charlist.push(e);
    }
});

function prompt(term) {
    term.write("\r\nuser@very-real-machine-not-an-emulator:~$ ");
}

function CreateStartingText() {
    term.writeln("Welcome to DannyOS 69.42.0 LTS (GNU/Linux 5.3.0-1020 x86_64)");
    term.writeln(" ");
    term.writeln(" * Documentation:  https://github.zolp.dev");
    term.writeln(" * Management:     https://zolp.dev/project/website")
    term.writeln(" * Support:        danny@zolp.dev");
    term.writeln(" ");
    term.writeln(`For a list of commands, type "help"`)
    term.writeln(" ");
    term.writeln("2 packages can be updated.");
    term.writeln("0 updates are security updates.");
    term.writeln(" ");
    term.writeln("*** System restart required ***")
    GetCorrectDateFormat(date => {
        term.writeln(date);
        term.write("user@very-real-machine-not-an-emulator:~$ ");
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

    $.ajax({
        url: ip_api_url,
        dataType: 'json',
        success: function(res) {
            // Adds the IP Address to the end of the string for MAXIMUM authenticity
            output = output + " from " + res.geoplugin_request;

            // Calls back
            callback(output);
        }
    });
}

function HandleEnter(array) {
    GetCommandReference(charlist, command => {
        if (command == "echo") {
            term.writeln("");
            RemoveEchoFromArray(charlist, ref => {
                term.write(ref);
            });
        } else if (command == "ls") {
            term.writeln("");
            GetListOfGithubProjects(res => {
                term.write(res);
            });
        } else if (command == "cd") {
            term.writeln("");
            RemoveDirectoryFromArray(array, output => {
                SendSomeoneToAGithubProject(output);
            });
        } else if (command == "sudo") {
            term.writeln("");
            term.write("Woah there bud, check your privilage.");
        } else if (command == "clear") {
            for (i=0; i<=100; i++) {
                term.writeln("");
            }
        } else if (command == "back") {
            window.location.replace("index.html");
        } else if (command == "help") {
            term.writeln("");
            term.write("Commands: [ls, cd, echo, sudo, clear, back] -- More commands coming soon!")
        }
        charlist = new Array();
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

function Get

function GetListOfGithubProjects(callback) {
    var output = "";
    .forEach(ref => {
        output = output + "/" + ref.name + "   ";
    });
    callback(output);
}

function ConnectToANewDirectory(currentDirectory, callback) {
    var
}

function SendSomeoneToAGithubProject(selection) {
    githubrep.forEach(ref => {
        if (ref.name == selection) {
            window.open(ref.html_url);
        }
    })
}