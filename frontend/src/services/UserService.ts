import axios from "axios";

export class UserService{

  //Login user + set key in local storage
  async loginUser(email: string, pass: string){  
    let response = await axios.post('http://localhost:4000/users/login', {email: email, password: pass})
    .then(res => {
        if(res.statusText === "OK"){
          localStorage.setItem('onlineUserKey', JSON.stringify(res.data))
        }
      return res.status
    })
    return response
  }




  createUser(){}
}