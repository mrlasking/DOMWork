DOMWork  [![Build Status](https://travis-ci.org/mrlasking/DOMWork.svg?branch=master)](https://travis-ci.org/mrlasking/DOMWork) [![Coverage Status](https://coveralls.io/repos/mrlasking/DOMWork/badge.png?branch=master)](https://coveralls.io/r/mrlasking/DOMWork?branch=master)
=======

Simple extendible DOM manipulation library. 


###Installation

Run ```npm install``` to install dependencies.

You need to have bower and grunt-cli installed globally, so run ```npm install -g bower grunt-cli```

After that install bower dependencies: ```bower install```

###Grunt commands

To view demo application, use ```grunt demo``` command. It may open your browser earlier than server starts, so just refresh 
the page when you see a "Listening on port 3000" in console.

You can use ```grunt test``` command to run jshint and jasmine tests.

Also you can use ```grunt coverage``` command to view tests code coverage.

If you want to deploy test application to github pages (http://mrlasking.github.io/DOMWork)
use ```grunt deploy``` command

####Building
If you want to build production and minified version with all plugins, use ```grunt build``` command

Grunt stores a library build in /dist/ directory. Also it creates a simple index.html file with domwork.js connected. You can play with it.

To build version without plugins, execute ```grunt build:min```

To choose list of plugins you want to include in your bild, execute

```grunt build --plugins=one,two,three```

Option '--plugins' tells grunt to add files with specified names from src/js/plugins directory.

E.g: ```grunt build --plugins=showhide``` will add a src/js/plugins/showhide.js plugin.

###Plugins

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

####AJAX

Plugin adds support of ajax requests (if your browser supports Promises, otherwise connect RSVP library to work with it) (https://github.com/tildeio/rsvp.js/)

To perform an ajax request, simply use the following syntax (you can use $DW.post if you want to send post request):

```javascript
var promise = $DW.get({
    url: 'http://example.com',
    data: {
        param1: 'value1',
        param2: 'value2'
    }
});
```

It returns Promise object, and you can work with it such way:

```javascript
promise.then(
    function(data) {
        //work with received data here
    }, 
    function(error) {
        //work with Error object here
    }
);
```

Read more about Promises here: (http://promisesaplus.com/)
