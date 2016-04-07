window.addEventListener('load', function() {
    // Callback function that renders foods as they come in.
    var generator = _.template(document.getElementById('food-template').textContent);
    var parent = document.getElementById('food-list');
    
    // Use HTML template to render the child to the DOM
    function renderChild(food) {
        var html = generator({
            food: food,
        });
        
        var el = document.createElement('div');
        el.classList.add('food');
        el.setAttribute('id', 'food-' + food.id);
        
        el.innerHTML = html;
        parent.appendChild(el);
    }
    
    var fridge = require('./shared/foods');
    fridge.onLoad(renderChild);
    
    // Soon we'll have an array of stuff (i'm going to store in a module)
    var searchField = document.getElementById('search');
    var searchBtn = document.getElementById('search-btn');
    searchField.addEventListener('keyup', function() {
        var query = searchField.value;
        var regexp = new RegExp(query);
        
        var foods = fridge.all();
        for (var i = 0; i < foods.length; i++) {
            var el = document.getElementById('food-' + foods[i].id);
            
            if (regexp.test(foods[i].name)) {
                // find the element representing this food
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
});