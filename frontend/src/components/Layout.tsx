import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { LoginForm } from "./LoginForm"

export const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    let ls = localStorage.getItem('onlineUserKey')
    if(ls){
      setLoggedIn(true)
    }
  }, [])

  function logout(){
    setLoggedIn(false)
    localStorage.removeItem('onlineUserKey')
  }

  return(<>
    <header>
      <h1>MySQL - Notes</h1>
      {loggedIn && <button className="logoutBtn" onClick={logout}>Log out</button>}
    </header>

    <main>
      {!loggedIn && <LoginForm />}
      {loggedIn && <Outlet></Outlet>}
    </main>

    <footer>lrosenqv 2022</footer>
  </>)
}