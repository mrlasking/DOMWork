DOMWork  [![Build Status](https://travis-ci.org/mrlasking/DOMWork.svg?branch=master)](https://travis-ci.org/mrlasking/DOMWork)
=======

Simple extendible DOM manipulation library. 


###Installation

Run ```npm install``` to install dependencies.

You need to have bower and grunt-cli installed globally, so run ```npm install -g bower grunt-cli```

After that install bower dependencies: ```bower install```

###Grunt commands
You can use ```grunt test``` command to run jshint and jasmine tests.

Also you can use ```grunt coverage``` command to view tests code coverage.

####Building
If you want to build production and minified version with all plugins, use ```grunt build``` command

Grunt stores a library build in /dist/ directory. Also it creates a simple index.html file with domwork.js connected. You can play with it.

To build version without plugins, execute ```grunt build:min```

To choose list of plugins you want to include in your bild, execute

```grunt build --plugins=one,two,three```

Option '--plugins' tells grunt to add files with specified names from src/js/plugins directory.

E.g: ```grunt build --plugins=showhide``` will add a src/js/plugins/showhide.js plugin.

###PubSub

DOMWork has a plugin with Addy Osmani publish/subscribe implementation.

It can be used this way:

```javascript

/*
Subscribe to an 'app/alert' topic with function that will alert a message 
and get the subscribe token
*/
var subscriber = $DW.pubsub.subscribe('app/alert', function(m) {
	alert(m.test);
});

//Unsubscribe from topic by token.
$DW.pubsub.unsubscribe(subscriber);

//Subscribe to an 'app/alert' topic with function that will log a message to console
$DW.pubsub.subscribe('app/alert', function(m) {
	console.log(m);
});

$DW().byId('btn').bind('click', function() {
	/*
	Publish an 'app/alert' topic with {value: 'test'} data by clicking a button.
	It will execute all functions that subscribed on this topic.
	*/
	$DW.pubsub.publish('app/alert', {value: 'test'}); 
});

```

