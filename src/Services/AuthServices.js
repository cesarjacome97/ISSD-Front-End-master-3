import axios from 'axios';
import { authApi } from '../Config/apiUrl';

const login = (data) => axios.post(`${authApi}/api/auth/login`, data);

const AuthServices = {
    login
}

export default AuthServices;