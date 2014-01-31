module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
        '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    concat: {
      options: {
        separator: '\n',
        stripBanner: true
      },
      scripts: {
        src: ['src/scripts/*.js'],
        dest: 'js/script.js'
      },
      styles: {
        src: ['css/*.css', '!css/style.css', '!css/style.min.css'],
        dest: 'css/style.css'
      }
    },
    sass: {
      dist: {
        files: {
          'css/style.ready.css': 'src/styles/z_site.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 4 versions']
      },
      your_target: {
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      templates: {
        files: ['**/*.html', 'partial/**/*.html'],
        tasks: []
      },
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['sass', 'concat:styles']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['concat:scripts']
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass', 'concat', 'autoprefixer']);
  grunt.registerTask('compress', ['sass', 'concat', 'uglify', 'autoprefixer', 'cssmin']);
};
