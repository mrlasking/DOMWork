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
                src: ['src/js/**/*.js'],
                dest: 'dist/domwork.js'
            },
            plugins: {
                src: ['src/js/plugins/*.js'],
                dest: 'dist/domwork.js'
            },
            min: {
                src: ['src/js/class.DOMWork.js'],
                dest: 'dist/domwork.js'
            }
        },

        clean: ["dist"],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['src/index.html', 'src/data.json'], dest: 'dist/',
                        flatten: true
                    }
                ]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/domwork.min.js': ['dist/domwork.js']
                }
            }
        },

        jshint: {
            all: [
                "Gruntfile.js",
                "src/js/**/*.js",
                "spec/**/*.js"
            ], options: {
                jshintrc: '.jshintrc'
            }
        },
        jasmine: {
            coverage: {
                src: ['src/js/**/*.js'],
                options: {
                    specs: [
                        "test/main.spec.js",
                        "test/plugins/showhide.spec.js",
                        "test/plugins/pubsub.spec.js",
                        "test/plugins/ajax.spec.js"
                    ],
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
                        'bower_components/sinonjs/sinon.js',
                        'bower_components/rsvp/rsvp.js'
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
                src: ["src/js/**/*.js"],
                options: {
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
                        'bower_components/sinonjs/sinon.js',
                        'bower_components/rsvp/rsvp.js'

                    ],
                    specs: [
                        "test/main.spec.js",
                        "test/plugins/showhide.spec.js",
                        "test/plugins/pubsub.spec.js",
                        "test/plugins/ajax.spec.js"
                    ],
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
        },
        'gh-pages': {
            options: {
                base: 'dist/'
            },
            src: ['**/*']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-gh-pages');


    grunt.registerTask('test', ['jshint', 'jasmine:test']);
    grunt.registerTask('default', ['jshint','jasmine:coverage']);

    grunt.registerTask('build', 'build domwork with defined plugins only', function() {
        var plugins = grunt.option('plugins') || '';

        grunt.task.run(['test', 'clean']);

        if (plugins !== '') {
            plugins = plugins.split(',');

            var src = ['src/js/class.DOMWork.js'];

            plugins.forEach(function(item) {

                src.push('src/js/plugins/'+item+'.js');

            });

            grunt.config.set('concat.plugins.src', src);

            grunt.task.run(['concat:plugins']);

        } else {
            grunt.task.run(['concat:dist']);
        }

        grunt.task.run(['uglify', 'copy']);

    });

    grunt.registerTask('build:min', ['test', 'clean', 'concat:min', 'uglify', 'copy']);

    grunt.registerTask('deploy', ['build', 'gh-pages']);

    grunt.registerTask('coverage', 'start web server for viewing istanbul coverage in browser', function() {
        grunt.task.run('jasmine:coverage');

            var port = grunt.option('port') || 8080;

        grunt.config.set('connect.coverage.options.port', port);

        grunt.event.once('connect.coverage.listening', function(host) {
            var coverageUrl = 'http://localhost:' + port;
            grunt.log.writeln('Istanbul coverage available at: ' + coverageUrl);
            require('open')(coverageUrl);
        });
        grunt.task.run('connect:coverage:keepalive');
    });

};