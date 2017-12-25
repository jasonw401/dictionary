/**
* Copyright 2013 FUJITSU LIMITED
*/
define(['backbone'], function(Backbone) {

    var Word = Backbone.Model.extend({

		defaults: {
			id: '',
			text: '',
			meanings: [],
			status: 0
		},
    });

    return Word;
});