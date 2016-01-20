module.exports = function (grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/************************************************************************\
		 * clean                                                                *
		 \************************************************************************/

		clean: {
			styles: ['client/dist/css'],
			images: ['client/dist/images'],
			fonts: ['client/dist/fonts'],
			scripts: ['client/dist/js'],
			badges: ['client/src/images/badges/bigmin','client/src/images/badges/smallmin'],
			api_service: ['client/src/js/services/lb-services.js']
		},
		/************************************************************************\
		 * copy assets                                                          *
		 \************************************************************************/
		svgmin: {
			badges: {
				files: [
					{
						expand: true,
						cwd: 'client/src/images/badges/small/',
						src: ['*.svg'],
						dest: 'client/src/images/badges/smallmin/'
					},
					{
						expand: true,
						cwd: 'client/src/images/badges/big/',
						src: ['*.svg'],
						dest: 'client/src/images/badges/bigmin/'
					}
				]
			}
		},
		grunticon: {
			smallBadges: {
				files: [{
						expand: true,
						cwd: 'client/src/images/badges/smallmin/',
						src: ['*.svg'],
						dest: "client/src/less/badges/small/"
					}],
				options: {
					cssprefix: ".x-badges-small-",
					datasvgcss: "badges-small.svg.less",
					datapngcss: "badges-small.png.css",
					urlpngcss: "badges-small.fallback.css"
				}
			},
			bigBadges: {
				files: [{
						expand: true,
						cwd: 'client/src/images/badges/bigmin/',
						src: ['*.svg'],
						dest: "client/src/less/badges/big"
					}],
				options: {
					cssprefix: ".x-badges-big-",
					datasvgcss: "badges-big.svg.less",
					datapngcss: "badges-big.png.css",
					urlpngcss: "badges-big.fallback.css"
				}
			}
		},
		copy: {
			fonts_bootstrap: {
				expand: true,
				cwd: 'client/src/vendor/bootstrap/fonts',
				src: '**/**',
				dest: 'client/dist/fonts'
			},
			iconfont: {
				expand: true,
				cwd: 'client/src/fonts',
				src: '**/**',
				dest: 'client/dist/fonts'
			},
			images: {
				expand: true,
				cwd: 'client/src/images/',
				src: '**/**',
				dest: 'client/dist/images'
			},
			angular: {
				expand: true,
				cwd: 'client/src/vendor/angular/',
				src: 'angular.js',
				dest: 'client/dist/js'
			},
		},
		less: {
			frontend: {
				options: {
					banner: '/*! <%= pkg.name %> app | version <%= pkg.version %> | <%= grunt.template.today("dd-mm-yyyy") %> */',
					compress: true,
					cleancss: true,
					ieCompat: true,
					paths: ['client/src/less'],
					plugins: [require('less-plugin-glob')]
				},
				files: {
					'client/dist/css/main.min.css': 'client/src/less/main.less'
				}
			},
			mail: {
				options: {
					paths: ['email/templates/daily']
				},
				files: {
					'email/templates/daily/style.css': 'email/templates/daily/less/base.less'
				}

			}
		},
		/************************************************************************\
		 * livereload                                                           *
		 \************************************************************************/

		watch: {
			mail: {
				files: ['email/templates/daily/less/base.less', 'email/templates/daily/**/*.jade'],
				tasks: ['less:mail', 'execute:mailCompiler'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['client/src/less/**/*.less'],
				tasks: ['less']
			},
			images: {
				files: ['client/src/images/**/*'],
				tasks: ['copy:images']
			},
			scripts: {
				files: ['client/src/js/**/*'],
				tasks: ['scripts'],
				options: {
					livereload: true
				}
			},
			markup: {
				files: ['client/views/**/*.html'],
				options: {
					livereload: true
				}
			},
			livereload: {
				files: [
					'client/views/**/*.html',
					'client/dist/css/*.css',
					'client/dist/js/*.js',
					'email/templates/**/*.jade',
					'email/templates/**/*.less'
				],
				options: {
					livereload: true
				}
			},
			self: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:self', 'default']
			},
			services: {
				files: ['common/models/*.json', 'server/model-config.json'],
				tasks: ['loopback_angular:services']
			},
			icons: {
				files: ['client/src/icons/*.svg'],
				tasks: ['webfont:healingo']
			}
		},
		/************************************************************************\
		 * jshint                                                               *
		 \************************************************************************/

		jshint: {
			self: {
				src: 'Gruntfile.js'
			}
		},
		/************************************************************************\
		 * execution                                                               *
		 \************************************************************************/

		execute: {
			mailCompiler: {
				src: 'email/templates/templates.js'
			}
		},
		/************************************************************************\
		 * uglify                                                               *
		 \************************************************************************/

		uglify: {
			scripts: {
				options: {
					banner: '/*! <%= pkg.name %> | version <%= pkg.version %> | <%= grunt.template.today("dd-mm-yyyy") %> */\n',
					sourceMap: true,
					compress: {
						drop_debugger: false
					}
				},
				files: {
					'client/dist/js/scripts.js': [
						'client/src/vendor/jquery/dist/jquery.js',
						'client/src/vendor/jquery-timeago/jquery.timeago.js',
						'client/src/vendor/jquery-timeago/locales/jquery.timeago.de.js',
						'client/src/vendor/bootstrap/js/dropdown.js',
						'client/src/vendor/bootstrap/js/collapse.js',
						'client/src/vendor/bootstrap/js/button.js',
						'client/src/vendor/angular/angular.js',
						'client/src/vendor/lodash/lodash.js',
						'client/src/vendor/angular-google-maps/dist/angular-google-maps.js',
						'client/src/vendor/angular-google-chart/ng-google-chart.js',
						'client/src/vendor/angular-resource/angular-resource.js',
						'client/src/vendor/angular-sanitize/angular-sanitize.js',
						'client/src/vendor/angular-ui-router/release/angular-ui-router.js',
						'client/src/vendor/angular-ui-select/dist/select.js',
						'client/src/vendor/oauth2-client-js/dist/oauth2-client.js',
						'client/src/vendor/ng-ckeditor/ng-ckeditor.js',
						'client/src/vendor/ngstorage/ngStorage.js',
						'client/src/vendor/angular-animate/angular-animate.js',
						'client/src/vendor/angular-busy/angular-busy.js',
						'client/src/js/app.js',
						'client/src/js/directives/*.js',
						'client/src/js/filters/*.js',
						'client/src/js/controllers/**/*.js',
						'client/src/js/services/*.js',
						'client/src/js/i18n/*.js'
					]
				}
			}
		},
		/************************************************************************\
		 * generate angular services                                            *
		 \************************************************************************/

		loopback_angular: {
			services: {
				options: {
					input: 'server/server.js',
					output: 'client/src/js/services/lb-services.js'
				}
			}
		},
		webfont: {
			healingo: {
				src: 'client/src/icons/**/*.svg',
				dest: 'client/src/fonts',
				destCss: 'client/src/less',
				options: {
					stylesheet: 'less',
					relativeFontPath: '../fonts',
					htmlDemo: false,
					hashes: false,
					template: 'client/src/less/icon.template.css',
					templateOptions: {
						baseClass: 'webfont-icon',
						classPrefix: 'webfont_',
						mixinPrefix: 'webfont-'
					}
				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-loopback-angular');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-execute');

	grunt.registerTask('badges', [
		'svgmin:badges',
		'grunticon:smallBadges',
		'grunticon:bigBadges',
		'clean:badges'
	]);

	// styles task
	grunt.registerTask('styles', [
		'clean:styles',
		'less',
		'copy:fonts_bootstrap',
		'copy:iconfont'
	]);

	// images task
	grunt.registerTask('images', [
		'clean:images',
		'copy:images',
	]);

	// images task
	grunt.registerTask('scripts', [
		'clean:scripts',
		'clean:api_service',
		'loopback_angular:services',
		'uglify:scripts',
		'copy:angular'
	]);

	// shell task
	grunt.registerTask('services', [
		'clean:api_service',
		'loopback_angular:services'
	]);

	grunt.registerTask('iconfont', [
		'clean:fonts',
		'webfont:healingo',
		'styles'
	]);

	// default task
	grunt.registerTask('default', [
		'styles',
		'images',
		'scripts'
	]);
};
