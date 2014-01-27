'use strict';

/* Services */

var websocket = angular.module('websocket', []);

websocket.
    factory('websocket', ['$rootScope', function($rootScope) {
        var ws, make_message, parse_message, dispatch, Service;

        //Websocket setup
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
            dispatch.handle(parsed.topic, parsed.body)
            $rootScope.$apply();
        };


        //dispatch
        dispatch = {
            //TODO underscore has handy functions to treat arrays as
            //sets. Maybe clearer then this.
            listeners: {},
            register: function (topic, func) {
                var current;
                topic = topic.toLowerCase();
                current = this.listeners[topic] || [];
                current.push(func);
                this.listeners[topic] = _.unique(current, false, toString);
            },
            deRegister: function (topic, func) {
                this.listeners['topic'] = _.reject(
                    this.listeners['topic'], function (el) {
                        return el.toString() === func.toString();
                    });
            },
            handle: function (topic, body) {
                var key, interested;
                interested = [];
                _.each(_.keys(this.listeners), 
                       function (key) {
                           if (key.indexOf(topic) === 0) {
                               interested.push(this.listeners[key])
                           }
                       },
                       this
                      );
                _.map(_.unique(_.flatten(interested), false, toString), function (item) {
                    item(topic, _.extend(body));
                });
            }
        }


        // Utilities
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
                dispatch.register(topic, func);
            },

            make_message: function (topic, body) {
                return make_message(topic, body);
            },

            send: function (msg) {
                ws.send(msg);
            }
        }

        return Service;
    }]);
