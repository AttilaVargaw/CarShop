(function() {
    var cropper;

    window.previewFile = function() {
        var preview = $('#carImage');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            var newImage = $('<img id="carImage" class="cropImage" src="' + reader.result + '">');

            preview.parent().empty().append(newImage);

            cropper = new Cropper(newImage[0], {
                aspectRatio: 4 / 3,
                crop: function(e) {

                },
                viewMode: 1,
                zoomable: false,
                rotatable: false
            });
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            preview.src = "";
        }

    };

    window.onload = function() {
        if ($('#carImage').length > 0) {
            window.previewFile();

            cropper = new Cropper($('#carImage')[0], {
                aspectRatio: 4 / 3,
                crop: function(e) {

                },
                viewMode: 1,
                zoomable: false,
                rotatable: false
            });
        }
    };

    window.addPreviewFile = function() {
        var img = cropper.getCroppedCanvas().toDataURL();
        var card = $('<div class="card"><div class="card-block"><img class="prevImage text-center thumbnail img-rounded" src="' + img + '"></div></div>');

        $("#imageContainer")[0].append(card[0]);
    };

    window.postNewCar = function() {
        event.preventDefault();
        var body = {};

        $("#carForm").find("input,textarea,select").each(function(i, field) {
            body[field.name] = field.value;
        });

        $.post("/data/car", body);
    };

    window.postNewMark = function() {
        event.preventDefault();
        var body = {};

        $("#markForm").find("input").each(function(i, field) {
            body[field.name] = field.value;
        });

        $.post("data/mark", body);
    }
})();