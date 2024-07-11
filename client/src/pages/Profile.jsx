import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutFailure, signOutSuccess, signOutStart } from '../redux/user/userSilce'
import { Link } from 'react-router-dom'

function Profile() {

  const dispatch = useDispatch()

  const { currentUser, loading, error } = useSelector(state => state.user)

  const fileRef = useRef(null)

  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadeError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePercentage(Math.round(progress))
    },
    (error) => {
      console.error("File upload error: ", error);
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL})
      })
    }
  )}

  const handleFormData = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
     try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success == false) {
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
     } catch (error) {
        dispatch(signOutFailure(error.message))
     }
  }

  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser?.avatar} alt="profile" className=' cursor-pointer rounded-full h-24 w-24 object-cover self-center mt-2' />
        <p className=' text-sm self-center'>
          {
            fileUploadeError ? 
            <span className=' text-red-700'>Error Image upload (image must be less than 2 mb)</span> :
            filePercentage > 0 && filePercentage < 100 ?
            <span className=' text-slate-700'>{`Uploading ${filePercentage}%`}</span> :
            filePercentage === 100 ? 
            <span className=' text-green-700'>Image successfully uploaded!</span> : ""
          }
        </p>
        <input onChange={handleFormData} defaultValue={currentUser.username} type="text" placeholder='username' id='username' className=' border p-3 rounded-lg' />
        <input onChange={handleFormData} defaultValue={currentUser.email} type="email" placeholder='email' id='email' className=' border p-3 rounded-lg' />
        <input onChange={handleFormData} type="password" placeholder='password' id='password' className=' border p-3 rounded-lg' />
        <button disabled={loading} className=' bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'update'}</button>
        <Link to={'/create-listing'} className=" bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">Create Listing</Link>
      </form>
      <div className=' flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className=' text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className=' text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className=' text-red-700 mt-5'>{error ? error : ''}</p>
      <p className=' text-green-700 mt-5'>{updateSuccess ? 'User is update successfully!' : ''}</p>
    </div>
  )
}

export default Profile