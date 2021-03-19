import axios from 'axios';

export const PhoneLogin = (params: { phone: string, password: string }) => axios.post('/login/cellphone', params);

export const getHomePageBanner = () => axios.get('/banner?type=0');

export const getHotRecommendations = () => axios.get('/personalized');

export const getPersonalizedRecommendations = () => axios.get('/recommend/resource');

export const getNewCD = () => axios.get('/top/album');

export const getTopListFastUp = () => axios.get('/playlist/detail?id=19723756');

export const getNewSongList = () => axios.get('/playlist/detail?id=3779629');

export const getOriginalList = () => axios.get('/playlist/detail?id=2884035');

export const getMusicUrl = (params: { id: number }) => axios.get(`/song/url?id=${params.id}`);

export const checkMusic = (params: {id: number}) => axios.get(`/check/music?id=${params.id}`);

export const getMusicDetail = (params: { id: number }) => axios.get(`/song/detail?ids=${params.id}`);


