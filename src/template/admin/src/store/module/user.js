import { login, logout, getUserInfo } from '@/api/user';
import { setToken, getToken } from '@/libs/util';

const state = {
    userInfo: {},
    token: getToken(),
    access: '',
    hasGetInfo: false
};

const mutations = {
    setUserInfo(state, { name, user_id, avatar }) {
        Object.assign(state.userInfo, {
            userName: name,
            userId: user_id,
            avatar
        });
    },
    setAccess(state, access) {
        state.access = access;
    },
    setToken(state, token) {
        // 设置token到cookie
        state.token = token;
        setToken(token);
    },
    setHasGetInfo(state, status) {
        state.hasGetInfo = status;
    }
};
const actions = {
    // 登录
    async handleLogin({ commit }, loginData) {
        const { data } = await login(loginData);
        commit('setToken', data.token);
        return data;
    },

    // 退出登录
    async handleLogOut({ state, commit }) {
        const { data } = await logout();
        commit('setToken', '');
        commit('setAccess', []);
        return data;
    },
    // 获取用户相关信息
    async getUserInfo({ state, commit }) {
        const { data } = await getUserInfo();
        commit('setUserInfo', data);
        commit('setAccess', data.access);
        commit('setHasGetInfo', true);
        return data;
    }
};

export default {
    namespaced: false,
    state,
    mutations,
    actions
};
