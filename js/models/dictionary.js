/**
* Copyright 2013 FUJITSU LIMITED
*/
define(['backbone', 'models/word'], function(Backbone, Word) {
  var Dictionary = Backbone.Model.extend({
    
    //model: Word,

    urlRoot: '/data/ALL.json',
    data: null,

    initialize: function(){
      //this.fetch();
      //console.log('dict fectched. ... ')
    },

    getWord: function(index){
      return this.models[index];
    },

    getWordList: function(startIndex, endIndex){

      var wordList = this.models.slice(startIndex, endIndex);

      console.log('Range: ' + startIndex + " - " + endIndex +'; Collection parsed: ', wordList.length);

      return wordList;

    },

    parse: function (data, options) {
/*
      for(var key in data){
        this.models.push(data[key]);
      }
  */
      this.data = data;
      console.log('dict parsed: ' + Object.keys(data).length);

      //return this.models;
    },

    });

    return Dictionary;
});