let _ = require("lodash");
let mongoClient = require("mongodb")

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

    GetMarks() {
        return _.chain(this.cars).map("mark").uniq().value();
    }

    GetCarsByAgeInterval(age1, age2) {
        return _.filter(this.cars, function(e) {
            return e.age < age2 && e.age > age1;
        });
    }

    GetCarsByPriceInterval(price1, price2) {
        return _.filter(this.cars, function(e) {
            return e.age < price2 && e.age > price1;
        });
    }

    GetCarsFilterBy(filter) {
        return _.filter(this.cars, filter);
    }
}

class DB {
    constructor() {}

    GetCars(page) {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) =>
                resolve(db.collection("Cars").find({}).toArray()));
        });
    };

    GetCarById(id) {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) =>
                resolve(db.collection("Cars").find({
                    id: id
                })));
        });
    }

    GetCarNumber() {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) =>
                resolve(db.collection("Cars").length));
        });
    }


    GetMarks() {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) => {
                db.collection("Marks").find();
            });
        });
    }

    GetCarsByAgeInterval(age1, age2) {
        this.Connect().then((db) => {
            return new Promise((resolve, reject) => {
                db.collection("Cars").find({
                    age: {
                        $lte: age1,
                        $gte: age2
                    }
                })
            });
        });
    }

    GetCarsByPriceInterval(price1, price2) {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) => {
                db.collection("Cars").find({
                    age: {
                        $lte: age1,
                        $gte: age2
                    }
                })
            })
        });
    }

    Connect() {
        return new Promise((resolve, reject) => {
            mongoClient.connect("mongodb://127.0.0.1:27017", (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
    }

    GetMarks() {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) => {
                resolve(db.collection("Marks").find({}).toArray());
            }, (err) => {
                reject(err);
            });
        });
    }

    SaveMarks(mark) {
        return new Promise((resolve, reject) => {
            this.Connect().then((db) => {
                db.collection("Marks").save(mark, (err, promise) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = DB;