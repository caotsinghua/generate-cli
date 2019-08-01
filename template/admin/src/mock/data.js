import Mock from 'mockjs';

export function getArticles() {
    return Mock.mock({
        'data|15-40': [
            {
                id: '@increment',
                title: '@ctitle(5,15)',
                author: '@cname',
                publishTime: '@datetime',
                updateTime: '@datetime',
                readed: '@integer(10,10000)'
            }
        ]
    });
}
