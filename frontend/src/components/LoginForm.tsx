import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IUserLogin } from "../models/IUserLogin"
import { UserService } from "../services/UserService"

const service = new UserService()

export const LoginForm = () => {
  const [loginValues, setLoginValues] = useState<IUserLogin>({
    email: "",
    password: "",
  })
  const [showErrMsg, setShowErrMsg] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>){
    let name = e.target.name;
    setLoginValues({...loginValues, [name]: e.target.value})
    setShowErrMsg(false)
  }

  function login(e: SyntheticEvent){
    e.preventDefault()
    service.loginUser(loginValues.email, loginValues.password)
    .then(data => {
      if(data === 200){
        window.location.assign('/dashboard')
      }
    })
    .catch(err => { 
      setShowErrMsg(true)
      console.error(err)
    })
  }

  return(<>
    <form onSubmit={login} id="loginForm">
      <input type="email" placeholder="John.Doe@example.com" name="email" onChange={handleChange} />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} />
      <button type="submit">Log in</button>
    </form>
    {showErrMsg && <div>Wrong email or password</div>}
  </>)
}