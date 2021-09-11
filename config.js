'use strict';

module.exports = {
  'ui': {
    src: [
      './src/teamsnap-ui/src/css/teamsnap-ui.scss',
      './src/teamsnap-ui/src/css/themes/*.scss'
    ],
    dest: './dist/assets/toolkit/styles',
    name: 'ui'
  },

  'demos': {
    src: './src/assets/toolkit/styles/*.scss',
    dest: './dist/assets/toolkit/styles',
    name: 'demos'
  },

  cssDocs: {
    src: './src/assets/drizzle/styles/documentation.css',
    dest: './dist/assets/drizzle/styles'
  },

  cssDrizzle: {
    src: './src/assets/drizzle/styles/drizzle.css',
    dest: './dist/assets/drizzle/styles',
    prefix: 'drizzle-',
    ignore: [/^[^A-Zu-]/, /^(is|has)-/],
  },

  copy: {
    src: './src/static/**/*',
    dest: './dist'
  },

  js: {
    src: './src/assets/**/**/*.js',
    dest: './dist/assets'
  },

  clean: {
    dest: './dist'
  },

  serve: {
    plugins: {
      browserSync: {
        open: false,
        notify: false,
        files: ['./dist/**/*'],
        server: { baseDir: './dist' }
      }
    }
  },

  watch: {
    watchers: [
      {
        match: ['./src/static/**/*'],
        tasks: ['copy']
      },
      {
        match: ['./src/assets/**/*.css'],
        tasks: ['css']
      },
      {
        match: [
          './src/teamsnap-ui/src/css/**/*.scss',
          './src/assets/**/*.scss'
        ],
        tasks: ['sass']
      },
      {
        match: ['./src/assets/**/**/*.js'],
        tasks: ['js']
      },
      {
        match: [
          './src/**/*.hbs',
          './src/**/*.md',
          './src/data/**/*'
        ],
        tasks: ['drizzle']
      }
    ]
  },

  drizzle: {
    beautifier: {
      /* eslint-disable camelcase */
      indent_char: ' ',
      indent_size: 2,
      indent_with_tabs: false,
      max_preserve_newlines: 1,
      wrap_line_length: 0,
      unformatted:
        `a abbr acronym address b bdo big cite code col del dfn dt em font
        h1 h2 h3 h4 h5 h6 i img ins kbd mark pre q s samp small span
        strike strong sub sup tt u var`.split(' ')
      /* eslint-enable camelcase */
    },
    src: {
      patterns: {
        basedir: './src/patterns',
        glob: './src/patterns/**/*.hbs'
      },
      templates: {
        basedir: './src/templates',
        glob: './src/templates/**/*.hbs'
      }
    },
    dest: {
      pages: './dist',
      patterns: './dist/patterns'
    },
    fieldParsers: {
      notes: 'markdown'
    }
  }
};
