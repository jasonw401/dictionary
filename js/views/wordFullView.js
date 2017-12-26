define(['underscore','backbone', 
  'text!templates/wordFullViewTemplate.html',
  'router/router'],

    function( _, Backbone, wordFullViewTemplate, router) {


    var WordFullView = Backbone.View.extend({
      el: '#mainApp',

      cur_index: 0,

      template: _.template(wordFullViewTemplate),

      render: function(word){
        if(typeof word == 'undefined'){
          this.model.fetchByIndex(this.cur_index, 1, null, this.renderFullWord.bind(this));
          //this.$el.html(this.template(word));          
        }else{
          this.renderFullWord(word);
        }
console.log('rendor home view...');
        return this; // enable chained calls
      },

      renderFullWord: function(word){
        this.$el.html(this.template(word.attributes));
      },

      initialize: function(){
        //this.word = window.pa.getCurrentWord();
        //this.model.fetch({'index': this.cur_index});
        //this.render();
      },

      events: {
        'click #prev': 'showPrevWord',
        'click div#next-red':  'showNextWord',
        'click div#next-orange':  'showNextWord',
        'click div#next-green':  'showNextWord',
        'click #prev2': 'showPrevLetterGroup',
        'click #next2':  'showNextLetterGroup'
      },

      showNextWord: function(e){
        e.preventDefault();
        var status = 0;
        var color = e.currentTarget.id;
        if(color == 'next-green'){
            status = 2;
        }else if(color == 'next-orange'){
            status = 1;

        }else{
          //red
            status = 0;
        }

        this.model.models[this.cur_index].attributes.status = status;
        this.model.models[this.cur_index].save({'status' : status});

//console.log('clicked ' + color + ' word: ' + JSON.stringify(this.model.models[this.cur_index].attributes));
          this.cur_index ++;
          if(this.cur_index > this.model.models.length - 1)
            this.cur_index = this.model.models.length - 1;
          //window.pa.router.navigate('next', true);
            //Backbone.history.loadUrl();
            //return false;
            this.render();
      },

      showPrevWord: function(e){
        e.preventDefault();
console.log('clicked prev...');
          this.cur_index --;
          if(this.cur_index < 0)
            this.cur_index = 0;
          //window.pa.router.navigate('', true);
            //Backbone.history.loadUrl();
            //return false;
                    this.render();

      },

      showNextLetterGroup: function(e){

        e.preventDefault();
          this.cur_index = this.model.getIndexOfNextLetter(this.cur_index);

          this.render();
      },

      showPrevLetterGroup: function(e){
        e.preventDefault();

          this.cur_index = this.model.getIndexOfPrevLetter(this.cur_index);

                    this.render();

      }
    });

    return WordFullView;

});