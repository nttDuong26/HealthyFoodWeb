import axios from "axios";


export const LoginUser = async (data) => {
    const apiUrl = "http://localhost:3000/v1/api";
    const res = await axios.post(`${apiUrl}/User/signin`);
    return res.data;
}