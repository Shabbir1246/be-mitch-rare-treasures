const {shopData, treasureData} = require('../db/data/dev-data/index')
const db = require('../db/index')

exports.formatData = (data) =>{
    const formattedData = data.map((item) => {
        return Object.values(item);
    });
    return formattedData;
}

exports.formatTreasuresData = (insertedShops, treasures) =>{
    const formattedTreasures = treasures.map((treasure)=>{
        const treasureShop = insertedShops.find((shop)=>{
            return shop.shop_name === treasure.shop
        })
        return [treasure.treasure_name, treasure.colour, treasure.age, treasure.cost_at_auction, treasureShop.shop_id ]
    }) //map
    return formattedTreasures

}

exports.swapShopInfo = (treasure) =>{
    const shopId = treasure.shop_id
    const queryString = `SELECT shop_name FROM shops
                         WHERE shop_id = $1;`
    return db.query(queryString, [shopId])
            .then(({rows}) =>{
                    return {treasure_id: treasure.treasure_id, treasure_name: treasure.treasure_name, colour: treasure.colour, 
                           age: treasure.age, cost_at_auction: treasure.cost_at_auction, shop_name: rows[0].shop_name}

            })
}
