'use strict';

/* Services */

var websocket = angular.module('websocket', []);

websocket.
    factory('websocket', ['$rootScope', function($rootScope) {
        var ws, make_message, parse_message, Service;
        ws = new window.WebSocket("ws://automation.azurestandard.com:9000");

        ws.onopen = function () {
            console.log("Socket has been opened");
        }

        ws.onerror = function (error) {
            console.log("WebSocket Error " + error);
        };

        // Log messages from the server
        ws.onmessage = function (msg) {
            var parsed;
            parsed = parse_message(msg.data);
            //Call registered handlers then
            $rootScope.$apply();
        };

        make_message = function (topic, body) {
            return topic + " " + JSON.stringify(body);
        };

        parse_message = function (msg) {
            var topic, body, parts;
            parts = msg.split(" ", 1);
            topic = parts[0];
            body = JSON.parse(msg.substring(topic.length + 1));
            return {"topic": topic, "body": body};
        };

        // We return this object to anything injecting our service
        Service = {
            emit: function (topic, body) {
                this.send(make_message(topic,body));
            },

            register: function (topic, func) {
            },

            make_message: make_message,
            send: ws.send
        }

        return Service;
    }]);
