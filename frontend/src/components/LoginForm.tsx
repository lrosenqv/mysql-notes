import { ChangeEvent, SyntheticEvent, useState } from "react"
import { ILogin } from "../models/ILogin"
import { UserService } from "../services/UserService"
const service = new UserService()

export const LoginForm = () => {
  const [loginDetails, setLoginDetails] = useState<ILogin>({
    email: "",
    password: "",
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>){
    let name = e.target.name;
    setLoginDetails({...loginDetails, [name]: e.target.value})
  }

  function login(e: SyntheticEvent){
    e.preventDefault()
    service.loginUser(loginDetails.email, loginDetails.password)
    window.location.assign('/dashboard')
  }

  return(
    <form onSubmit={login}>
      <input type="email" placeholder="John.Doe@example.com" name="email" onChange={handleChange} />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} />
      <button type="submit">Log in</button>
    </form>
  )
}