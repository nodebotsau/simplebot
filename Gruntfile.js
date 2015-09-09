module.exports = function(grunt) {
 
    // configure the tasks
    grunt.initConfig({
        copy: {
            options: {
                timestamp: true,
            },

            simplebot_firmata: {
                cwd: 'firmware/src/',
                flatten: true,
                src: [ 'libs/firmata/**', 'controller_src/simplebot_firmata/*' ],
                dest: 'firmware/build/simplebot_firmata/',
                expand: true,
                filter: 'isFile',
            },
            sbs_firmata: {
                cwd: './',
                flatten: true,
                src: [  'firmware/src/libs/firmata/**',
                        'firmware/src/controller_src/sbs_firmata/*', 
                        'node_modules/node-pixel/firmware/src/libs/neopixel/*',
                        'node_modules/node-pixel/firmware/src/libs/ws2812/*'
                ],
                dest: 'firmware/build/sbs_firmata/',
                expand: true,
                filter: 'isFile',
            },
            network_simplebot_firmata: {
                cwd: 'firmware/src/',
                flatten: true,
                src: [ 'libs/firmata/**', 'controller_src/network_simplebot_firmata/*' ],
                dest: 'firmware/build/network_simplebot_firmata/',
                expand: true,
                filter: 'isFile',
            },
        },
        clean: {
            build: {
                src: [  
                        'firmware/build/simplebot_firmata',
                        'firmware/build/sbs_firmata',
                        'firmware/build/network_simplebot_firmata',
                     ]
            },
        },
    });
 
    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'copy']);

};
