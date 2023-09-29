const {fetchTreasures} = require('../models/models')

exports.getTreasures = (req, res, next) =>{
    return fetchTreasures() 
    .then((treasures) => {
        res.status(200).send({treasures})
    })
}