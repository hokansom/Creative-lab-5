var mongoose = require('mongoose');
var petSchema = new mongoose.Schema({
    username: String,
    money: { type: Number, default: 500 },
    petName: String,
    species: String,
    imageURL: { type: Number, default: 55 },
    currentHealth: { type: Number, default: 12 },
    maxHealth: { type: Number, default: 15 },
    happiness: { type: Number, default: 6 },
    hunger: { type: Number, default: 7 },
    hygiene: { type: Number, default: 5 },
    age: { type: String, default: "1 day" },
    level: { type: Number, default: 1 },
    attack: { type: Number, default: 1 },
    defense: { type: Number, default: 1 },
    speed: { type: Number, default: 1 },
    intelligence: { type: Number, default: 1 },
    inventory: [Number]
});

petSchema.methods.buy = function(data, cb) {
    var priceInflation = data * 100;
    console.log("Purchase: " + priceInflation);
    if (this.money >= priceInflation) {
        this.money -= priceInflation; //update this to be a specific price.
    }
    console.log("New Balance for User: " + this.money);

    this.inventory.push(data - 1);
    console.log(this.inventory);
    this.save(cb);
};


petSchema.methods.consume = function(data, cb) {

    var index = data - 1;
    var pos = -1;
    for (var i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i] == index) {
            pos = i;
        }
    }
    
    if (pos != -1) {
        this.inventory.splice(pos, 1);
    }
    
    console.log(this.inventory);


    this.save(cb);
};

petSchema.methods.increaseSpeed = function(cb) {
    if (this.speed < 8) {
        this.speed += 1;
    }
    this.save(cb);
};

petSchema.methods.play = function(cb) {
    if (this.happiness < 8) {
        this.happiness += 1;
    }
    if (this.health < this.maxHealth) {
        this.health += 1;
    }
    if (this.hygiene < 8) {
        this.hygiene += 1;
    }
    if (this.attack < 8) {
        this.attack += 1;
    }
    if (this.defense > 0) {
        this.defense -= 1;
    }
    this.save(cb);
};

petSchema.methods.feed = function(cb) {
    if (this.hunger < 8) {
        this.hunger += 1;
    }
    if (this.currentHealth < this.maxHealth) {
        this.currentHealth += 1;
    }
    else {
        this.currentHealth -= 2;
    }
    if (this.speed > 0) {
        this.speed -= 1;
    }
    this.save(cb);
};

petSchema.methods.tickle = function(cb) {
    this.money += 5;
    if (this.happiness < 8) {
        this.happiness += 1;
    }
    if (this.hunger > 0) {
        this.hunger -= 1;
    }
    if (this.attack > 0) {
        this.attack -= 1;
    }


    this.save(cb);
};

petSchema.methods.walk = function(cb) {
    if (this.currentHealth < 8) {
        this.currentHealth += 1;
    }
    else {
        this.currentHealth = this.maxHealth;
    }
    if (this.hunger >= 1) {
        this.hunger -= 1;
    }
    else {
        this.hunger = 0;
    }
    if (this.hygiene > 1) {
        this.hygiene -= 1;
    }
    if (this.speed < 8) {
        this.speed += 1;
    }
    if (this.speed < 8) {
        this.speed += 1;
    }
    this.save(cb);
};

petSchema.methods.read = function(cb) {
    if (this.intelligence < 8) {
        this.intelligence += 1;
    }
    if (this.intelligence > 5) { //Some kind of function to change the level
        this.level += 1;
    }
    this.save(cb);
};

petSchema.methods.bathe = function(cb) {
    if (this.hygiene < 8) {
        this.hygiene += 1;
    }
    if (this.happiness > 0) {
        this.happiness -= 1;
    }
    if (this.defense < 8) {
        this.defense += 1;
    }
    this.save(cb);
};


mongoose.model('petSchema', petSchema);
