import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { LoginForm } from "./LoginForm"
import "../styles/layout.scss"

export const Layout = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    let ls = localStorage.getItem('onlineUserKey')
    if(ls){
      setLoggedIn(true)
    }
  }, [loggedIn])

  function logout(){
    setLoggedIn(false)
    localStorage.removeItem('onlineUserKey')
    navigate('/', {replace: true})
  }

  return(<>
    <header>
      <h1><Link to="/">MySQL - Notes</Link></h1>
      {loggedIn && <nav>
        <a role="button" href="/dashboard" id="dashboardBtn">My dashboard</a>
        <button className="logoutBtn" type="submit" onClick={logout}>Log out</button>
      </nav>}
    </header>

    <main>
      <Outlet/>
      {!loggedIn && <LoginForm />}
    </main>

    <footer>lrosenqv 2022</footer>
  </>)
}