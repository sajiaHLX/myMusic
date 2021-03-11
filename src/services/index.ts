import axios from 'axios';

export const PhoneLogin = (params: {phone: string, password: string}) => axios.post('/login/cellphone', params)