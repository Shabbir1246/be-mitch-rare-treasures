const {shopData, treasureData} = require('../db/data/dev-data/index')

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
