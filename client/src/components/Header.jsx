import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function Header() {

    const navigate = useNavigate()

    const { currentUser } = useSelector(state => state.user)

    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
       const urlParams = new URLSearchParams(location.search)
       const searchTermFromUrl = urlParams.get('searchTerm')
       if (searchTermFromUrl) {
           setSearchTerm(searchTermFromUrl)
       }
    }, [location.search])

    return (
        <header className=' bg-gray-950 shadow-md'>
            <div className=' flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className=' font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className=' text-slate-300'>Land</span>
                        <span className=' text-slate-400'>Estate</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className=' bg-gray-800 p-3 rounded-lg flex items-center'>
                    <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className=' bg-transparent text-slate-300 focus:outline-none w-24 sm:w-64' type="text" placeholder='Search...' />
                    <button>    
                       <FaSearch className=' text-slate-400' />
                    </button>
                </form>
                <ul className=' flex gap-4'>
                    <Link to={'/'}>
                        <li className=' hidden sm:inline text-slate-400 hover:underline'>Home</li>
                    </Link>
                    <Link to={'/about'}>
                        <li className=' hidden sm:inline text-slate-400 hover:underline'>About</li>
                    </Link>
                    <Link to={'/profile'}>
                        {
                            currentUser ?
                                <img src={currentUser.avatar} alt='profile' className=' rounded-full h-7 w-7 object-cover'/> :
                                <li className='text-slate-700 hover:underline'>Sign In</li>
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header