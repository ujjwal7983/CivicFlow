import React , {useContext} from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register  from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import {userDataContext} from './Context/UserContext.jsx'

function App() {
  let {userData} = useContext(userDataContext);
  return (
    <Routes>
      <Route path="/home" element={userData?<Home />:<Navigate to="/login" />} />
      <Route path="/register" element={userData?<Navigate to="/home"/>:<Register />} />
      <Route path="/login" element={userData?<Navigate to="/home"/>:<Login />} />
    </Routes>
  )
}

export default App