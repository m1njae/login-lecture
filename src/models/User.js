"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    async login() {
        const client = this.body;
        const { id, password } = await UserStorage.getUsersInfo(client.id);
        
        if (id) {
            if (id === client.id && password === client.password){
                return {success: true};
            }
            return {success: false, message: "비밀번호가 틀렸습니다."};
        }
        return {success: false, message: "등록되지 않은 아이디입니다."};

        // const id = request.body.id,
        //     password = request.body.password
        // const users = UserStorage.getUsers("id", "password");
        // const res = {};
        // if (users.id.includes(id)) {
        //     const idx = users.id.indexOf(id);
        //     if (users.password[idx] === password){
        //         res.success = true;
        //         return response.json(res);
        //     }
        // }

        // res.success = false;
        // res.message = "아이디 또는 비밀번호가 일치하지 않습니다."
        // return response.json(res);
    }

    async register() {
        const client = this.body;
        try{
        const response = await UserStorage.save(client);
        return response;
        } catch(error){
            return { success: false, message: error};
        }
    }
}

module.exports = User;