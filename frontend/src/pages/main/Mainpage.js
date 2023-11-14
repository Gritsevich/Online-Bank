import React from "react";
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Homepage from "./homepage";
import MainWebsite from "./mainwebsite";

const Mainpage = observer(() => {

  const {user} = useContext(Context)

  return (
    <div>
      {user.isAuth  ? <Homepage/> : <MainWebsite/>}
    </div>
  )
})

export default Mainpage;