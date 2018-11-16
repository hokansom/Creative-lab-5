/* global angular */
angular.module('app', []);
angular.module('app').controller('mainCtrl', mainCtrl);
angular.module('app').directive('petBar', petBar);
angular.module('app').directive('navBar', navBar);
angular.module('app').directive('instructions', instructions);

function mainCtrl($scope, $http) {
    var userID;
    var currUsername = sessionStorage.getItem("name");
    console.log("Current User: " + currUsername);

    $scope.activePet = {};
    $scope.myobj = {};


    $scope.fetchPet = function() {
        var myQuery = { username: sessionStorage.getItem("name") };
        console.log(myQuery);
        var url = "sessionQuery";


        $.ajax({
            url: url,
            type: "GET",
            data: myQuery,
            contentType: "application/json; charset=utf-8",
            success: function(data, status, jqXHR) {
                console.log('Found session users data:');
                console.log(data);
                // Do with the data what you please!
                $scope.activePet = data[0];
                userID = data[0]['_id'];
                console.log("Your unique ID: " + userID);
                angular.copy(data[0], $scope.myobj);
                angular.copy(data[0], $scope.activePet);

                // $scope.myobj = data[0];
                console.log("activePet:");
                console.log($scope.activePet);
                console.log("myobj in ajax");
                console.log($scope.myobj);
                $scope.$digest();
                //$scope.pets.push(data);
            }
        });
        console.log("myobj outside of ajax:");
        console.log($scope.myobj);
    }
    $scope.fetchPet();
    console.log("activePet outside of http");
    console.log($scope.activePet);
    // console.log("myobj outside of http");
    // console.log("myobj: " + $scope.myobj);

    /*Functions for play, tickle, and walk*/
    $scope.play = function(tamagotchi) {
        $http.put('/tamagotchi/' + userID + '/play')
            .success(function(data) {
                console.log("play worked");
                if (tamagotchi.happiness < 8) {
                    tamagotchi.happiness += 1;
                }
                if (tamagotchi.health < tamagotchi.maxHealth) {
                    tamagotchi.health += 1;
                }
                if (tamagotchi.hygiene < 8) {
                    tamagotchi.hygiene += 1;
                }
                if (tamagotchi.attack < 8) {
                    tamagotchi.attack += 1;
                }
                if (tamagotchi.defense > 0) {
                    tamagotchi.defense -= 1;
                }
            });
    };
    $scope.walk = function(tamagotchi) {
        $http.put('/tamagotchi/' + userID + '/walk')
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
                if (tamagotchi.intelligence < 8) {
                    tamagotchi.intelligence += 1;
                }
            });
    };
    $scope.tickle = function(tamagotchi) {
        $http.put('/tamagotchi/' + userID + '/tickle')
            .success(function(data) {
                console.log("tickle worked");
                tamagotchi.money += 5;
                if (tamagotchi.happiness < 8) {
                    tamagotchi.happiness += 1;
                }
                if (tamagotchi.hunger > 0) {
                    tamagotchi.hunger -= 1;
                }
                if (tamagotchi.attack > 0) {
                    tamagotchi.attack -= 1;
                }
            });
    };
    $scope.bathe = function(tamagotchi) {
        $http.put('/tamagotchi/' + userID + '/bathe')
            .success(function(data) {
                console.log("bathe worked");
                if (tamagotchi.hygiene < 8) {
                    tamagotchi.hygiene += 1;
                }
                if (tamagotchi.happiness > 0) {
                    tamagotchi.happiness -= 1;
                }
                if (tamagotchi.defense < 8) {
                    tamagotchi.defense += 1;
                }
            });
    };

    /* arrays for representing stats as strings */
    $scope.moods = ["explosive", "irate", "gloomy", "grumpy", "apathetic", "content", "happy", "idyllic", "blissful"];
    $scope.hungers = ["dying", "starving", "hungry", "peckish", "okay", "satisfied", "full", "stuffed", "bursting"];
    $scope.hygienes = ["squalid", "grody", "fleas", "dirty", "acceptable", "clean", "groomed", "shiny", "sparkling"];
    $scope.speeds = ["immobile", "snail", "sluggish", "slow", "average", "fast", "speedy", "zippy", "lightning"];
    $scope.intelligences = ["vapid", "sluggish", "foolish", "slow", "5th grade", "clever", "smart", "genius", "enlightened"];
    $scope.attacks = ["groveling", "soggy", "weak", "Switzerland", "passable", "strong", "machine gun", "tornado", "Chuck Norris"];
    $scope.defenses = ["waiflike", "frail", "paper-thin", "weak", "survivable", "armadillo", "iron wall", "tank", "nuclear bunker"];

    /* array of items in the game */
    $scope.foodItems = [{
            name: "Beans",
            index: 1,
            url: "resources/food/food1.gif",
            cost: 100,
            hungerRefill: 1
        },
        {
            name: "Chocolate Chip Cookies",
            index: 2,
            url: "resources/food/food2.gif",
            cost: 200,
            hungerRefill: 2
        },
        {
            name: "Chicken",
            index: 3,
            url: "resources/food/food3.gif",
            cost: 300,
            hungerRefill: 3
        },
        {
            name: "Bread",
            index: 4,
            url: "resources/food/food4.gif",
            cost: 400,
            hungerRefill: 4
        },
        {
            name: "Cheese",
            index: 5,
            url: "resources/food/food5.gif",
            cost: 500,
            hungerRefill: 5
        },
        {
            name: "Chocolate Popsicle",
            index: 6,
            url: "resources/food/food6.gif",
            cost: 600,
            hungerRefill: 6
        },
        {
            name: "Tuna Sandwich",
            index: 7,
            url: "resources/food/food7.gif",
            cost: 700,
            hungerRefill: 7
        },
        {
            name: "Bagel with scrambled eggs",
            index: 8,
            url: "resources/food/food8.gif",
            cost: 800,
            hungerRefill: 8
        },
        {
            name: "Brownies",
            index: 9,
            url: "resources/food/food9.gif",
            cost: 900,
            hungerRefill: 9
        },
        {
            name: "Sushi Platter",
            index: 10,
            url: "resources/food/food10.gif",
            cost: 1000,
            hungerRefill: 10
        },
    ];

    $scope.inventory = [];
    var inventoryArray = [];
    var objArray = [];

    $scope.fetchInventory = function() {
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

                console.log("Begin extraction of inventory");
                inventoryArray = [];
                inventoryArray = data[0]['inventory'];
                userID = data[0]['_id'];


                console.log("Current Inventory: " + inventoryArray);

                for (var i = 0; i < inventoryArray.length; i++) {
                    var food = $scope.foodItems[inventoryArray[i]];
                    food.posInArray = i;
                    console.log(food);
                    objArray.push(food);
                }
                console.log(objArray);
                angular.copy(objArray, $scope.inventory);
                console.log("Presenting Scope:");
                console.log($scope.inventory);
                $scope.$digest();
            }
        });
    };


    $scope.fetchInventory();

    $scope.feedItem = function(item, tamagotchi) {
        console.log("Feeding " + item.index + " times");
        console.log("Current user id: " + userID);
        for (var i = 0; i < item.index; i++) {
            $http.put('/tamagotchi/' + userID + "/feed")
                .success(function(data) {
                    if (tamagotchi.hunger < 8) {
                        tamagotchi.hunger += 1;
                    }
                    if (tamagotchi.currentHealth < tamagotchi.maxHealth) {
                        tamagotchi.currentHealth += 1;
                    }
                    else {
                        tamagotchi.currentHealth -= 2;
                    }
                    if (tamagotchi.speed > 0) {
                        tamagotchi.speed -= 1;
                    }
                    console.log("Fed");
                });
        }

        console.log("Splicing");
        $scope.inventory.splice(item.posInArray, 1);
        $http.put("/tamagotchi/" + userID + "/consume/" + food.index)
                    .success(function(data) {
                        console.log("Consumed");
                    });
        for (var i = 0; i < $scope.inventory.length; i++) {
            console.log("Adjust: " + $scope.inventory[i]);
            $scope.inventory[i].posInArray = i;
        }
        tamagotchi.inventory = $scope.inventory;
        $http.put("/tamagotchi/" + userID + "/updateInventory/")
                    .success(function(data) {
                        console.log("update inventory");
                    });
        //$scope.fetchPet();
    };


    $scope.buy = function(food) {
        console.log("Money before: " + $scope.activePet.money);
        if (food.cost > $scope.activePet.money) {
            alert("You do not have enough money to buy this! Tickle your pet to earn Money!");
        }
        else {
            var canAdd = true;
            console.log("Checking inventory for duplicates: " + inventoryArray);
            for (var i = 0; i < inventoryArray.length; i++) {
                console.log("Comparing inventory: " + inventoryArray[i] + " against index: " + (food.index - 1));
                if (inventoryArray[i] == (food.index - 1)) {
                    canAdd = false;
                }
            }
            if (canAdd) {
                var newBalance = $scope.activePet.money - food.cost;
                $scope.activePet.money = newBalance;
                $scope.myobj.money = newBalance;

                $http.put("/tamagotchi/" + userID + "/buy/" + food.index)
                    .success(function(data) {
                        console.log("Purchased");
                    });
            }
            else {
                alert("You may only purchase one of each item!");
            }
        }
        console.log("Money after: " + $scope.activePet.money);
        $scope.fetchInventory();
    };
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

function instructions() {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "/directives/instructions-directive.html";
    return directive;
}
