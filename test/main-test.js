var hbs    = require('handlebars');
var assert = require('assert');
var fs = require('fs');


describe('Hipsum', function() {
	
	var lib;
	
	beforeEach(function() {
		lib = require('../lib')(hbs);
	});
	
	
	describe('Should initialize correctly', function() {
		
		it('Module should return a function', function() {
			assert.strictEqual(typeof(lib), 'function');
		});
		
		it('Helper output should have a property "hipsum" of type object', function() {
			assert.strictEqual(typeof(lib().hipsum), 'object');
		});
	});
	
	
	describe('Should render correctly (unit test)', function() {
	
		it('Should render the default lorem ipsum', function() {
			var expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			var actual = lib().string;
			assert.equal(expected, actual);
		});
	
		it('Should render the specified word count when count (8) < word list', function() {
			var expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,';
			var actual = lib(8);
			assert.equal(expected, actual);
		});
	
		it('Should render the specified word count when count (80) > word list', function() {
			var expected = 80;
			var actual = lib(80).string.split(' ').length;
			assert.equal(expected, actual);
		});
	});
	
	
	describe('Should render correctly (functional test)', function() {
	
		it('Should render the default lorem ipsum', function() {
			var source   = fs.readFileSync('test/fixtures/default.hbs', {encoding: 'utf-8'});
			var expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			var actual = hbs.compile(source)({});
			assert.equal(expected, actual);
		});
	
		it('Should render the specified word count when count (8) < word list', function() {
			var source   = fs.readFileSync('test/fixtures/default-8-words.hbs', {encoding: 'utf-8'});
			var expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,';
			var actual = hbs.compile(source)({});
			assert.equal(expected, actual);
		});
	
		it('Should render the specified word count when count (80) > word list', function() {
			var source   = fs.readFileSync('test/fixtures/default-80-words.hbs', {encoding: 'utf-8'});
			var expected = 80;
			var actual = hbs.compile(source)({}).split(' ').length;
			assert.equal(expected, actual);
		});
	});
	
});
