import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact({ listing }) {

    const [landLoad, setLandLoad] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        {
            const fetchUser = async () => {
                try {
                    const res = await fetch(`/api/user/${listing.userRef}`)
                    const data = await res.json()
                    setLandLoad(data)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchUser()
        }
    })

    return (
        <div>
           {
            landLoad && (
                <div className=' flex flex-col gap-2'>
                   <p>Contact <span className=' font-semibold'>{landLoad.username}</span>{' '} for
                   {' '}<span className=' font-semibold'>{listing.name.toLowerCase()}</span></p> 
                   <textarea className=' w-full rounded-lg border p-3' placeholder='Enter your message here...' onChange={(e) => setMessage(e.target.value)} type="text" rows={2} id='message' value={message}/>
                   <Link to={`mailto:${landLoad.email}?subject=Regarding ${listing.name}&body=${message}`} className=' bg-slate-700 text-white text-center uppercase p-3 rounded-lg hover:opacity-95
                   '>Send Message</Link> 
                </div>
            )
           }
        </div>
    )
}

export default Contact