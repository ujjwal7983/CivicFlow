import {useContext, useEffect, useState} from 'react';
import {authDataContext} from '../Context/AuthContext';
import axios from 'axios'

function DataPanel() {
    let {serverUrl} = useContext(authDataContext);
    let [users, setUsers] = useState(0);
    let [officers, setOfficers] = useState(0);
    let [solved, setSolved] = useState(0);
    let [unsolved, setUnsolved] = useState(0);

    const getData = async () =>{
        try {
            let res = await axios.get(serverUrl+"/api/grievances/getData",{withCredentials:true});
            setUsers(res.data.citizenCount);
            setOfficers(res.data.officersCount);
            setSolved(res.data.solvedCount);
            setUnsolved(res.data.unSolvedCount);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    })

  return (
    <div className="w-full mt-8 flex justify-center items-center gap-4">
      <div className="bg-red-500 h-[100px] w-[20%] rounded-md 
      text-white flex flex-col justify-center items-center">
        <div className="text-[45px] font-bold">{unsolved}</div>
        <div className="md:text-[20px] text-[10px] font-semibold text-center">Pending Grievances</div>
      </div>

      <div className="bg-green-400 h-[100px] w-[20%] rounded-md 
      text-white flex flex-col justify-center items-center">
        <div className="text-[45px] font-bold">{solved}</div>
        <div className="md:text-[20px] text-[10px] font-semibold text-center">Solved Grievances</div>
      </div>

      <div className="bg-blue-500 h-[100px] w-[20%] rounded-md 
      text-white flex flex-col justify-center items-center">
        <div className="text-[45px] font-bold">{users}</div>
        <div className="md:text-[20px] text-[10px] font-semibold">Users</div>
      </div>

      <div className="bg-amber-400 h-[100px] w-[20%] rounded-md 
      text-white flex flex-col justify-center items-center">
        <div className="text-[45px] font-bold">{officers}</div>
        <div className="md:text-[20px] text-[10px] font-semibold">Officers</div>
      </div>
    </div>
  );
}

export default DataPanel;
