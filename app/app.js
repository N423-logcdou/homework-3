/**
 * The `initListeners` function initializes event listeners for the submit and getName buttons, and
 * performs various operations when these buttons are clicked.
 */
function initListeners() {
    $("#submit").on("click", (e) => {
        e.preventDefault(); //Always put these in click listeners to prevent refresh

        let fn = $("#firstName").val();
        let ln = $("#lastName").val();
        let age = $("#age").val();
        let pn = $("#phone").val();
        let email = $("#email").val();
        let cs = $("#classes").val();
        let newArrClasses = cs.split(",");
        let finalClassArray = [];

        let userObj = {
            fName: fn,
            lName: ln,
            age: age,
            phone: pn,
            email: email,
            classes: []
        }

        $.each(newArrClasses, (idx, newClass) => {
            let cl = {
                className: newClass.trim()
            }
            finalClassArray.push(cl);
        })
        userObj.classes = finalClassArray;
        console.log(userObj);


        $("#firstName").val("");
        $("#lastName").val("");
        $("#age").val("");
        $("#phone").val("");
        $("#email").val("");
        $("#classes").val("");
        addUser(userObj);
    })

    $("#getName").on("click", (e) => {
        getUser();
    })
}

function addUser(user) {
    let allUsers = JSON.parse(localStorage.getItem("Users"));
    allUsers.push(user);
    localStorage.setItem("Users", JSON.stringify(allUsers));
}

/**
 * The function retrieves user data from local storage and displays their name and classes in the HTML
 * element with the id "app".
 */
function getUser() {
    $("#app").html(`<h3>Names:</h3>`);
    let allUsers = JSON.parse(localStorage.getItem("Users"));

    $.each(allUsers, (idx, user) => {
        let displayString = "";
        displayString += `<p>Name: ${user.fName} ${user.lName}</p><p>Age: ${user.age}</p><p>Phone Number: ${user.phone}</p><p>Email: ${user.email}</p> <p>Classes: </p><ul>`;
        $.each(user.classes, (idx, cls) => {
            displayString += `<li>${cls.className} </li>`;
        })
        displayString += `</ul>`;
        $("#app").append(`<div class="student-el">${displayString}</div>`);
    })
}

/**
 * The function checks if the browser supports local storage and creates a "Classes" item if it doesn't
 * exist.
 */
function connectToStorage() {
    if (localStorage) {
        let users = localStorage.getItem("Users");
        if (users) {
            console.log("already there")
        } else {
            localStorage.setItem("Users", "[]");
        }

    } else {
        console.log("No Storage Detected");
    }
}


$(document).ready(function () {
    initListeners();
    connectToStorage();
});