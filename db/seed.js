const db = require("./");
const {shopData, treasureData} = require('../db/data/dev-data/index')
const format = require('pg-format')

const seed = ({ shopData, treasureData }) => {
	return db.query(`DROP TABLE IF EXISTS treasures;`)
		.then(() => {
			return db.query(`DROP TABLE IF EXISTS shops;`)
		})
		.then(()=>{
			return db.query(`CREATE TABLE shops(
				shop_id SERIAL PRIMARY KEY,
				shop_name VARCHAR NOT NULL,
				owner VARCHAR NOT NULL,
				slogan VARCHAR 
			);`)
		})
		.then(()=>{
			return db.query(`CREATE TABLE treasures(
				treasure_id SERIAL PRIMARY KEY,
				treasure_name VARCHAR NOT NULL,
				colour VARCHAR NOT NULL,
				age INT NOT NULL,
				cost_at_auction FLOAT NOT NULL,
				shop_id INT REFERENCES shops(shop_id)
			);`)
		})
		.then(()=>{
			return insertIntoShops(shopData)
		})
		.catch(err=>{
			return err
		})
};

function insertIntoShops(shopData){
	const formattedShops = shopData.map((shop)=>{
		return [shop.shop_name, shop.owner, shop.slogan]
	})
	const insertShopsString = format(`
	INSERT INTO shops
	(shop_name, owner, slogan)
	VALUES
	$L
	RETURNING*;`, formattedShops)
	
	
   return db.query(insertShopsString)
}

db.query(`SELECT * FROM shops;`).then(({rows})=>{
	console.log(rows)
})

module.exports = seed;
