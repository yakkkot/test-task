import {axiosServices} from "./axios.services";
import {urls} from "../configs/urls"

export const apiServices = {
    getAvailableCountries: () => axiosServices.get(urls.availableCountries),
    getPublicHolidays: (code) => axiosServices.get(`${urls.publicHolidays}/${code}`),
};

