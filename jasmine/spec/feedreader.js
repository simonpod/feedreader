/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/*Test are placed within $() function as some test may require DOM elements
 * They should run after DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('all feeds are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*This is the second test. It loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feed URL is defined and not empty', function () {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });
        /* Ths is the third test. It loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed name is defined and not empty', function () {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This is the second test suite "The menu". This suite is all about testing menu functinality. */


    describe('The menu', function() {
                 let bodyClass =  $('body').hasClass('menu-hidden');
        /* This is the first test. It ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function() {
             expect(bodyClass).toBe(true);
        });

         /* This is the second test. It ensures the menu changes
          * visibility when the menu icon is clicked. This test
          *  has two expectations:  the menu display when
          * clicked and  it hides when clicked again.\
          */

         it('menu changes its visibility', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

      });

    /* This is te third test suite "Initial Entries". It checks if the elements load correctly on start. */

        /* This is the first test. It ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because loadFeed() is asynchronous  this test
         * utilises Jasmine's beforeEach and asynchronous done() funtion.
         */


    describe('Initial Entries', function() {
         beforeEach(function(done) {
                loadFeed(0, done);
        });
        it('at least single .entry within .feed container', function() {
            expect($('.entry').length).not.toBe(0);
          });
    });



    /* This is the forth test suite "New Feed Selection". It ensures the content changes when feeds load  */

        /* This is the first test. It ensures when a new feed is loaded
         * by the loadFeed function that the content changes.
         * loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {
        var firstFeed;
        var secondFeed;

         beforeEach(function(done) {
               loadFeed(0, function() {
                firstFeed = $('.feed').text();

                loadFeed(1, function() {
                     secondFeed = $('.feed').text();
                     done();
                 });
                });
            });
                it('content changes', function() {
                    expect(firstFeed).not.toEqual(secondFeed);
                           });
    });
}());