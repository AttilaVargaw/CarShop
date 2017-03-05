let _ = require("lodash");

class Car {
    constructor(mark, type, age, desc, price, state, imgUrl, id) {
        this.mark = mark;
        this.type = type;
        this.age = age;
        this.desc = desc;
        this.price = price;
        this.state = state;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}

class Dummydb {
    CreateRandom() {
        let i = 0;

        let cars = [
            new Car("Lexus", "LC", 3, "Menőbb kocsi", 500000, "Új", "http://www.gadgetreview.com/wp-content/uploads/2012/01/lexus-lf-lc.jpg", i++),
            new Car("Audi", "A8", 5, "Kicsit menőbb kocsi.", 800000, "Új", "http://media.caranddriver.com/images/16q1/665019/2016-audi-a8l-40t-sport-test-review-car-and-driver-photo-666706-s-429x262.jpg", i++),
            new Car("Nissan", "Navarro", 12, "Átlagos kocsi.", 150000, "Új", "http://www.nissanhovany.hu/media/picture/thumb/xphoto-26-265564.jpg.pagespeed.ic.-3RTft_yM2.jpg", i++),
            new Car("Toyota", "Prius", 10, "Egy kocsi", 150000, "új", "https://images.toyota-europe.com/hu/prius/width/1200/exterior-right-front.jpg", i++),
            new Car("Bmw", "PZ4", 60, "A tökéletes jármű dugóhoz.", 6000000, 'Használt', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Pz-IVG-latrun-2.jpg/300px-Pz-IVG-latrun-2.jpg", i++),
            new Car("Skoda", "SuperB+", 16, "Taxi alapanyag.", 200000, "Használt", "http://kep.cdn.index.hu/1/0/1074/10740/107400/10740027_353219_20fbe6cc9eaed397560ecedde819d17a_wm.jpg", i++),
            new Car("Vörös Október", "T34-86", 60, "Jó jármű dugóhoz és idegen invázió esetén.", 1500000, "Használt", "https://i.ytimg.com/vi/aeKJkSFuPFQ/maxresdefault.jpg", i++)
        ];

        _.times(50, () => {
            this.cars.push(cars[Math.floor(Math.random() * cars.length)]);
        });
    }

    constructor() {
        this.cars = [];

        this.CreateRandom();
    }

    GetCars(page) {
        return this.cars.slice(page * 12, page * 12 + 12);
    }

    GetCarById(id) {
        return this.cars[id];
    }

    GetCarNumber() {
        return this.cars.length;
    }
}

module.exports = Dummydb;