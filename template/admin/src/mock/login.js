// import { getParams } from '@/libs/util';
const USER_MAP = {
    super_admin: {
        name: 'super_admin',
        user_id: '1',
        access: ['super_admin', 'admin'],
        token: 'super_admin',
        avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    },
    admin: {
        name: 'admin',
        user_id: '2',
        access: ['admin'],
        token: 'admin',
        avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
};

export const login = req => {
    req = JSON.parse(req.body);
    return { token: USER_MAP[req.userName || 'super_admin'].token };
};

export const getUserInfo = () => {
    // console.log(req);
    // const params = req.url && getParams(req.url);
    // return USER_MAP[params.token || 'super_admin'];
    return USER_MAP['super_admin'];
};

export const logout = () => {
    return null;
};

export const getUserStatus = () => {
    return {
        success: true,
        data: USER_MAP['super_admin']
    };
};
