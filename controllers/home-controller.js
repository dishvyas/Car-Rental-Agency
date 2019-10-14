const Car = require('mongoose').model('Car')

module.exports = {
    index: (req, res) => {
        let page = Number(req.query.page)
        if(Object.keys(req.query).length === 0){
            page = 0
        }
        console.log(req.query)
        let prevPage = page - 1
        let nextPage = page + 1
        Car.find({}).where('isRented').equals(false).sort({ year: -1 }).skip(page * 5).limit(5).then(allCar => {

            if (prevPage < 0) prevPage = 0

            let pageObj = {
                prevPage: prevPage,
                nextPage: nextPage
            }
            res.render('home/index', { allCar, pageObj })
        })
    },
    searchingModel: (req, res) => {
        let searchingModel = req.query.model.toLowerCase()
        let searchedCars = []
        
        Car.find({}).then(allCars => {
            for (let car of allCars) {
                car.model = car.model.toLowerCase()
                let model = car.model.split(/\s+/)
                if (model.indexOf(searchingModel) >= 0) {
                    car.newModel = car.model.replace(/\b\w/g, function(l){ return l.toUpperCase() })
                    searchedCars.push(car)
                }
            }

            res.render('query/searchingModel', { searchedCars })
        })
    },
    // about: (req, res) => {
    //     res.render('home/about');
    // },
    // contacts: (req, res) => {
    //     res.render('home/contact');
    // }
};