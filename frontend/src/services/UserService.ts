import axios from "axios";
import { ILogin } from "../models/ILogin";
import { IUser } from "../models/IUser";

export class UserService{
  constructor(){}

  /*async getUser(){
    let response = await axios.get<ILogin>('http://localhost:4000/users')
    .then(data => {
      return data.data
    })

    return response
  }*/

  loginUser(emailVal: string, passVal: string){   
    axios.post('http://localhost:4000/users/login', {email: emailVal, password: passVal})
    .then((res) => {
      let userId = res.data.id
      localStorage.setItem('onlineUserKey', JSON.stringify(userId))
    })
  }

  createUser(){}
}