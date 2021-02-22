import axios from "axios";

export default class AuthService{
    async requestCode(email){
        return await axios.post(`api/v1/auth/requestCode`,{
            "Email": email
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
}