'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.md5tag = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  'test-ok': function(test) {
    var md5Names = [
      'index.0adba6b6.js',
      'unicorn1.832169d1.jpg',
      'unicorn3.832169d1.jpg',
      'index.de300bb9.css',
      'unicorn2.832169d1.jpg'
    ];
    test.ok(grunt.file.exists('test/dist/fixtures/test-ok/index.html'));
    var content = grunt.file.read('test/dist/fixtures/test-ok/index.html');
    md5Names.forEach(function (f) {
      test.ok(content.indexOf(f) !== -1);
      test.ok(grunt.file.exists('test/dist/fixtures/test-ok/assets/' + f));
    });
    test.done();
  },

  'test-ko': function(test) {
    // test.expect(1);

    // var actual = grunt.file.read('tmp/custom_options');
    // var expected = grunt.file.read('test/expected/custom_options');
    // test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
