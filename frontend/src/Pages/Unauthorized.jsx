import logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'

function Unauthorized() {
    let navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
        <div><img src={logo} className="h-[70px] w-[70px] cursor-pointer" onClick={()=>navigate("/")}/></div>
        <div><h1>403 – Access Denied</h1></div>
      <div><p>You do not have permission to access this page.</p></div>
    </div>
  );
}

export default Unauthorized;
