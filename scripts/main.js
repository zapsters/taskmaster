var lockedMode = false;
var lockIcon = document.getElementById("lockspan");
$("#header").load( "pieces/header.html", function() {
    console.log( "Header load was performed." );
});

sidebar = document.getElementById("sidebar");
$("#sidebar").load( "pieces/sidebar.html", function() {
    console.log( "Sidebar load was performed." );
    $(selectedbtn).children().addClass("selected");
    lockIcon = document.getElementById("lockspan");
});

assignmentList = document.getElementById("assignmentList");
function createEmptyAssignment(title, info, complete) {
    $("#assignmentList").append($("<div>").load( "pieces/assignmenttemplate.html", function() {
        console.log( "Assignment load was performed.");
        var obj = this.children[0];
        var assignmentdetails = this.children[0].children[1];
        if(title != undefined) assignmentdetails.querySelector("#title").innerHTML = title;
        if(info != undefined) assignmentdetails.querySelector("#info").innerHTML = info;
        if(complete != undefined && complete == true) {
            assignmentdetails.querySelector('#completestatus').innerHTML = "Complete!";
            obj.setAttribute("data-complete", true);
        }
    }));
}

function toggleLockMode() {
    if(lockedMode == false) {
        lockedMode = true;
        lockIcon.innerHTML = "lock_open";
        alert("Locked mode is active.");
    } else {
        lockedMode = false;
        lockIcon.innerHTML = "lock";
        alert("Locked mode is disabled.");
    }
}

var newAssignment = null;
function createNewAssignment(title, info, complete) {
    createEmptyAssignment(title, info, complete);
    newAssignment = {title: title, info: info, complete: complete};
    assignmentMaster = assignmentMaster.concat(newAssignment);
    saveCookies();
}

eventList = document.getElementById("eventList");
function createNewEvent(title, info) {
    createEmptyEvent(title, info);
    newEvent = {title: title, info: info};
    eventMaster = eventMaster.concat(newEvent);
    saveCookies();
}
function createEmptyEvent(title, info) {
    $("#eventList").append($("<div>").load( "pieces/calendartemplate.html", function() {
        console.log( "Event load was performed." );
        var obj = this.children[0];
        var eventdetails = this.children[0].children[1];
        if(title != undefined) eventdetails.querySelector("#title").innerHTML = title;
        if(info != undefined) eventdetails.querySelector("#info").innerHTML = info;
    }));
}

//Keep track of assignment list.
var assignmentMaster = [];
var eventMaster = [];

if(getCookie("assignmentMaster") != '') assignmentMaster = JSON.parse(getCookie("assignmentMaster"));
if(getCookie("eventMaster") != '') eventMaster = JSON.parse(getCookie("eventMaster"));

assignmentMaster.forEach(assignment => {
    createEmptyAssignment(assignment.title, assignment.info, assignment.complete);
});
eventMaster.forEach(event => {
    createEmptyEvent(event.title, event.info);
});

function saveCookies() {
    document.cookie = "assignmentMaster=" + JSON.stringify(assignmentMaster) + ";";
    document.cookie = "eventMaster=" + JSON.stringify(eventMaster) + ";";
    console.log(JSON.parse(getCookie('assignmentMaster')));
    console.log(JSON.parse(getCookie('eventMaster')));
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toggleSidebar() {
    if (sidebar.dataset.open == "true") {
        //close
        sidebar.style.width = "70px";
        sidebar.setAttribute("data-open", "false");
    } else {
        //open
        sidebar.style.width = "250px";
        sidebar.setAttribute("data-open", "true");
    }
}