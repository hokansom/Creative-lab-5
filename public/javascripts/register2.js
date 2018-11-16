/* global angular */
angular.module('tamagotchi', []);
angular.module('tamagotchi').controller('registerCtrl', registerCtrl);

function registerCtrl($scope, $http) {
    $scope.register = function() {
        event.preventDefault();


        var currUsername = $scope.newUser;
        var currPetName = $scope.newPet;
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
                success: function(data, status, jqXHR) {
                    console.log(data);
                    if (data != 0) {
                        alert("That username is already taken. Please choose a different username");
                    }
                    else {
                        console.log("Registering a new user");
                        $scope.currentTamagotchi = {};
                        var min = 40;
                        var max = 68;
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        var png = Math.floor(Math.random() * (max - min + 1)) + min;

                        //$scope.addPet = function() {
                        var newPet = {
                            username: currUsername,
                            money: 500,
                            petName: currPetName,
                            species: "Lovelitchi",
                            imageURL: png,
                            currentHealth: 12,
                            maxHealth: 15,
                            happiness: 4,
                            hunger: 5,
                            hygiene: 5,
                            age: "1 day",
                            level: 1,
                            attack: 1,
                            defense: 1,
                            speed: 1,
                            intelligence: 1,
                            inventory: [4, 5, 6]
                        };
                        $http.post('/tamagotchi', newPet).success(function(data) {
                            console.log("attempting http.post");
                            $scope.currentTamagotchi = data;
                            console.log("posted a new user");
                            alert("Completed registration. Redirecting to login page");
                            window.location.replace("/");
                        });

                        //};
                    }
                }
            });
        }
    }
}
//             // for (var user in data) {
//             //     console.log("made it to the ajax call");
//             //     user = data[user];
//             //     console.log("Data from database: " + user.username);
//             //     if (user.username != undefined) {
//             //         alert("That username is already taken. Please choose a different username");
//             //     }
//             //     else {
//             //         console.log("username is valid, continuing");
//             //         $scope.currentTamagotchi = {};
//             //         $scope.addPet = function() {
//             //             var newPet = {
//             //                 username: currUsername,
//             //                 petName: currPetName,
//             //             };
//             //             $http.post('/tamagotchi', newPet).success(function(data) {
//             //                 $scope.currentTamagotchi = data;
//             //                 console.log("posted a new user");
//             //             });
//             //         };
//             //         console.log("Completed registration. Redirecting to login page");
//             //         window.location.replace("/index");
//             //     }
//             // }
//         }

//     });

//         }

//     };
// }
