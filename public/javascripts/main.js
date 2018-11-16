$(document).ready(function() {
    $scope.currentTamagotchi = {};
    $scope.addPet = function() {
        var newPet = {
            username: $scope.user-name,
            petName: $scope.user-pet,
            species: $scope.user-species,
        };
        $scope.formContent = '';
        $scope.tamagotchis.push(newPet);
    };
    $scope.feed = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/feed')
            .success(function(data) {
                console.log("feed worked");
                if (tamagotchi.hunger < 8) {
                    tamagotchi.hunger += 1;
                }
                if (tamagotchi.currentHealth < tamagotchi.maxHealth) {
                    tamagotchi.currentHealth += 1;
                }

            });

    };
    $scope.buy = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/buy')
            .success(function(data) {
                console.log("buy worked");
                tamagotchi.hunger -= 10;

            });
    };
    $scope.read = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/read')
            .success(function(data) {
                console.log("read worked");
                if (tamagotchi.intelligence < 8) {
                    tamagotchi.intelligence += 1;
                }
                if (tamagotchi.intelligence > 5) { //Some kind of function to change the level
                    tamagotchi.level += 1;
                }
            });
    };
    $scope.play = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/play')
            .success(function(data) {
                console.log("play worked");
                if(tamagotchi.mood < 8){
                    tamagotchi.mood += 1;
                }
                if(tamagotchi.health < tamagotchi.maxHealth){
                    tamagotchi.health += 1;
                }
            });
    };
    
    $scope.walk = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/walk')
            .success(function(data) {
                console.log("walk worked");
                if (tamagotchi.currentHealth < tamagotchi.maxHealth) {
                    tamagotchi.currentHealth += 1;
                }
                if (tamagotchi.hygiene > 1) {
                    tamagotchi.hygiene -= 1;
                }
                if (tamagotchi.hunger > 0) {
                    tamagotchi.hunger -= 1;
                };
                if (tamagotchi.speed < 8) {
                    tamagotchi.speed += 1;
                }

            });
    };
    $scope.tickle = function(tamagotchi) {
        $http.put('/tamagotchi/' + tamagotchi._id + '/tickle')
            .success(function(data) {
                console.log("tickle worked");
                tamagotchi.money += 5;
                tamagotchi.mood += 1;
                tamagotchi.hunger -= 1;

            });
    };

    $scope.getStats = function(tamagotchi) {
        return $http.get('/tamagotchi/' + tamagotchi._id).success(function(data) {
            angular.copy(data, $scope.tamagotchi);
        })
    }
});


// /*Adds a new user and pet */
// $("#insert").click(function() {
//     var myobj = {
//         username: $scope.username,
//         petName: $scope.petName,
//         species: $scope.species,
//     };
//     jobj = JSON.stringify(myobj);
//     $("#json").text(jobj);
//     var url = "/insert";
//     $.ajax({
//         url: url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data, textStatus) {
//             $("#done").html(textStatus);
//         }
//     })
// });
// /*Updates pet stats.*/
// $("#update").click(function() {
//     updateInfo();
// });
// /*Returns the data*/
// $("#getData").click(function() {
//     var name = currentUser;
//     var URL = "/get-data";
//     $.getJSON(URL, function(data) {
//         console.log(data);
//         /* Do something with the returned data
//         var everything = "<ul>";
//         for (var comment in data) {
//             com = data[comment];
//             everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
//         }
//         everything += "</ul>";
//         $("#comments").html(everything);*/
//     })
//     //$("#json").html("");
//     //$('#commentForm')[0].reset();
// })
// $("#deletePet").click(function() {
//     var url = "/delete";
//     var item = {
//         username: $("#name").val(),
//     }
//     jobj = JSON.stringify(item);
//     $.ajax({
//         url: url,
//         type: "DELETE",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data, textStatus) {
//             console.log("deleted a pet");
//         }
//     })
// })


// function updateInfo() {
//     var myobj = {
//         username: $scope.username,
//         pet: $scope.petName,
//         imageURL: $scope.petImage,
//         money: $scope.money,
//         mood: $scope.mood,
//         health: $scope.health,
//         hunger: $scope.hunger,
//         hygiene: $scope.hygiene,
//         intelligence: $scope.intelligence,
//         level: $scope.level,
//         inventory: $scope.inventory,
//         age: $scope.age
//     };
//     jobj = JSON.stringify(myobj);
//     $("#json").text(jobj);
//     var url = "/update";
//     $.ajax({
//         url: url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data, textStatus) {
//             $("#done").html(textStatus);
//         }
//     });
// }

// function getInfo() {
//     var name = currentUser;
//     var URL = "/get-data";
//     $.getJSON(URL, function(data) {
//         console.log(data);
//         /* Do something with the returned data
//         var everything = "<ul>";
//         for (var comment in data) {
//             com = data[comment];
//             everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
//         }
//         everything += "</ul>";
//         $("#comments").html(everything);*/
//     });
// }
