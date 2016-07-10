var arduino = process.env.ARDUINO_PATH;

// these are the main target boards for the SimpleBot.
var boards = {
    "uno" :{
        package: "arduino:avr:uno",
    },
    "nano": {
        cpu: "atmega328",
        package: "arduino:avr:nano:cpu=atmega328",
    },
};

// use this so we can expand it later.
var boardlist = Object.keys(boards).toString();

module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        clean: {
            firmware_build: {
                src: [
                        'firmware/build/standard/simplebot_firmata',
                        'firmware/build/sbs/sbs_firmata',
                        'firmware/build/network/simplebot_firmata',
                     ]
            },
            compiled_bins: {
                src: [
                        'firmware/bin/*'
                    ]
            },
            post_compile: {
                src: [
                        'firmware/bin/standard/{' + boardlist + '}/!(*ino.hex)',
						'firmware/bin/network/{' + boardlist + '}/!(*ino.hex)',
                ]
            },
        },
        copy: {
            options: {
                timestamp: true,
            },

            simplebot_firmata: {
                cwd: 'firmware/src/',
                flatten: true,
                src: [ 'libs/firmata/**', 'controller_src/simplebot_firmata/*' ],
                dest: 'firmware/build/standard/simplebot_firmata/',
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
                dest: 'firmware/build/sbs/sbs_firmata/',
                expand: true,
                filter: 'isFile',
            },
            network_simplebot_firmata: {
                cwd: 'firmware/src/',
                flatten: true,
                src: [ 'libs/firmata/**', 'controller_src/simplebot_firmata/*' ],
                dest: 'firmware/build/network/simplebot_firmata/',
                expand: true,
                filter: 'isFile',
            },
        },
        'string-replace': {
            precompile: {
                files: [{
                    src: 'firmware/build/network/simplebot_firmata/simplebot_firmata.ino',
                    dest: 'firmware/build/network/simplebot_firmata/simplebot_firmata.ino',
                }],
                options: {
                    replacements: [{
                        pattern: /57600/,
                        replacement: '115200',
                    }],
                },
            },
        },
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-exec');

    // build the bins for the target
    // dynamically create the compile targets for the various boards
    Object.keys(boards).forEach(function(board) {
        var cwd = 'firmware/build/';

        grunt.config(["exec", board + "_standard"], {
            command:function() {
                return arduino + " --verify --verbose-build --board "  + boards[board].package +
                " --pref build.path=firmware/bin/standard/" + board +  " " + cwd +
                "standard/simplebot_firmata/simplebot_firmata.ino";
            },
        });
        grunt.config(["exec", board + "_network"], {
            command:function() {
                return arduino + " --verify --verbose-build --board "  + boards[board].package +
                " --pref build.path=firmware/bin/network/" + board +  " " + cwd +
                "network/simplebot_firmata/simplebot_firmata.ino";
            },
        });
    });

    grunt.registerTask('build', ['clean:firmware_build', 'clean:compiled_bins', 'copy', 'string-replace']);
    grunt.registerTask('compile', ['build', 'exec', 'clean:post_compile']);
};
