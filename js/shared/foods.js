module.exports = (function() {
    var Firebase = require('firebase');
    var foods = [];
    var callback = null;

    var db = new Firebase('https://feast-app.firebaseio.com/foods/');
    db.on('child_added', function(snapshot) {
        var newFood = snapshot.val();
        foods.push(newFood);
        
        if (callback !== null) {
            callback(newFood);
        }
    });
    
    return {
        add: function(food, oncomplete) {
            food.id = Math.round(Math.random() * 100000);
            food.inStock = true;
            
            foods.push(food);

            // Sync this to Firebase
            // TODO: make sure that food.id exists somehow
            console.log('saving ', food);
            db.child(food.id).set(food, function (error) {
                if (error) {
                    console.log('uh oh - something awful happened:');
                    console.log(error);
                } else {
                    // If it succeeded...
                    oncomplete();
                }
            });
        },
        all: function() {
            return foods;
        },
        get: function (id) {
            for (var i = 0; i < foods.length; i++) {
                if (foods[i].id === id) {
                    return foods[i];
                }
            }
            
            return null;
        },
        save: function(food) {
            db.child(food.id).set(food);
        },
        onLoad: function (cb) {
            callback = cb;
        }
    };
})();