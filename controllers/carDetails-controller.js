const Car = require('mongoose').model('Car')
const User = require('mongoose').model('User')
const RentedCarInfo = require('mongoose').model('RentedCarInfo')

module.exports = {
    viewDetails: (req, res) => {

        let id = req.params.id
        Car.findById(id).then(foundCar => {
            res.render('carDetails', { foundCar })
        })
    },
    takeCar: (req, res) => {
        let id = req.body.carId
        let userId = req.user._id   
        let RentedCarInfoObj = {}   

        Car.findById(id).then(foundCar => {
            User.findById(userId).then(user => {
                user.rentedCars.push(foundCar._id)
                user.save().then(()=>{
                    foundCar.isRented = true
                    foundCar.save().then(()=>{
                        RentedCarInfoObj={
                            car: foundCar._id,
                            user: userId,
                            date: req.body.dateOfRental,
                            days: req.body.daysOfRental
                        }

                        console.log(RentedCarInfoObj)
                        RentedCarInfo.create(RentedCarInfoObj).then(()=>{
                            res.send('Sucess!')
                        })
                    })
                })
            })
        })  
    }
}

