const { orderBy } = require('lodash')
const db = require('../../db/index')
const {swapShopInfo} = require('../../utils/utils')

exports.fetchTreasures = (clientQuery) =>{
    if (!Object.hasOwn(clientQuery, 'sort_by')){
        clientQuery.sort_by = 'age'
    }

    if (!Object.hasOwn(clientQuery, 'order')){
        clientQuery.order = 'asc'
    }
    const sort_by = clientQuery.sort_by
    const order   = clientQuery.order

    const validSortBys ={
        cost: 'cost_at_auction',
        name: 'treasure_name',
        age: 'age' 
    }
    const validOrders ={
        asc: 'ASC',
        desc: 'DESC'
    }

    const validColours ={
        colour: 'gold' 
    }
    
    if(!(sort_by in validSortBys)){
        return Promise.reject({status: 400, msg: 'Invalid sort_by query'})
    }
    if(!(order in validOrders)){
        return Promise.reject({status: 400, msg: 'Invalid sort order'})
    }
    let query = `SELECT * FROM treasures`
    
    if (Object.hasOwn(clientQuery, 'colour')){
       query += ` WHERE colour = '${validColours.colour}'`
    }
    query += ` ORDER BY ${validSortBys[sort_by]} ${validOrders[order]};`

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