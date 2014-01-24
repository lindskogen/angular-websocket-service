'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
// angular.module('pickControl.services', [function () {

// }]);

angular.module('pickControl.services', []).
    factory('websocket', function() {
        var websocket, make_message, parse_message, con;
        make_message = function (topic, body) {
            return topic + " " + JSON.stringify(body);
        }
        parse_message = function (msg) {
            var topic, body, parts;
            parts = msg.split(" ", 1);
            topic = parts[0];
            body = JSON.parse(msg.substring(topic.length + 1));
            return {"topic": topic, "body": body};
        }
        con = new window.WebSocket("ws://automation.azurestandard.com:9000/bin");
        con.onerror = function (error) {
            console.log("WebSocket Error " + error);
        };

        // Log messages from the server
        con.onmessage = function (msg) {
            var parsed;
            parsed = parse_message(msg.data);
            //Call registered handlers then
            $scope.$apply();
        };

        websocket = {
            emit: function (topic, body) {
                console.log(topic);
                console.log(body);
            },
            register: function (topic, func) {
            },
            send: function (msg) {
            },
            make_message: function (topic, body) {
            },
        }
        //factory function body that constructs websocket
        return websocket;
    });
