window.addEventListener('load', function() {
    // Callback function that renders foods as they come in.
    var generator = _.template(document.getElementById('food-template').textContent);
    var parent = document.getElementById('food-items');
    
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
        
        $(el).draggable({
            revert: true,
        });
        // make them draggable
    }
        
    var fridge = require('./shared/foods');
    fridge.onLoad(renderChild);
    
    $('#in-stock').droppable({
        drop: function(event, details) {
            var id = parseInt(details.draggable.attr('id').substr(5));            
            // get food with id of `id`
            var food = fridge.get(id);
            // set food.inStock to either true or false
            food.inStock = true;
            fridge.save(food);
        },
    });
    
    $('#out-of-stock').droppable({
        drop: function(event, details) {
            var id = parseInt(details.draggable.attr('id').substr(5));
            // get food with id of `id`
            var food = fridge.get(id);
            
            // set food.inStock to either true or false
            food.inStock = false;            
            fridge.save(food);
        },
    });

});