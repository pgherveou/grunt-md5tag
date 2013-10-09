# grunt-md5tag

> tag and replace references to your prod file with md5 hash

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-md5tag --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-md5tag');
```

## The "md5tag" task

### Overview
In your project's Gruntfile, add a section named `md5tag` to the data object passed into `grunt.initConfig()`.

```js

grunt.initConfig({
  md5tag: {
    myTarget: {
      options: {
        rename: ['**/*.js', '**/*.css', '**/*.jpg'], // filter files and add an md5 hash on this files
        pattern: '{basename}.{md5}{extname}' // file pattern
      },

      // files to scan and update with md5 references
      files: [{
        expand: true,
        cwd: 'test/dist/fixtures/test-ok',
        src: ['**/*.*']
      }]
    }
  }
})
```

### Options

#### options.pattern
Type: `String`
Default value: `',  '`

Default pattern to rename files with md5 hash

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  md5tag: {
    'test-ok': {
      options: {
        rename: ['**/*.js', '**/*.css', '**/*.jpg']
      },
      files: [{
        expand: true,
        cwd: 'test/dist/fixtures/test-ok',
        src: ['**/*.*']
      }]
    }
})


```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
