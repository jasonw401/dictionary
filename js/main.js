require.config({
  paths: {
      text:  'libs/require.text',
      // specify a path to jquery, the second declaration is the local fallback
      jquery: ["libs/jquery-1.10.2"],
      underscore: ["libs/underscore"],
      backbone: ["libs/backbone"],
      store: ["libs/backbone.localStorage"],
      bootstrap: ["libs/bootstrap"],
      popper: ["https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min"],
  },
	
  'shim': {
        'backbone': {
            'deps': [ 'underscore', 'jquery' ],
            'exports': 'Backbone'
        },
        'jquery': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'store': {
            'deps': [ 'backbone'],
            'exports': 'Store'
        },    
		}
});

require([
	"jquery",
	"app"
], function($, App) {
	$(document).ready(function() {
        App.initialize();
    });
});