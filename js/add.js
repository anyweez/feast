window.addEventListener('load', function() {
    var validators = require('./shared/validation');
    var fridge = require('./shared/foods');
    
    var foodName = document.getElementById('food-name');
    var foodExpiration = document.getElementById('food-expiration');
    var foodOrigin = document.getElementById('food-origin');
    var submitFood = document.getElementById('submit-food');
    var enragedWarning = document.getElementById('enraged');
    
    foodName.addEventListener('blur', function() {
        // If valid, remove the 'ohno' class
        if (validators.text(foodName.value)) {
            foodName.classList.remove('ohno');
        // If invalid, add the 'ohno' class
        } else {
            foodName.classList.add('ohno');
        }
    });
    
    foodExpiration.addEventListener('blur', function() {
        // If valid, remove the 'ohno' class
        if (validators.date(foodExpiration.value)) {
            foodExpiration.classList.remove('ohno');
        // If invalid, add the 'ohno' class
        } else {
            foodExpiration.classList.add('ohno');
        }
    });
    
    foodOrigin.addEventListener('blur', function() {
        // If valid, remove the 'ohno' class
        if (validators.text(foodOrigin.value)) {
            foodOrigin.classList.remove('ohno');
        // If invalid, add the 'ohno' class
        } else {
            foodOrigin.classList.add('ohno');
        }
    });
    
    submitFood.addEventListener('click', function() {
       console.log('works');
        // Validate all fields
        if (validators.text(foodName.value) && 
            validators.date(foodExpiration.value) && 
            validators.text(foodOrigin.value)) {
            
            enragedWarning.classList.add('hidden');
            
            // Submit to Firebase
            fridge.add({
                name: foodName.value,
                expiration: foodExpiration.value,
                origin: foodOrigin.value,
            }, function() {
                console.log('success!');
                foodName.value = '';
                foodExpiration.value = '';
                foodOrigin.value = '';
                
                window.location = 'index.html';
            });
        } else {
            // wreak havoc
            enragedWarning.classList.remove('hidden');
        }
    });
})