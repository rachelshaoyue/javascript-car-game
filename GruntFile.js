module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.'
                }
            }
        },
        concat: {
            dist: {
                src: [  "lib/**/*.js",
                    "js/**/*.js"
                     ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: ['js/*.js', 'assets/*', 'index.html'],
            tasks: []
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });

    grunt.registerTask('default', ['connect', 'open', 'watch']);
}
