import axios from 'axios';

export const PhoneLogin = (params: { phone: string, password: string }) => axios.post('/login/cellphone', params);

export const getHomePageBanner = () => axios.get('/banner?type=0');

export const getHotRecommendations = () => axios.get('/personalized');

export const getPersonalizedRecommendations = () => axios.get('/recommend/resource');

export const getNewCD = () => axios.get('/top/album');

export const getPlayList = (params: { id: number }) => axios.get(`/playlist/detail?id=${params.id}`)

export const getMusicUrl = (params: { id: number }) => axios.get(`/song/url?id=${params.id}`);

export const checkMusic = (params: { id: number }) => axios.get(`/check/music?id=${params.id}`);

export const getMusicDetail = (params: { id: number }) => axios.get(`/song/detail?ids=${params.id}`);

export const getCommentList = (params: { id: number, pageNo?: number }) => axios.get(`/comment/playlist?id=${params.id}&offset=${params?.pageNo || ''}`);

export const getSongCommentList = (params: { id: number, pageNo?: number }) => axios.get(`/comment/music?id=${params.id}&offset=${params?.pageNo || ''}`);

export const getRecommendSongs = () => axios.get('/recommend/songs');

export const sendComment = (params: {
  t: number,          // 1 发送, 2 回复
  type: number,       // 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number,         // 对应资源 id
  content: string,    // 要发送的内容
  commentId?: string,  // 回复的评论id (回复评论时必填)
}) => axios.get(`/comment?t=${params.t}&type=${params.type}&id=${params.id}&content=${params.content}&commentId=${params.commentId || ''}`);

export const commentLike = (params: {
  t: number,          // 是否点赞 ,1 为点赞 ,0 为取消点赞
  type: number,       // 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number,         // 对应资源 id
  cid: number,        // 评论id
}) => axios.get(`/comment/like?t=${params.t}&type=${params.type}&id=${params.id}&&cid=${params.cid}`);



