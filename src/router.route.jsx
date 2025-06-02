import { Routes, Route } from "react-router";
import { DashboardScreen } from "./screens";

const Router = () => {
  return (
    <Routes>
      <Route path="/"  element={<DashboardScreen />}/>
    </Routes>
  )
}

export default Router;