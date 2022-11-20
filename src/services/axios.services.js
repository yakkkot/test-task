import axios from "axios";
import {baseURL} from "../configs/urls";

export const axiosServices = axios.create({baseURL})
