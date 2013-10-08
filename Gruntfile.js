/*
 * grunt-md5tag
 * https://github.com/pgherveou/grunt-md5tag
 *
 * Copyright (c) 2013 PG Herveou
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // copy assets to dist
    copy: {
      tests: {
        files: [
          {
            expand: true,
            cwd: 'test/',
            src: 'fixtures/**',
            dest: 'test/dist/'
          }
        ]
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/dist'],
    },

    // Configuration to be run (and then tested).
    md5tag: {
      'test-ok': {
        options: {
          rename: ['**/*.js', '**/*.css', '**/*.jpg'],
          pattern: '{basename}.{md5}{extname}'
        },
        files: [{
          expand: true,
          cwd: 'test/dist/fixtures/test-ok',
          src: ['**/*.*']
        }]
      },
      'test-ko': {
        options: {
          rename: ['**/*.js', '**/*.css', '**/*.jpg'],
          pattern: '{basename}.{md5}{extname}'
        },
        files: [{
          expand: true,
          cwd: 'test/dist/fixtures/test-ko',
          src: ['**/*.*']
        }]
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'md5tag:test-ok', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
