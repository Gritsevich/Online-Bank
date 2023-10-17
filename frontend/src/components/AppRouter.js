import React, { Component, useContext } from "react";
import {Route, Navigate, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes/routes";
import { MAINWEBSITE_ROUTE } from "../utils/consts";
import { Context } from "..";

const AppRouter = () => {
  const {user} = useContext(Context)
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} Component={Component} exact/>
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} Component={Component} exact/>
      )}
      <Route path='*' element={<Navigate to={MAINWEBSITE_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter;