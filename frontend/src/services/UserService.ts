import axios from "axios";

const url = 'http://localhost:4000/users'

export class UserService{
  //Get userId from local storage
  getLSKey(){
    let ls = localStorage.getItem('onlineUserKey') || "";
    if(ls){
      ls = JSON.parse(ls)
    }
    return Number(ls)
  }

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

  /* Not implemented in app yet 
  //Create new user
  createUser(user: IUserLogin){
    axios.post<IUserLogin>(`${url}`, user)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => { console.error(err);
    })
  }
  */
}