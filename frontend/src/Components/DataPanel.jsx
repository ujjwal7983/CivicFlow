import { useContext, useEffect, useState } from 'react';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';

function DataPanel({ refreshTrigger }) {
  const { serverUrl } = useContext(authDataContext);

  const [users, setUsers] = useState(0);
  const [officers, setOfficers] = useState(0);
  const [solved, setSolved] = useState(0);
  const [unsolved, setUnsolved] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/grievances/getData",
        { withCredentials: true }
      );

      setUsers(res.data.citizenCount);
      setOfficers(res.data.officersCount);
      setSolved(res.data.solvedCount);
      setUnsolved(res.data.unSolvedCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [refreshTrigger]);

  return (
    <div className="w-full mt-10 px-4">
      <div
        className="
          flex gap-4 overflow-x-auto pb-3
          sm:grid sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {/* Pending */}
        <div className="
          min-w-[260px] sm:min-w-0
          bg-gradient-to-br from-red-500 to-red-600
          rounded-2xl p-6 text-white
          shadow-lg hover:shadow-2xl hover:-translate-y-1
          transition-all duration-300
        ">
          <div className="text-5xl font-extrabold">{unsolved}</div>
          <div className="mt-2 text-sm md:text-lg font-semibold opacity-90">
            Pending Grievances
          </div>
        </div>

        {/* Solved */}
        <div className="
          min-w-[260px] sm:min-w-0
          bg-gradient-to-br from-green-500 to-green-600
          rounded-2xl p-6 text-white
          shadow-lg hover:shadow-2xl hover:-translate-y-1
          transition-all duration-300
        ">
          <div className="text-5xl font-extrabold">{solved}</div>
          <div className="mt-2 text-sm md:text-lg font-semibold opacity-90">
            Solved Grievances
          </div>
        </div>

        {/* Users */}
        <div className="
          min-w-[260px] sm:min-w-0
          bg-gradient-to-br from-blue-500 to-blue-600
          rounded-2xl p-6 text-white
          shadow-lg hover:shadow-2xl hover:-translate-y-1
          transition-all duration-300
        ">
          <div className="text-5xl font-extrabold">{users}</div>
          <div className="mt-2 text-sm md:text-lg font-semibold opacity-90">
            Registered Users
          </div>
        </div>

        {/* Officers */}
        <div className="
          min-w-[260px] sm:min-w-0
          bg-gradient-to-br from-amber-400 to-amber-500
          rounded-2xl p-6 text-white
          shadow-lg hover:shadow-2xl hover:-translate-y-1
          transition-all duration-300
        ">
          <div className="text-5xl font-extrabold">{officers}</div>
          <div className="mt-2 text-sm md:text-lg font-semibold opacity-90">
            Active Officers
          </div>
        </div>

      </div>
    </div>
  );
}

export default DataPanel;
