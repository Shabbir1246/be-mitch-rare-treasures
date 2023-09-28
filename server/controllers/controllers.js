const {fetchTreasures} = require('../models/models')

exports.getTreasures = () =>{
    return fetchTreasures() 
    .then((treasures) => {
        res.status(200).send({treasures})
    })
}