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
      <nav>
        <h1>MySQL - Notes</h1>
      </nav>
      {!loggedIn && <LoginForm />}
      {loggedIn && <button className="logoutBtn" onClick={logout}>Log out</button>}
    </header>

    <main>
      <Outlet></Outlet>
    </main>

    <footer>lrosenqv 2022</footer>
  </>)
}