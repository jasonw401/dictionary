define(['underscore','backbone', 'text!templates/wordViewTemplate.html'],
    function( _, Backbone, wordViewTemplate) {

    var WordView = Backbone.View.extend({
      tagName: 'tr',

      template: _.template(wordViewTemplate),

      render: function(){

        this.$el.html(this.template({
          'text' : this.model.text, 
          'meanings' : this.model.meanings,
          'status' : this.model.status
        }));
        return this; // enable chained calls
      },

      initialize: function(){
        //this.render();
      },

      events: {
      },

    });

    return WordView;

});