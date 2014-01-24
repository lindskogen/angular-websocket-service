'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
// angular.module('pickControl.services', [function () {
    
// }]);

angular.module('pickControl.services', []).
    factory('websocket', function() {
        var websocket = {
            emit: function (topic, body) {
                console.log(topic);
                console.log(body);
            },            
        }
        //factory function body that constructs websocket
        return websocket;
    });
