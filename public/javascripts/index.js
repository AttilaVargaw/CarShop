(function() {
    function search(event, page) {
        console.log(event);
        event.preventDefault();
        var params = {};
        var selected = $("#search select");
        $.each(selected, function(i, e) {
            params[e.name] = e.value;
        });

        params.page = page || 0;

        var newUrl = "";
        var oldUrl = window.getLocation();
        var index = oldUrl.indexOf("?");

        if (index > 0) {
            oldUrl = oldUrl.substring(0, index);
        }

        newUrl = oldUrl + "?" + $.param(params);

        window.redirect(newUrl);
    }

    window.redirect = function(newUrl) {
        window.location.href = newUrl;
    };

    window.getLocation = function() {
        return window.location.href;
    };

    window.search = search;
})();