'use strict';

/**
 * module deps
 */

var fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');

/**
 * grunt-md5tag
 */

module.exports = function(grunt) {
  grunt.registerMultiTask('md5tag', 'tag and replace references to your prod file with md5 hash', function() {

    /**
     * get md5 for filepath
     */

    function md5(file) {
      var hash = crypto.createHash('md5');
      hash.update(grunt.file.read(file));
      var hashPath = hash.digest('hex').slice(0,8),
          extname = path.extname(file),
          basename = path.basename(file),
          name = options.pattern
            .replace('{md5}', hashPath)
            .replace('{basename}', basename.slice(0, basename.length - extname.length))
            .replace('{extname}', extname);
      return file.replace(basename, name);
    }

    var files = this.filesSrc,
        mappings = {},
        options;

    // merge options with defaults
    options = this.options({
      pattern: '{basename}.{md5}{extname}'
    });

    // add md5 hash to transform group
    grunt.file.match(options.rename, files).forEach(function (f) {
      var fileOut = md5(f),
          basename = path.basename(f);

      // check mapping is unique
      if (mappings[basename]) {
        grunt.fail.fatal('basename ' + basename + ' is not unique');
      }

      // save mapping
      mappings[basename] = path.basename(fileOut);

      // rename file
      fs.renameSync(f, fileOut);
      grunt.log.writeln('rename ' + basename + ' to ' + mappings[basename]);
    });

    // update references to update group
    files.forEach(function (file) {
      var basename = path.basename(file),
          mapping = mappings[basename],
          data;

      // get md5 filepath
      if (mapping) file = file.replace(basename, mapping);

      // search and replace file content
      data = grunt.file.read(file);
      Object.keys(mappings).forEach(function(key) {
        data = data.replace(new RegExp(key, 'g'), mappings[key]);
      });

      // update file
      grunt.verbose.writeln('updating file', file);
      grunt.file.write(file, data);
    });
  });
};
