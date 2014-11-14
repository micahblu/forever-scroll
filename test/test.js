var assert = require('assert'),
    Browser = require('zombie');

Browser.localhost('http://localhost:8080', 8080);

var browser = Browser.create();
it('Should load content on scroll', function(done){

	browser.visit('/', function(error){
		assert.ifError(error);
		browser.assert.success();
		
		browser.document.window.addEventListener('scroll', function(){
			console.log('scrolling...');
		});

		browser.document.window.scrollTo(100, 100);

		console.log(browser.document.documentElement.scrollTop);
		console.log(browser.document.documentElement.scrollLeft);

		done();
	});
});
