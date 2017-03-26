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
    constructor(name, values) {
        this.name = name;
        this.value = values;
    }
}

class Filter {
    constructor(name, label, values, filterFn) {
        this.label = label;
        this.name = name;
        this.values = values;
        this.filter = filterFn;
    }

    Filter(a, b) {
        return filter(a, b);
    }
}

class DB {
    constructor() {
        this._InitTestData().catch((e) => {
            console.assert(e);
        });

        function priceCategs() {
            return _.times(10, (e) => {
                let name = (e * 500000) + " Ft - " + ((e + 1) * 500000) + " Ft";
                let ret = new FilterItem(name, e);

                return ret;
            });
        }

        function states() {
            return [
                new FilterItem("Használt", 0),
                new FilterItem("Újszerű", 1),
                new FilterItem("Új", 2)
            ];
        }

        function marks() {
            let i = 0;

            return [
                new FilterItem("Lexus", i++),
                new FilterItem("Audi", i++),
                new FilterItem("Nissan", i++),
                new FilterItem("Toyota", i++),
                new FilterItem("Bmw", i++),
                new FilterItem("Skoda", i++),
                new FilterItem("Vörös Október", i++)
            ];
        }

        this.cars = [
            new Car("Lexus", "LC", 3, "Menőbb kocsi", 500000, "Új", "http://www.gadgetreview.com/wp-content/uploads/2012/01/lexus-lf-lc.jpg", i++),
            new Car("Audi", "A8", 5, "Kicsit menőbb kocsi.", 800000, "Új", "http://media.caranddriver.com/images/16q1/665019/2016-audi-a8l-40t-sport-test-review-car-and-driver-photo-666706-s-429x262.jpg", i++),
            new Car("Nissan", "Naletro", 12, "Átlagos kocsi.", 150000, "Új", "http://www.nissanhovany.hu/media/picture/thumb/xphoto-26-265564.jpg.pagespeed.ic.-3RTft_yM2.jpg", i++),
            new Car("Toyota", "Prius", 10, "Egy kocsi", 150000, "új", "https://images.toyota-europe.com/hu/prius/width/1200/exterior-right-front.jpg", i++),
            new Car("Bmw", "PZ4", 60, "A tökéletes jármű dugóhoz.", 6000000, 'Használt', "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Pz-IVG-latrun-2.jpg/300px-Pz-IVG-latrun-2.jpg", i++),
            new Car("Skoda", "SuperB+", 16, "Taxi alapanyag.", 200000, "Használt", "http://kep.cdn.index.hu/1/0/1074/10740/107400/10740027_353219_20fbe6cc9eaed397560ecedde819d17a_wm.jpg", i++),
            new Car("Vörös Október", "T34-86", 60, "Jó jármű dugóhoz és idegen invázió esetén.", 1500000, "Használt", "https://i.ytimg.com/vi/aeKJkSFuPFQ/maxresdefault.jpg", i++)
        ];

        this.filters = [
            new Filter("price", "Ár tartomány", priceCategs(), (a, b) => {
                return {
                    $gt: a,
                    $lt: b
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
            })
        ];
    }

    _InitTestData() {
        return this.Reset().then(() => {
            return this._InsertDefaultData();
        }, (e) => {
            return Promise.reject(e);
        });
    }

    _InsertDefaultData() {
        return new Promise((resolve, reject) => {
            this.Connect().then(db => {
                let data = this.GetDefault();

                _.forEach(data, (e, key) => {
                    _.forEach(e, (e2) => {
                        db.collection(key).save(e2);
                    }, (err) => {
                        reject(err);
                    });
                });

                resolve();

            }, (err) => {
                reject(err);
            });

        });
    }

    _Reset() {
        return new Promise((resolve, reject) => {
            this.Connect().then(db => {
                db.dropDatabase().then(() => {
                    resolve();
                }, () => {
                    reject();
                });
            }, (e) => {
                reject(e);
            });
        });
    }

    GetCars(page, filters, count) {
        return new Promise((resolve, reject) => {
            return _.filter(this.cars, filters)
        });
    }

    GetCarById(id) {
        return new Promise((resolve, reject) => {

        });
    }

    GetCarNumber() {
        return new Promise((resolve, reject) => {

        });
    }

    SaveCar(car) {
        return new Promise((resolve, reject) => {

        });
    }

    GetFilters() {
        return new Promise((resolve, reject) => {

        })
    }
}

module.exports = DB;