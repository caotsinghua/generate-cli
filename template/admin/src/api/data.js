import axios from '@/libs/api.request';
export const getArticles = params =>
    axios.request({
        url: 'articles',
        params
    });
export const updateArticle = data => {
    return data;
};
export const deleteArticle = id => {
    return id;
};
export const createArticle = data => {
    return data;
};
export const getArticle = () => {
    return {};
};
