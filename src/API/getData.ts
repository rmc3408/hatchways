import axios from "axios";

export const getData = () => {
    const result = axios.get('https://api.hatchways.io/assessment/students')
        .then((res) => res.data.students);
    return result;
}  