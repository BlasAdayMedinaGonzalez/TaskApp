import axios from "axios";
import Constants from "../constants/constants"

const getUsers = async() => {
    return await axios.get(Constants.urlGetAllUsers)
}

const getTasks = async() => {
    return await axios.get(Constants.urlGetTasks)
}

export {
    getUsers,
    getTasks
}