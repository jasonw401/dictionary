define(['underscore','backbone', 'text!templates/topBarViewTemplate.html'],
    function( _, Backbone, topBarViewTemplate) {

    var TopBarView = Backbone.View.extend({
      el: '#TopBar',

      template: _.template(topBarViewTemplate),

      render: function(){
        this.$el.html(this.template({}));
        return this; // enable chained calls
      },

      initialize: function(){
        this.render();
      },


      events: {
        'click #listMode': 'showList',
        'click #singleMode':  'showSingleWord',
        'click #listRed': 'showListFilter',
        'click #listOrange': 'showListFilter',
        'click #listGreen': 'showListFilter',

      },

      showList: function(e){
        e.preventDefault();
console.log('clicked listMode...');
          window.pa.router.navigate('listMode', true);
          $('#listMode-li').addClass('active');
          $('#singleMode-li').removeClass('active');

      },
      showSingleWord: function(e){
        e.preventDefault();
console.log('clicked singleMode...');
          $('#singleMode-li').addClass('active');
          $('#listMode-li').removeClass('active');

          window.pa.router.navigate('singleMode', true);

      },
      showListFilter: function(e){
        e.preventDefault();

        var color = e.currentTarget.id;
console.log('clicked showListFilter...' + color);
          window.pa.router.navigate(color, true);

      },
    });

    return TopBarView;

});