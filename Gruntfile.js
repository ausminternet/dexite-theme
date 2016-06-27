module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //=== include all bowerlibs
    bower_concat: {
      js: {
        dest: 'assets/js/vendors.js'
      },
      css: {
        dest: 'assets/css/vendors.css'
      }
    },

    //=== compress js
    uglify: {
      bower: {
        options: {
          compress: {
            warnings: false
          },
          mangle: true,
        },
        files: {
          'assets/js/vendors.min.js': 'assets/js/vendors.js'
        }
      },
      app: {
        options: {
          compress: {
            warnings: false
          },
          mangle: true,
        },
        files: {
          'assets/js/app.min.js': 'assets/js/app.js'
        }
      }
    },

    //=== compile scss

    sass: {
      options: {
          sourcemap: true,
          outputStyle: 'compressed',
        },
      app: {
        files: {
          'assets/css/app.css' : 'assets/scss/app.scss'
        }
      }
    },

    //=== add browser prefixes
    autoprefixer: {
      bower: {
        expand: true,
        cwd: 'build',
        src: 'assets/css/vendors.css',
        dest: 'assets/css'
      },
      app: {
        expand: true,
        cwd: 'build',
        src: 'assets/css/app.css',
        dest: 'assets/css'
      }

    },

    //=== combine and compress css
    cssmin: {
      bower: {
        files: {
          'assets/css/vendors.min.css': 'assets/css/vendors.css'
        }
      },
      app: {
        files: {
          'assets/css/app.min.css': 'assets/css/app.css'
        }
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      scss: {
        files: 'assets/scss/*.scss',
        tasks: 'build-sass',
      },
      js: {
        files: 'assets/js/app.js',
        tasks: 'uglify:app',
      },
      livereload: {
        files: ['assets/js/*.js',
                'assets/css/*.css',
                'index.html'],
        options: { livereload: true }
      }
    }
  });

  //=== require all tasks
  require('load-grunt-tasks')(grunt);

  //== Default task(s).
  // build bowerlibs
  grunt.registerTask('build-bower', [
    'bower_concat:js',
    'bower_concat:css',
    'autoprefixer:bower'
  ]);

  // build app css
  grunt.registerTask('build-sass', [
    'sass:app',
    'autoprefixer:app',
  ]);

  // build
  grunt.registerTask('build', [
    'build-bower',
    'build-sass',
  ]);

  // watch
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
};
