const _ = require("lodash");
const mongoClient = require("mongodb");

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

class FilterItem {
    constructor(name, values, id) {
        this.name = name;
        this.value = values;
        this.id = id;
    }
}

class Filter {
    constructor(name, label, values, filterFn) {
        this.label = label;
        this.name = name;
        this.values = values.map((e) => {
            e.value = JSON.stringify(filterFn(...e.value))
            return e;
        });
    }
}

class DB {
    constructor() {}

    InitTestData() {
        return this.Reset().then(() => {
            return this.InsertDefaultData();
        });
    }

    InsertDefaultData() {
        return this.Connect().then(db => {
            let data = this.GetDefault();

            _.forEach(data, (e, key) => {
                e.forEach((e2) => {
                    db.collection(key).save(e2);
                });
            });
        });
    }

    Reset() {
        return this.Connect().then(db => {
            return db.dropDatabase();
        });
    }

    GetDefault() {
        function priceCategs() {
            return _.times(10, (e) => {
                let a = (e * 500000);
                let b = ((e + 1) * 500000);
                let name = a + " Ft - " + b + " Ft";
                let ret = new FilterItem(name, [a, b], e);

                return ret;
            });
        }

        function states() {
            return [
                new FilterItem("Használt", ["Használt"], 0),
                new FilterItem("Újszerű", ["Újszerű"], 1),
                new FilterItem("Új", ["Új"], 2)
            ];
        }

        function marks() {
            let i = 0;

            return [
                new FilterItem("Lexus", ["Lexus"], i++),
                new FilterItem("Audi", ["Audi"], i++),
                new FilterItem("Nissan", ["Nissan"], i++),
                new FilterItem("Toyota", ["Toyota"], i++),
                new FilterItem("Bmw", ["Bmw"], i++),
                new FilterItem("Skoda", ["Skoda"], i++),
                new FilterItem("Vörös Október", ["Vörös Október"], i++)
            ];
        }

        function cars() {
            let i = 0

            const cars = [
                new Car("Lexus", "LC", 3, "Menőbb kocsi", 500000, "Új", "http://www.gadgetreview.com/wp-content/uploads/2012/01/lexus-lf-lc.jpg", i++),
                new Car("Audi", "A8", 5, "Kicsit menőbb kocsi.", 800000, "Új", "http://media.caranddriver.com/images/16q1/665019/2016-audi-a8l-40t-sport-test-review-car-and-driver-photo-666706-s-429x262.jpg", i++),
                new Car("Nissan", "Naletro", 12, "Átlagos kocsi.", 150000, "Új", "http://www.nissanhovany.hu/media/picture/thumb/xphoto-26-265564.jpg.pagespeed.ic.-3RTft_yM2.jpg", i++),
                new Car("Toyota", "Prius", 10, "Egy kocsi", 150000, "Új", "https://images.toyota-europe.com/hu/prius/width/1200/exterior-right-front.jpg", i++),
                new Car("Bmw", "PZ4", 60, "A tökéletes jármű dugóhoz.", 6000000, "Használt", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Pz-IVG-latrun-2.jpg/300px-Pz-IVG-latrun-2.jpg", i++),
                new Car("Skoda", "SuperB+", 16, "Taxi alapanyag.", 200000, "Újszerű", "http://kep.cdn.index.hu/1/0/1074/10740/107400/10740027_353219_20fbe6cc9eaed397560ecedde819d17a_wm.jpg", i++),
                new Car("Vörös Október", "T34-86", 60, "Jó jármű dugóhoz és idegen invázió esetén.", 1500000, "Használt", "https://i.ytimg.com/vi/aeKJkSFuPFQ/maxresdefault.jpg", i++)
            ];

            return _.times(100, (e) => {
                let car = Object.assign({}, cars[Math.floor(Math.random() * cars.length)]);
                car.id = e;

                return car;
            });
        }

        return {
            cars: cars(),
            filters: [
                new Filter("price", "Ár tartomány", priceCategs(), (a, b) => {
                    return {
                        price: {
                            $gt: a,
                            $lt: b
                        }
                    }
                }),
                new Filter("state", "Állapot", states(), (a) => {
                    return {
                        state: a
                    }
                }),
                new Filter("mark", "Márka", marks(), (a) => {
                    return {
                        mark: a
                    };
                }),
            ]
        }
    }

    GetCars(page, filters, count) {
        return this.Connect().then((db) => {

            //lekéri az objekteket
            let promises = _.map(filters, (e, k) => {
                return db.collection("filters").findOne({
                    name: k
                });
            });

            return Promise.all(promises).then((results) => {
                let query = results.filter(e => e !== null).reduce((prev, curr) => {
                    let value = filters[curr.name];
                    let query = JSON.parse(curr.values[value].value);

                    return Object.assign(prev, query);
                }, {});

                let selected = db.collection("cars").find(query);

                return Promise.all([selected.skip(page * count).limit(count).toArray(), selected.count()]).then((results) => {
                    let res = results[0];
                    res.count = results[1];

                    return Promise.resolve(res);
                }).catch((e) => {
                    return Promise.reject(e);
                });
            });
        });
    }

    GetCarNumber() {
        return this.Connect().then((db) => {
            return db.collection("cars").count();
        });
    }

    GetCarById(id) {
        return this.Connect().then((db) => {
            return db.collection("cars").findOne({
                id: Number.parseInt(id)
            });
        });
    }

    Connect() {
        return mongoClient.connect("mongodb://127.0.0.1:27017");
    }

    SaveCar(car) {
        return this.Connect().then((db) => {
            return db.collection("Car").save(car);
        });
    }

    GetFilters() {
        return this.Connect().then((db) => {
            return Promise.resolve(db.collection("filters").find().toArray());
        });
    }
}

module.exports = DB;