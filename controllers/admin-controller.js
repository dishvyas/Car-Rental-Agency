const Car = require('mongoose').model('Car')


module.exports = {
    addCarGet: (req, res) => {
        res.render('admin/addCar');
    },
    addCarPost:(req, res)=>{
        
        let newCar ={
            model: req.body.model,
            image: req.body.image,
            price: req.body.price,
            year: req.body.year,
            creationDate: Date.now()
        }

        Car.create(newCar).then((obj)=>{
            console.log(obj)
            res.redirect('/')
        })
    },

  
    updateCar : (req, res) => {
        // Validate Request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Car content can not be empty"
            });
        }
    
        // Find Car and update it with the request body
        Car.findByIdAndUpdate(req.params.id, {
            model: req.body.model,
            image: req.body.image,
            price: req.body.price,
            year: req.body.price
        }, {new: true})
        .then(car => {
            if(!car) {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.id});
            }
            res.send(car);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating car with id " + req.params.id
            });
        });
    },

    deleteCar : (req, res) => {
        Car.findByIdAndRemove(req.params.id)
        .then(car => {
            if(!car) {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.id
                });
            }
            res.send({message: "Car deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Could not delete car with id " + req.params.id
            });
        });
    },
}
