"use strict";

class UserStorage{
    static #users = {
        id: ["minjae","rkdalswo1021", "mj991021"],
        password: ["1234","12345","123456"],
        name: ["민재", "강민재", "강민재2"]
    };

    // 은닉화된 데이터를 가져오도록 하는 메소드
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers; 
        }, {});
        return newUsers;
    }

    static getUsersInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        },{});
    
     return userInfo;
    }

    static save(userInfo){
        const users = this.#users;
        users.id.push(userInfo.id);
        users.password.push(userInfo.password);
        users.name.push(userInfo.name);
        console.log(users);
    }
}

module.exports = UserStorage;