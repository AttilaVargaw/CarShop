describe("Public/index", () => {
    jasmine.getFixtures().fixturesPath = "base/spec/javascripts/fixtures/";

    function SetUpFixture() {
        loadFixtures("index.fixture.html");
    };

    beforeEach(() => {
        SetUpFixture();
    });

    it("Search should exist", function() {})

    it("Should work with a domain name", (done) => {
        let params = {};
        let selected = $("#search select");
        $.each(selected, (i, e) => {
            params[e.name] = e.value;
        });

        spyOn(window, "getLocation").and.callFake(() => {
            return "test.com";
        });

        spyOn(window, "redirect").and.callFake((newHref) => {
            expect(newHref).toBe("test.com?" + $.param(params));

            done();
        });

        let form = $('#search');
        form.trigger("submit");
    });

    it("Should work with localhost", (done) => {
        let params = {};
        let selected = $("#search select");
        $.each(selected, function(i, e) {
            params[e.name] = e.value;
        });

        spyOn(window, "getLocation").and.callFake(function() {
            return "localhost";
        });

        spyOn(window, "redirect").and.callFake(function(newHref) {
            expect(newHref).toBe("localhost?" + $.param(params));

            done();
        });

        let form = $('#search');
        form.trigger("submit");
    })
});