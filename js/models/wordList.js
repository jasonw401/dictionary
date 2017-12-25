/**
* Copyright 2013 FUJITSU LIMITED
*/
define(['backbone', 'store', 'models/word', 'models/dictionary'], 

  function(Backbone,Store, Word, Dictionary) {
  var WordList = Backbone.Collection.extend({
    
    model: Word,

    //dictionary: new Dictionary(),

    localStorage: new Store("GA_Words"),

    keys: [],

    initialize: function(){
      
    },


    fetchError: function (collection, response) {
        throw new Error("Books fetch error");
    },


    fetchDictFailure: function(model, response, options){

        console.log('wordlist initialized failed'); 
    },

    getIndexOfFirstLetter(curLetter){
      for(var i = 0; i < this.keys.length; i++){
        var nextLetter = this.keys[i].slice(0,1);
        if(nextLetter == curLetter){
          return i;
        }
      }
      return 0;
    },

    getIndexOfNextLetter(index){
      var curLetter = this.keys[index].slice(0,1);
      for(var i = index + 1; i < this.keys.length; i++){
        var nextLetter = this.keys[i].slice(0,1);
        if(nextLetter != curLetter){
          return i;
        }
      }
      return index;
    },

    getIndexOfPrevLetter(index){
      var curLetter = this.keys[index].slice(0,1);
      for(var i = index + 1; i > 0; i--){
        var nextLetter = this.keys[i].slice(0,1);
        if(nextLetter != curLetter){
          return this.getIndexOfFirstLetter(nextLetter)
          //return i;
        }
      }
      return index;
    },

    sliceModel: function(self, startIndex, numPerPage, statusFilter, listCallBack){

      var wordList = [];
      if(statusFilter != null){
//var musketeers = friends.where({job: "Musketeer"});
        var filtered = self.where({'status': statusFilter});
        wordList = filtered.slice(startIndex, startIndex + numPerPage);

      }else{
        wordList = self.models.slice(startIndex, startIndex + numPerPage);
      }
      
      
      console.log('Range: ' + startIndex + " - items per page: " + numPerPage +'; Collection parsed: ', wordList.length);
      wordList.forEach(listCallBack);

    },

    fetchByIndex: function(startIndex, numPerPage, statusFilter, listCallBack){

      var self = this;
      this.fetch({
            success: function(collection, response,options){
              console.log('Collection fetch success', response);
              console.log('Collection models: ', collection.models);
              if(response.length == 0){
                
                new Dictionary().fetch({
                      success: function(collection, response, options){
                        self.keys = Object.keys(response).sort();

                        for(var id = 0; id < self.keys.length; id ++){
                          var word = response[self.keys[id]];
                          word.id = id;
                          word.status = 0;
                          self.create(word);
                        }
                        console.log('wordlist loaded from dictionary; last id: ' + id); 
                        self.sliceModel(self, startIndex, numPerPage, statusFilter, listCallBack);
                      },
                      error: self.fetchDictFailure,
                  });         
                  
                }else{
                  console.log('wordlist loaded from localStorage: ' + response.length); 
                  self.sliceModel(self, startIndex, numPerPage, statusFilter, listCallBack);
                }

            },
            error: this.fetchFailure
        });

    },

  });

  return WordList;
});