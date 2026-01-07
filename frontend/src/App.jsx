import React , {useContext} from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register  from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import {userDataContext} from './Context/UserContext.jsx'
import Citizen from './Pages/Citizen.jsx'

function App() {
  let {userData} = useContext(userDataContext);
  return (
    <Routes>
      <Route path="/citizen" element={userData?<Citizen />:<Navigate to="/login" />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={userData?<Navigate to="/citizen"/>:<Register />} />
      <Route path="/login" element={userData?<Navigate to="/citizen"/>:<Login />} />
    </Routes>
  )
}

export default App