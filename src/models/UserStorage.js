"use strict";

const fs = require("fs").promises;

class UserStorage{
    
    static #getUserInfo(data, id){
            const users = JSON.parse(data);
            const idx = users.id.indexOf(id);
            const usersKeys = Object.keys(users); // [id, password, name]
            const userInfo = usersKeys.reduce((newUser, info) => {
                newUser[info] = users[info][idx];
                return newUser;
            },{});
        
         return userInfo;
    }

    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers; 
        }, {});
        return newUsers;
    }

    // 은닉화된 데이터를 가져오도록 하는 메소드
    static getUsers(isAll, ...fields) {
        return fs.readFile("./src/db/users.json")
          .then((data) => {
            return this.#getUsers(data, isAll, fields);
          })
          .catch(console.error);
        //const users = this.#users;
        
    }

    static getUsersInfo(id){
        //const users = this.#users;
        return fs.readFile("./src/db/users.json")
          .then((data) => {
            return this.#getUserInfo(data, id);
          })
          .catch(console.error);
    }
 

    static async save(userInfo){
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }
            users.id.push(userInfo.id);
            users.password.push(userInfo.password);
            users.name.push(userInfo.name);
            fs.writeFile("./src/db/users.json", JSON.stringify(users));
            return { success: true};
    }
}

module.exports = UserStorage;