import axios from "axios";
import { INewUser } from "../models/INewUser";

const url = 'http://localhost:4000/users'

export class UserService{

  //Get user by id
  async getUser(id: number){
    let response = await axios.get(`${url}/${id}`)
    .then(res => {
      return res.data
    })
    return response
  }

  //Login user + set key in local storage
  async loginUser(e: string, p: string){  
    let response = await axios.post(`${url}/login`, {email: e, password: p})
    .then(res => {
        if(res.statusText === "OK"){
          localStorage.setItem('onlineUserKey', JSON.stringify(res.data))
        }
      return res.status
    })
    return response
  }

  //Create new user
  createUser(user: INewUser){
    axios.post<INewUser>(`${url}`, user)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => { console.error(err);
    })
  }
}