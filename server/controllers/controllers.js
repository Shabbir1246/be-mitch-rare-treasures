const {fetchTreasures} = require('../models/models')

exports.getTreasures = (req, res, next) =>{
    const {sort_by} = req.query
    return fetchTreasures(sort_by) 
    .then((treasures) => {
        res.status(200).send({treasures})
    })
    .catch((err)=>{
        next(err)

    })
}