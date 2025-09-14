import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [users, setUsers] = useState({ name: "", email: "", phone: "" })
  const [userdata, setUserData] = useState([])


  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res)=> setUserData(res.data))
    .catch((err)=> console.log("Error", err))
  },[])

  const handleChange = (e) =>{
    setUsers({...users, [e.target.id]: e.target.value})
  }

  const handleAddUser = () =>{
    axios.post("https://jsonplaceholder.typicode.com/users", users)
    .then((res)=>{
      let newUser = {...res.data, id: userdata.length === 0 ? 1 : userdata[userdata.length - 1].id + 1}
      let userdatacopy = [...userdata]
      userdatacopy.push(newUser)
      setUserData(userdatacopy)
      setUsers({ name: "", email: "", phone: "" })
    })
    .catch((err)=> console.log("Error", err))
  }

  const handleDelete = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res)=>{
      let usertodelete = [...userdata]
      let checking = usertodelete.filter((userid)=> userid.id !== id)
      setUserData(checking)
    })
    .catch((err)=> console.log("Error", err))
  }


  return (
    <div className='bg-gray-200 min-h-screen'>
      <div className='bg-cyan-950 h-12 flex items-center justify-center'>
         <h1 className='text-white text-2xl'>AXIOS</h1>
      </div>
      <div className='container m-12 flex flex-row justify-between flex-wrap'>
        <div>
          <label className='text-xl mr-2' htmlFor='name'>Name: </label>
          <input type='text' placeholder='Enter your name' id="name" value={users.name} className='p-2' onChange={handleChange}/>
        </div>
        <div>
          <label className='text-xl mr-2' htmlFor='email'>Email: </label>
          <input type='email' placeholder='Enter your email address' id="email" value={users.email} className='p-2' onChange={handleChange}/>
        </div>
        <div>
          <label className='text-xl mr-2' htmlFor='phone'>Phone: </label>
          <input type='text' placeholder='Enter your phone' id="phone" value={users.phone} className='p-2' onChange={handleChange}/>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='bg-blue-800 text-white px-4 py-2 text-xl rounded-md' onClick={handleAddUser}>Add user</button>
      </div>
      <hr className='border border-slate-300 m-4 '/>
      <div className='bg-white min-h-auto mx-4 rounded-md p-3'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='border border-slate-400'>S.No</th>
              <th className='border border-slate-400'>Name</th>
              <th className='border border-slate-400'>Email</th>
              <th className='border border-slate-400'>Phone</th>
              <th className='border border-slate-400'>Edit</th>
              <th className='border border-slate-400'>Delete</th>
            </tr>
          </thead>
          <tbody>
           {userdata.map((user)=>(
              <tr key={user.id}>
              <td className='border border-slate-200 px-2 text-gray-500'>{user.id}</td>
              <td className='border border-slate-200 px-2 text-gray-500'>{user.name}</td>
              <td className='border border-slate-200 px-2 text-gray-500'>{user.email}</td>
              <td className='border border-slate-200 px-2 text-gray-500'>{user.phone}</td>
              <td className='border border-slate-200 text-center text-gray-500'><button className='bg-green-800 px-3 py-1 text-white rounded-sm'>Edit</button></td>
              <td className='border border-slate-200 text-center text-gray-500'><button className='bg-red-800 px-3 py-1 text-white rounded-sm' onClick={()=>handleDelete(user.id)}>Delete</button></td>
            </tr>
           ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
