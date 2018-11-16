angular.module('app', []);
angular.module('app').controller('inventoryCtrl', ['$scope', '$http', function($scope, $http) {

    console.log("Arrived in Inventory JS file");
    console.log("Checking sessionStorage...");

    var foodItems = [{
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
            url: "resources/food/food9.gif",
            cost: 1000,
            hungerRefill: 10
        },
    ];

    $scope.inventory = [];
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
            var inventoryArray = [];
            // inventoryArray = data.inventory;
            inventoryArray.push(1);
            inventoryArray.push(1);
            inventoryArray.push(2);
            
            console.log("Current Inventory: " + inventoryArray);
            
            for (var i = 0; i < inventoryArray.length; i++) {
                var food = foodItems[inventoryArray[i]];
                console.log(food);
                $scope.inventory.push(food);
            }
            console.log($scope.inventory);
        }
    });


}]);
