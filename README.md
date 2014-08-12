DOMWork
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

To build version without plugins, execute ```grunt build:min```

To choose list of plugins you want to include in your bild, execute ```grunt build --plugins=one,two,three```. Option '--plugins' tells grunt to add files with specified names from src/js/plugins directory.

E.g: ```grunt build --plugins=showhide``` will add a src/js/plugins/showhide.js plugin.