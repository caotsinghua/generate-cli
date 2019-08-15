import axios from './axios';

export const postPet=(data)=>{
    return axios.request({
        url:`/pet`,
        method:'post',
        params:{},
        data:{}
    })
}
export const putPet=(data)=>{
    return axios.request({
        url:`/pet`,
        method:'put',
        params:{},
        data:{}
    })
}
export const getPetFindByStatus=(data)=>{
    return axios.request({
        url:`/pet/findByStatus`,
        method:'get',
        params:{},
        data:{}
    })
}
export const getPetFindByTags=(data)=>{
    return axios.request({
        url:`/pet/findByTags`,
        method:'get',
        params:{},
        data:{}
    })
}
export const getPetByPetId=(data)=>{
    return axios.request({
        url:`/pet/${data.petId}`,
        method:'get',
        params:{},
        data:{}
    })
}
export const postPetByPetId=(data)=>{
    return axios.request({
        url:`/pet/${data.petId}`,
        method:'post',
        params:{},
        data:{}
    })
}
export const deletePetByPetId=(data)=>{
    return axios.request({
        url:`/pet/${data.petId}`,
        method:'delete',
        params:{},
        data:{}
    })
}
export const postPetByPetIdUploadImage=(data)=>{
    return axios.request({
        url:`/pet/${data.petId}/uploadImage`,
        method:'post',
        params:{},
        data:{}
    })
}
export const getStoreInventory=(data)=>{
    return axios.request({
        url:`/store/inventory`,
        method:'get',
        params:{},
        data:{}
    })
}
export const postStoreOrder=(data)=>{
    return axios.request({
        url:`/store/order`,
        method:'post',
        params:{},
        data:{}
    })
}
export const getStoreOrderByOrderId=(data)=>{
    return axios.request({
        url:`/store/order/${data.orderId}`,
        method:'get',
        params:{},
        data:{}
    })
}
export const deleteStoreOrderByOrderId=(data)=>{
    return axios.request({
        url:`/store/order/${data.orderId}`,
        method:'delete',
        params:{},
        data:{}
    })
}
export const postUser=(data)=>{
    return axios.request({
        url:`/user`,
        method:'post',
        params:{},
        data:{}
    })
}
export const postUserCreateWithArray=(data)=>{
    return axios.request({
        url:`/user/createWithArray`,
        method:'post',
        params:{},
        data:{}
    })
}
export const postUserCreateWithList=(data)=>{
    return axios.request({
        url:`/user/createWithList`,
        method:'post',
        params:{},
        data:{}
    })
}
export const getUserLogin=(data)=>{
    return axios.request({
        url:`/user/login`,
        method:'get',
        params:{},
        data:{}
    })
}
export const getUserLogout=(data)=>{
    return axios.request({
        url:`/user/logout`,
        method:'get',
        params:{},
        data:{}
    })
}
export const getUserByUsername=(data)=>{
    return axios.request({
        url:`/user/${data.username}`,
        method:'get',
        params:{},
        data:{}
    })
}
export const putUserByUsername=(data)=>{
    return axios.request({
        url:`/user/${data.username}`,
        method:'put',
        params:{},
        data:{}
    })
}
export const deleteUserByUsername=(data)=>{
    return axios.request({
        url:`/user/${data.username}`,
        method:'delete',
        params:{},
        data:{}
    })
}
