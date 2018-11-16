// angular.module('tamagotchi', [])
//     .controller('registerCtrl', [
//         '$scope', '$http',
//         function($scope, $http) {
         $(document).ready(function(event) {   
            $("#registerButton").click(function(event) {
                event.preventDefault();
                alert("Trying to register");
                console.log("Registering a new user");

                var currUsername = $("#newUser").val();
                var currPetName = $("#newPet").val();
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
                    console.log("right before ajax call");
                    $.ajax({
                        url: url,
                        type: "GET",
                        data: myObj,
                        contentType: "application/json; charset=utf-8",
                        failure: function(jqXHR, status, err) {
                            console.log("failed");
                            //alert("Username is available");
                        },
                        success: function(data, status, jqXHR) {
                            console.log("success");
                            console.log(data);
                            if (data != 0) {
                                alert("That username is already taken. Please choose a different username");
                            }
                            else {
                                console.log("username is available");
                                //$scope.currentTamagotchi = {};
                                //$scope.addPet = function() {
                                var newPet = {
                                    username: currUsername,
                                    petName: currPetName,
                                };
                                $http.post('/tamagotchi', newPet).success(function(data) {
                                    //$scope.currentTamagotchi = data;
                                    console.log("posted a new user");
                                });
                                //};
                                console.log("Completed registration. Redirecting to login page");
                                //window.location.replace("/index");
                                //};
                            }
                            // for (var user in data) {
                            //     console.log("made it to the ajax call");
                            //     user = data[user];
                            //     console.log("Data from database: " + user.username);
                            //     if (user.username != undefined) {
                            //         alert("That username is already taken. Please choose a different username");
                            //     }
                            //     else {
                            //         console.log("username is valid, continuing");
                            //         $scope.currentTamagotchi = {};
                            //         $scope.addPet = function() {
                            //             var newPet = {
                            //                 username: currUsername,
                            //                 petName: currPetName,
                            //             };
                            //             $http.post('/tamagotchi', newPet).success(function(data) {
                            //                 $scope.currentTamagotchi = data;
                            //                 console.log("posted a new user");
                            //             });
                            //         };
                            //         console.log("Completed registration. Redirecting to login page");
                            //         window.location.replace("/index");
                            //     }
                            // }
                        }

                    });

                }
            });
        });
    // ]);
