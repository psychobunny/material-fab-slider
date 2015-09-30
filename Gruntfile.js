"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			dev: {
				options: {
					script: 'index.js'
				}
			},
		},
		less: {
			development: {
				files: {
					'public/bin/style.css': 'source/style.less'
				}
			}
		},
		uglify: {
			js: {
				files: {
					'public/bin/manifest.min.js': ['public/bin/vendor.js', 'public/bin/app.js']
				}
			}
		},
		concat: {
			'public/bin/manifest.min.js': ['public/bin/vendor.js', 'public/bin/app.js']
		},
		browserify: {
			vendor: {
				src: [],
				dest: 'public/bin/vendor.js',
				options: {
					require: ['jquery']
				}
			},
			client: {
				src: ['public/lib/main.js'],
				dest: 'public/bin/app.js',
				options: {
					external: ['jquery', 'templates.js', 'translator.js'],
				}
			}
		},
		watch: {
			css: {
				files: 'source/**/*.less',
				tasks: ['less'],
				options: {
					livereload: 3001,
					spawn: false
				}
			},
			client: {
				files: ['public/**/*.js'],
				tasks: ['browserify:client', 'concat'],
				options: {
					livereload: 3001,
					spawn: false
				}
			},
			vendor: {
				files: [],
				tasks: ['browserify:vendor', 'concat'],
				options: {
					livereload: 3001,
					spawn: false
				}
			},
			html: {
				files: ['public/**/*.html'],
				options: {
					livereload: 3001,
					spawn: false
				}
			},
			server: {
				files: ['index.js'],
				tasks: ['express:dev'],
				options: {
					livereload: 3001,
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['express:dev', 'less', 'browserify', 'concat', 'watch']);
};