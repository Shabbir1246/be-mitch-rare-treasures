const db = require('../../db/index')
const {swapShopInfo} = require('../../utils/utils')

exports.fetchTreasures = (sort_by = 'age') =>{
    const validSortBys ={
        cost: 'cost_at_auction',
        name: 'treasure_name',
        age: 'age' 
    }
    if(!(sort_by in validSortBys)){
        return Promise.reject({status: 400, msg: 'Invalid sort_by query'})
    }
    let query = `SELECT * FROM treasures`
    query += ` ORDER BY ${validSortBys[sort_by]} ASC`

    return db.query(query)
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