import React from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/bar/Navbar';
import { useEffect, useContext } from 'react';
import { check } from './http/userAPI';
import { Context } from './index';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  const {user} = useContext(Context)

  useEffect(() => {
    check().then(data => {
        user.setUser(data.user)
        user.setIsFTwoA(data.f2a)
        user.setIsAuth(true)   
    }).catch((reason) => {
      if(reason.response.status === 401)
      {
        user.setUser({})
        user.setIsFTwoA(false)
        user.setIsAuth(false)
        localStorage.setItem('token', '')
      }else{
        alert(reason.response.data.message)
      }
    })
}, [])

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;
