/* jshint node: true */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                "Gruntfile.js",
                "js/**/*.js",
                "spec/**/*.js"
            ], options: {
                jshintrc: '.jshintrc'
            }
        },
        jasmine: {
            coverage: {
                src: ['js/**/*.js'],
                options: {
                    specs: ['test/**/*.js'],
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    version: '2.0.0',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: 'coverage',
                        thresholds: {
                            lines: 75,
                            statements: 75,
                            branches: 75,
                            functions: 90
                        }
                    }
                }
            },
            test: {
                src: "js/**/*.js",
                options: {
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    specs: "test/**/*.js",
                    version: '2.0.0'
                }
            }
        },
        connect: {
            coverage: {
                options: {
                    port: 8080,
                    base: 'coverage/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint', 'jasmine:test']);
    grunt.registerTask('default', ['jshint','jasmine:coverage']);

    grunt.registerTask('coverage', 'start web server for viewing istanbul coverage in browser', function() {
        grunt.task.run('jasmine:coverage');

        grunt.event.once('connect.coverage.listening', function(host, port) {
            var coverageUrl = 'http://localhost:' + port;
            grunt.log.writeln('Istanbul coverage available at: ' + coverageUrl);
            require('open')(coverageUrl);
        });
        grunt.task.run('connect:coverage:keepalive');
    });

};