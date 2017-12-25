define(['backbone', 'router/router','models/dictionary'],
    function(Backbone, Router, Dictionary) {
        'use strict';

        var loadData = function(){

            return $.ajax({
               url: '/data/ALL.json',
               data: {
                  format: 'json'
               },
               dataType:'json',
               error: function() {
                  $('#error').html('<p>An error has occurred</p>');
               },
               success: function(data) {
                    window.pa.ALL_WORDS = data;
                    window.pa.ALL_KEYS = Object.keys(data);
                    console.log("Current dictionary has " + window.pa.ALL_KEYS.length + " words.");
               },
               type: 'GET'
            });

        }
        var init = function() {
            window.pa = {};
            window.pa.CUR_INDEX = 0;
            window.pa.getCurrentWord = function(){
                var wordText = window.pa.ALL_KEYS[window.pa.CUR_INDEX];
                var word = window.pa.ALL_WORDS[wordText];
                return word;
            };

            $.when(
                //loadData()   
            )
            .then(function(){

            })
            .then(function(){
                console.log("the app is loaded...");
                window.pa.router = new Router();
                Backbone.history.start();            
            })
            .fail(function() {
                console.log( "something went wrong!" );
            }); 

         };

        return {
            'initialize': init
        };
});