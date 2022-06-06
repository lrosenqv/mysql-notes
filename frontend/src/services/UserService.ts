import axios from "axios";

export class UserService{

  loginUser(emailVal: string, passVal: string){   
    axios.post('http://localhost:4000/users/login', {email: emailVal, password: passVal})
    .then((res) => {
      let userId = res.data.id
      localStorage.setItem('onlineUserKey', JSON.stringify(userId))
    })
  }

  createUser(){}
}