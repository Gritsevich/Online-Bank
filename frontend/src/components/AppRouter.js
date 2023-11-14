import React, { Component, useContext } from "react";
import {Route, Navigate, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes/routes";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { MAIN_ROUTE } from "../utils/consts";

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} Component={Component} exact/>
      ) }
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} Component={Component} exact/>
      ) }
      <Route path='*' element={<Navigate to={MAIN_ROUTE} />} /> 
                   
    </Routes>
  )
})

export default AppRouter;