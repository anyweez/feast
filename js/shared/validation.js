module.exports = (function() {
    var textPattern = new RegExp('[A-Za-z -]{2,}');
    var datePattern = new RegExp('[0-9]{2}/[0-9]{4}');
    
    return {
        text: function(string) {
            return textPattern.test(string);
        },
    
        date: function(string) {
            return datePattern.test(string);
        }
    };
})();
    
    
    