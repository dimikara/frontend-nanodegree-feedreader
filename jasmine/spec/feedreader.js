/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined and that the URL is not empty', function() {
            allFeeds.forEach((feed) => {
            // has a URL defined
            expect(feed.url).toBeDefined();
            // URL is not empty
            expect(feed.url.length).not.toBe(0);
            expect(feed.url).toMatch(/^(http|https):\/\//);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feed Name Defined ', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0)
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The Menu', function() {

        /* The test suite includes: 
         * 1) a test that ensures the menu element is
         * hidden by default. Necessary step: Analyzing 
         * the HTML and the CSS to determine how 
         * the hiding/showing of the menu element was performed.
         */
        var body = document.body;
        var menuIcon = document.querySelector(".menu-icon-link");
        it('Menu Hidden ', function() {
            expect(body.className).toContain('menu-hidden')
        });


         /* 2) a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
         it('menu display when Clicked and hide when clicked again', function() {
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.className).toContain('menu-hidden')
        });

    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* The test suite includes a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });


        it("there is at least a single .entry within .feed after loadFeed() is called", ((done) => {
            var numberEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numberEntries).toBeGreaterThan(0);
            done();
        }));


        it("an entry has a link starting with 'http(s)://'", ((done) => {
            var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
            for (var i = 0; i < entries.length; i++) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        }));
    
    });
    
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This test suite contains a test ensuring that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Again, loadFeed() is asynchronous.
         */
        var initFeedSelection;
        beforeEach((done) => {
            loadFeed(0, () => {
                initFeedSelection = document.querySelector(".feed").innerHTML;

                loadFeed(1, () => {
                    done();
                });
            });
        });
        it("the content changes by loadFeed()", ((done) => {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(initFeedSelection).not.toBe(newFeedSelection);
            done();
        }));

    })

}());
