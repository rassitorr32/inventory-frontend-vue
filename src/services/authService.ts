import inventoryDb from "@/api/inventoryDb";
import { handleAxiosError } from "@/helpers/handle-axios-error";
//poner type
//poner type
import type { IUser, ILoginResponse } from "@/interface";


async function login(email:string, password:string) {
    try {
        //{ data } para q solo devuelva la data y no informacion extra
        const {data} = await inventoryDb.post<ILoginResponse>('/auth/login',{email,password});
        console.log(data);
        return data;
    } catch (error) {
        handleAxiosError(error);     
        console.log(error);
    }
}

async function validate(token:string)
{
    try {
        const {data} = await inventoryDb.get<IUser>('/auth/user',{
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        })
        return data;
    } catch (error) {
        handleAxiosError(error);   
    }
}

export default {
    login,
    validate
}