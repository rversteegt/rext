module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true
        },
        esversion: 6,
        laxcomma : true
      }
    },

    "babel": {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.js'],
            dest: 'dist/babel/src'
          },
          {
            expand: true,
            cwd: 'test/',
            src: ['*.js'],
            dest: 'dist/babel/test'
          }
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ['dist/babel/test/**/*.js']
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'dist/babel/src/**/*.js',
        dest: 'dist/build/src/<%= pkg.name %>.js'
      }
    },

    "uglify": {
      build: {
        src: ['dist/build/src/*.js'],
        dest: 'dist/build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'babel', 'mochaTest', 'concat', 'uglify']);
};
