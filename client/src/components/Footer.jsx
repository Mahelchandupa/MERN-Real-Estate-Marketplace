import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Footer() {

    const { currentUser } = useSelector(state => state.user)

    return (
        <div className="z-10 bg-gray-950 h-46 py-6 flex flex-col gap-4 justify-center items-center mt-10 bottom-0 w-full">
            <Link to={'/'}>
                <h1 className=' font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className=' text-slate-300'>Land</span>
                    <span className=' text-slate-400'>Estate</span>
                </h1>
            </Link>
            <ul className=" sm:w-[200px] flex sm:justify-between gap-4">
                <Link to={'/'}>
                    <li className=' text-slate-400 hover:underline'>Home</li>
                </Link>
                <Link to={'/profile'}>
                        {
                            currentUser ?
                                <img src={currentUser.avatar} alt='profile' className=' rounded-full h-7 w-7 object-cover'/> :
                                <li className='text-slate-700 hover:underline'>Sign In</li>
                        }
                </Link>
                <Link to={'/about'}>
                    <li className=' text-slate-400 hover:underline'>About</li>
                </Link>
            </ul>
        </div>
    )
}

export default Footer