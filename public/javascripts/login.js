$(document).ready(function(event) {

    $("#loginButton").click(function(event) {
        console.log("loginAction");
        event.preventDefault();

        var currUsername = $("#login-username").val();
        var currPetName = $("#login-petName").val();
        if (currUsername == "") {
            alert("Please enter a username");
        }
        else if (currPetName == "") {
            alert("Please name your pet");
        }
        else {
            var myObj = { username: currUsername };
            console.log(myObj);

            var url = "query";
            $.ajax({
                url: url,
                type: "GET",
                data: myObj,
                contentType: "application/json; charset=utf-8",
                success: function(data, textStatus) {
                    if (data != 0) {
                        for (var user in data) {
                            user = data[user];
                            console.log("Data from database: " + user.username);
                            if (user.username == undefined) {
                                alert("Please use a valid username or register for a new account");
                            }
                            else {
                                if (user.petName == currPetName) {
                                    console.log("login was successful");
                                    sessionStorage.setItem("name", currUsername);
                                    sessionStorage.setItem("pet", currPetName);
                                    sessionStorage.setItem("id", user._id);
                                    console.log("Set Session Storage");
                                    window.location.replace("/pet");
                                }
                                else {
                                    alert("You entered the wrong pet name. Try again!");
                                }
                            }
                        }
                    }
                    else {
                        alert("Please use a valid username or regiser for a new account");
                    }

                }
            });
        }

    });
});
