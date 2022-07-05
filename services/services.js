import axios from "axios";
import Constants from "../constants/constants"

const getUsers = async() => {
    return await axios.get(Constants.urlGetAllUsers)
}

const addUser = async() => {
    return await axios.post(`${APIURL}/employee`, employee)
}

export {
    getUsers,
    addUser
}