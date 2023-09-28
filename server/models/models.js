const db = require('../db/index')
exports.fetchTreasures = () =>{
    return db.query(`
    SELECT * FROM treasures 
    ORDER BY age ASC;
    `)
    .then(({rows}) =>{
        const treasures = rows
        return treasures
    })

} 