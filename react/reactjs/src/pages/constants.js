import { useState } from "react";
import axios from "axios";

export const URL = "localhost:3000/tixsys";
export const API_URL = "http://127.0.0.1:5000";
export const app = axios.create({baseURL: API_URL});

const refreshToken = () => {
    let activeUser = JSON.parse(localStorage.getItem("app_user"));
    let getUserFormData = new FormData();
    getUserFormData.append("grant_type", "refresh_token");
    getUserFormData.append("refresh_token", activeUser.refreshToken);
    return new Promise((resolve, reject) => {
        app
        .post(`${URL}/token/url/`, getUserFormData, {
            headers: {
                Authorization: "Basic {secret_key}"
            }
        })
        .then(async response =>{
            resolve(response);
        })
        .catch(error => {
            reject(error);
        })
    })

}