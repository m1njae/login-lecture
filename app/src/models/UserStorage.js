"use strict";

const db = require("../config/db");

class UserStorage{
    
    static getUsersInfo(id){
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM users WHERE id=?;";
            db.query(query,[id], (error, data) =>{
                if (error) reject(`${error}`);
                else resolve(data[0]);
            });
        });
        
    }
 

    static async save(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(id, password, name) VALUES(?, ?, ?);";
            db.query(query,
                [userInfo.id, userInfo.password, userInfo.name], 
                (error) =>{
                if (error) reject(`${error}`);
                resolve({success: true});
            });
        });   
    }
}

module.exports = UserStorage;