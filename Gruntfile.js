module.exports = function(grunt) {

	grunt.initConfig({
		
		browserify: {
			all: {
				src: 'index.js',
				dest: 'client/hipsum.js',
				options: {
					//noParse: ['node_modules/handlebars/lib/handlebars.js']
					transform: ['deglobalify']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-browserify');
	
	grunt.registerTask('default', 'browserify');

};