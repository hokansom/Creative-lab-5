/* global angular */
angular.module('app', []);
angular.module('app').controller('mainCtrl', mainCtrl);
angular.module('app').directive('petBar', petBar);
angular.module('app').directive('navBar', navBar);

function mainCtrl($scope, $http) {
    var currUsername = sessionStorage.getItem("name");
    console.log("Current User: " + currUsername);

    var myObj = { username: currUsername };
            console.log(myObj);
            var url = "sessionQuery";
            $.ajax({
                url: url,
                type: "GET",
                data: myObj,
                contentType: "application/json; charset=utf-8",
                success: function(data, status, jqXHR) {
                    console.log('Found session users data');
                    console.log(data);
                    // Do with the data what you please!
                    angular.copy(data, $scope.myobj);
                    console.log($scope.myobj);
                    
                }
            });
    
    $scope.myobj = {
        username: "test_user_1",
        money: "500",
        petName: "James",
        species: "Kupatchi",
        imageURL: 41,
        currentHealth: 14,
        maxHealth: 15,
        happiness: 6,
        hunger: 7,
        hygiene: 5,
        age: "3 minutes",
        level: 1,
        attack: 4,
        defense: 3,
        speed: 2,
        intelligence: 1,
    };
    
    /*Functions for play, tickle, and walk*/
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
                }
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
    
    /* arrays for representing stats as strings */
    $scope.moods = ["explosive", "irate", "gloomy", "grumpy", "apathetic", "content", "happy", "idyllic", "blissful"];
    $scope.hungers = ["dying", "starving", "hungry", "peckish", "okay", "satisfied", "full", "stuffed", "bursting"];
    $scope.hygienes = ["squalid", "grody", "fleas", "dirty", "acceptable", "clean", "groomed", "shiny", "sparkling"];
    $scope.speeds = ["immobile", "snail", "sluggish", "slow", "average", "fast", "speedy", "zippy", "lightning"];
    $scope.intelligences = ["vapid", "sluggish", "foolish", "slow", "5th grade", "clever", "smart", "genius", "enlightened"];
    $scope.attacks = ["groveling", "soggy", "weak", "Switzerland", "passable", "strong", "machine gun", "tornado", "Chuck Norris"];
    $scope.defenses = ["waiflike", "frail", "paper-thin", "weak", "survivable", "armadillo", "iron wall", "tank", "nuclear bunker"]
}

function petBar() {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "/directives/pet-bar-directive.html";
    return directive;
}

function navBar() {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "/directives/nav-bar-directive.html";
    return directive;
}


