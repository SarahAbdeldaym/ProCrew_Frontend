import * as Urls from "../Routing/Urls";

let userData = JSON.parse(localStorage.getItem("userData")) || {};
let userToken = userData.token;
const axios = require("axios");

export const getUsers = () => {
  return axios({
    method: "get",
    url: `${Urls.backendUrl}/users`,
    headers: { Authorization: `Bearer ${userToken}` },
  }).then((res) => {
    return res.data.data;
  });
};

export const getRequestedUser = (userId) => {
	return axios({
	  method: "get",
	  url: `${Urls.backendUrl}/users/${userId}`,
	  headers: { Authorization: `Bearer ${userToken}` },
	}).then((res) => {
		console.log(res.data.data);
	  return res.data.data;
	});
  };
  
export const formRequest = (path, method, formData=null) => {
  return axios({
    method: method,
    url: `${Urls.backendUrl}/${path}`,
    data: formData,
    headers: { Authorization: `Bearer ${userToken}` },
  });
};
