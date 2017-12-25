define(['underscore','backbone', 
  'text!templates/listViewTemplate.html',
  'views/wordView'],
    function( _, Backbone, listViewTemplate, WordView) {

    // renders the full list of todo items calling TodoView for each one.
   var ListView = Backbone.View.extend({
      el: '#mainApp',
      template: _.template(listViewTemplate),
      curPage: 0,
      wordsPerPage: 20,
      //data: new WordList(),
      initialize: function () {
        //this.data.fetch(); // Loads list from local storage
        //console.log("ListView fetch data...");
        //this.model.fetch({
                          //'startIndex': this.curPage * this.wordsPerPage,
                          //'endIndex':   this.curPage * this.wordsPerPage + this.wordsPerPage});
      },
      render: function(statusFilter){
        console.log("ListView reder ...");

        this.$el.html(this.template());

        if(typeof statusFilter == 'undefined'){
          statusFilter = null;
        }
        this.model.fetchByIndex(this.curPage * this.wordsPerPage,
          this.wordsPerPage, statusFilter, this.addOne);
        
        //list.forEach(this.addOne);

        return this; // enable chained calls
      },
      events: {
      
      },

      fetchSuccess: function (collection, response) {
          console.log('Collection fetch success', response);
          console.log('Collection models: ', collection.models);
      },

      fetchError: function (collection, response) {
          throw new Error("Books fetch error");
      },

      addOne: function(word){
        var view = new WordView({model: word.attributes});
        //console.log(JSON.stringify(word.attributes));
        $('#WordList').append(view.render().el);
    	
      },

      events: {
        'click #prevPage': 'showPrevPage',
        'click #nextPage':  'showNextPage'
      },


      showNextPage: function(e){
        e.preventDefault();
console.log('clicked next...');
          this.curPage ++;
          if(this.curPage > this.model.models.length/this.wordsPerPage -1)
            this.cur_index = this.model.models.length/this.wordsPerPage -1;
          //window.pa.router.navigate('next', true);
            //Backbone.history.loadUrl();
            //return false;
            this.render();
      },

      showPrevPage: function(e){
        e.preventDefault();
console.log('clicked prev...');
          this.curPage --;
          if(this.curPage < 0)
            this.curPage = 0;
          //window.pa.router.navigate('', true);
            //Backbone.history.loadUrl();
            //return false;
                    this.render();

      }
    });

   return ListView;
});