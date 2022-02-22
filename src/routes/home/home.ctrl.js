"use strict";

const User = require("../../models/User")

const output = {
    hello: function (request,response){
        response.render("home/index");
    },

    login: function (request,response){
        response.render("home/login");
    },

    register: function (request, response){
        response.render("home/register");
    }
};

const process = {
    login: function (request, response){ 
        const user = new User(request.body);
        const res = user.login();
        return response.json(res);
    },

    register: function (request, response){
        const user = new User(request.body);
        const res = user.register();
        return response.json(res);
    }
}
module.exports = {
    output,
    process,
};