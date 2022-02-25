"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User")

const output = {
    hello: function (request,response){
        logger.info(`Get / 200 "홈 화면으로 이동`);
        response.render("home/index");
    },

    login: function (request,response){
        logger.info(`Get /login 200 "로그인 화면으로 이동`);
        response.render("home/login");
    },

    register: function (request, response){
        logger.info(`Get /register 200 "회원가입 화면으로 이동`);
        response.render("home/register");
    }
};

const process = {
    login: async function (request, response){ 
        const user = new User(request.body);
        const res = await user.login();
        if (res.error)
            logger.error(`POST / login 200 Response: "success: ${res.success}, ${res.error}`)
        else
            logger.info(
            `POST / login 200 Response: "success: ${res.success}, message: ${res.message}"`
        );
        return response.json(res);
    },

    register: async function (request, response){
        const user = new User(request.body);
        const res = await user.register();
        if (res.error)
             logger.error(`POST / login 200 Response: "success: ${res.success}, ${res.error}`)
        else logger.info(
            `POST / login 200 Response: "success: ${response.success}, message: ${res.message}"`
        );
        return response.json(res);
    }
}
module.exports = {
    output,
    process,
};