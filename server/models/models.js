const db = require('../../db/index')
const {swapShopInfo} = require('../../utils/utils')

exports.fetchTreasures = () =>{
    return db.query(`
    SELECT * FROM treasures 
    ORDER BY age ASC;
    `)
    .then(({rows}) =>{
        const treasures = rows
        return Promise.all(treasures.map((treasure)=>{
                return swapShopInfo(treasure)
                .then((result)=>{
                    return result
                })
            }))
    })
    .then((returnedTreasures) =>{
        return returnedTreasures
    })

} 