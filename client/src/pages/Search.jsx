import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingCard from '../components/ListingCard'

function Search() {

    const navigate = useNavigate()

    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')
        const offerFromUrl = urlParams.get('offer')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            })
        }

        const fetchListings = async () => {
            setLoading(true)
            setShowMore(false)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            if (data.length > 8) {
                setShowMore(true)
            } else {
                setShowMore(false)
            }
            setListings(data)
            setLoading(false)
        }
        fetchListings()
    }, [location.search])

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarData({ ...sideBarData, type: e.target.id })
        }

        if (e.target.id === 'searchTerm') {
            setSideBarData({ ...sideBarData, searchTerm: e.target.value })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({ ...sideBarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
        }

        if (e.target.id === 'sort_order') {
            let sort = e.target.value.split('_')[0] || 'created_at'
            let order = e.target.value.split('_')[1] || 'desc'
            setSideBarData({ ...sideBarData, sort, order })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sideBarData.searchTerm)
        urlParams.set('type', sideBarData.type)
        urlParams.set('parking', sideBarData.parking)
        urlParams.set('furnished', sideBarData.furnished)
        urlParams.set('offer', sideBarData.offer)
        urlParams.set('sort', sideBarData.sort)
        urlParams.set('order', sideBarData.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async () => {
        const numberOfListings = listings.length
        const startIndex = numberOfListings
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        if (data.length < 9) {
            setShowMore(false)
        }
        setListings([...listings, ...data])
    }

    return (
        <div className=' flex flex-col md:flex-row'>
            <div className=' p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className=' flex flex-col gap-8'>
                    <div className=' flex items-center gap-2'>
                        <label className=' font-semibold whitespace-nowrap'>Search Term:</label>
                        <input onChange={handleChange} type="text" id='searchTerm' placeholder='Search...' className=' border rounded-lg p-3 w-full' />
                    </div>
                    <div className=' flex gap-2 flex-wrap items-center'>
                        <label className=' font-semibold'>Type:</label>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.type === 'all'} type="checkbox" id='all' className='w-5' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.type === 'rent'} type="checkbox" id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.type === 'sale'} type="checkbox" id='sale' className='w-5' />
                            <span>Sale</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.offer} type="checkbox" id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className=' flex gap-2 flex-wrap items-center'>
                        <label className=' font-semibold'>Amenities:</label>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.parking} type="checkbox" id='parking' className='w-5' />
                            <span>Parking</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input onChange={handleChange} checked={sideBarData.furnished} type="checkbox" id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className=' flex gap-2 items-center'>
                        <label className=' font-semibold'>Sort:</label>
                        <select onChange={handleChange} defaultValue={'created_at_desc'} className=' border p-3 rounded-lg' id="sort_order">
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className=' p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className=' flex-1'>
                <h1 className=' text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
                <div className=' flex flex-wrap p-7 gap-4'>
                    {
                        !loading && listings.length === 0 && <p className=' text-xl text-slate-700'>No Listing Found!</p>
                    }
                    {
                        loading && <p className=' text-xl text-slate-700 text-center w-full'>Loading...</p>
                    }
                    {
                        !loading && listings && listings.map((listing) => (
                            <ListingCard key={listing._id} listing={listing} />
                        ))
                    }
                    {
                        showMore &&
                        <button onClick={handleShowMore} className='text-green-700 hover:underline p-7 text-center w-full'>Show More</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search