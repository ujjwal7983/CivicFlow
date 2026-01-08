import { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'

function RegisterGrievance() {
    let { userData, setUserData, grievance, setGrievance } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [department, setDepartment] = useState("");
    let [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true);
            let res = await axios.post(serverUrl+"/api/grievances/",{
                title,
                description,
                department
            },{withCredentials:true});
            console.log(res);
            setLoading(false);
            setGrievance(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setGrievance(false);
        }
    }

    return (
        <div className="fixed w-[100%] h-[100vh] top-0 z-[200] inset-0 flex justify-center items-center">
            <div className='bg-black opacity-[0.6] inset-0  absolute w-[100%] h-full'></div>
            <div className="bg-white h-[550px] w-[90%] max-w-[400px] z-[200] rounded-lg relative">
                <button className="absolute bg-red-500 top-[10px] right-[10px] p-[10px] 
                text-white text-[14px] rounded-full font-bold h-[40px] w-[40px]
                border border-red-500 hover:text-red-500 hover:bg-white"
                    onClick={() => setGrievance(false)}>X
                </button>

                <form className="p-6 flex flex-col gap-4 mt-[18px]" onSubmit={handleSubmit}>

                    <div className="flex flex-col gap-1 text-[20px]">
                        <label htmlFor="title" className=" font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter complaint title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1 text-[18px]">
                        <label htmlFor="department" className="text-sm font-semibold text-gray-700">
                            Department
                        </label>
                        <select
                            id="department"
                            value={department}
                            required
                            onChange={(e) => setDepartment(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="">Select Department</option>
                            <option value="Water">Water Supply</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Roads">Roads & Infrastructure</option>
                            <option value="Sanitation">Sanitation</option>
                            <option value="Municipal">Municipal Corporation</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 text-[18px]">
                        <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Describe your problem in detail"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400 w-[100%] h-[200px]"
                        />
                    </div>
                    <button className="w-full bg-blue-500 mt-[20px] h-[50px] 
                    text-white rounded-lg hover:bg-white hover:text-blue-500 border border-blue-500
                    font-bold text-[20px]" disabled={loading}>{loading?"...":"Submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterGrievance
