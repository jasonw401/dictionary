/**
* Copyright 2013 FUJITSU LIMITED
*/

define([
    'jquery',
    'backbone',
    'views/wordFullView',
    'views/topBarView',
    'views/listView',
    'models/dictionary',
    'models/word',
    'models/wordList',
    ],


    function($, Backbone, WordFullView, TopBarView, ListView, Dictionary, Word, WordList) {
    'use strict';


    var Router = Backbone.Router.extend({
        loggedIn: false,
        wordList: new WordList(),
        _currentView: null,
        wordFullView: null,
        listView: null,
        topBarView: new TopBarView(),
        routes: {
            '':'showHomeView',
            'listMode':'showListView',
            'listRed':'showListVRed',
            'listOrange':'showListOrange',
            'listGreen':'showListGreen',
            'singleMode':'showHomeView'
            //'word':'showWordView',

        },

        /* Utility functions */
        setCurrentView:function (view) {
            if (view != this._currentView) {
                if (this._currentView != null && this._currentView.remove != null) {
                    this._currentView.remove();
                }
                this._currentView = new view();
            }
            return this._currentView;
        },

        __showHomeView:function () {
            require([
                'views/wordFullView'
            ], $.proxy(function (HomeView) {
                this.setCurrentView(WordFullView).render();
            }, this));
        },

        showHomeView: function(){

            console.log("show home: CUR_INDEX=" + window.pa.CUR_INDEX);
            if (this.wordFullView == null) {
                this.wordFullView = new WordFullView({model: this.wordList});
                //new TopBarView().render();
                //homeView.off();
            }
            this.wordFullView.render();
            //this.homeView.delegateEvents(); // delegate events when the view is recycled
        },
      
        showListView: function(status){
            //this.showHomeView( );

            var listView = new ListView({model: this.wordList});
            listView.render(status);
            console.log("moving to list page...")
        },

        showListGreen: function(){
            this.showListView(2);
        },
        showListOrange: function(){
            this.showListView(1);
        },
        showListVRed: function(){
            this.showListView(0);
        },

    });

    return Router;
});