const {fetchTreasures} = require('../models/models')

exports.getTreasures = (req, res, next) =>{
    const clientQuery = req.query
    return fetchTreasures(clientQuery) 
    .then((treasures) => {
        res.status(200).send({treasures})
    })
    .catch((err)=>{
        next(err)

    })
}