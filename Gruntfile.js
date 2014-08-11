/* jshint node: true */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! \n<%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    'Created by <%= pkg.author %>\n' +
                    'License: <%= pkg.license %>\n' +
                    'Visit <%= pkg.homepage %> for new versions or contributing. */\n'
            },
            dist: {
                src: ['js/class.DOMWork.js'],
                dest: 'dist/domwork.js'
            }
        },

        clean: ["dist"],
        /*copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['js/class.DOMWork.js'], dest: 'dist/',
                        flatten: true,
                        rename: function(dest, src) {
                            return dest + 'domwork.js'
                        }
                    }
                ]
            }
        },*/

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/domwork.min.js': ['js/class.DOMWork.js']
                }
            }
        },

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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint', 'jasmine:test']);
    grunt.registerTask('default', ['jshint','jasmine:coverage']);
    grunt.registerTask('build', ['test', 'clean', 'concat', 'uglify']);

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