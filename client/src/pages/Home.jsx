import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import ListingCard from '../components/ListingCard'

function Home() {

  SwiperCore.use([Navigation])

  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.error(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.error(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOfferListings()
  }, [])

  console.log(offerListings)

  return (
    <div>
      <div className=' flex flex-col gap-6 p-28 max-w-6xl mx-auto'>
        <h1 className=' text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className=' text-slate-500'>perfect</span>
          <br />
          place to live.
        </h1>
        <div className=' text-gray-400 text-xs sm:text-sm'>
          One of the largest and most trusted rental site. Our property listings feature photos, videos, property details and maps location.
          <br />
          With thousands of homes for sale or rent, we have the right one for you.
        </div>
        <Link to={`/search`} className=' text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className=' max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className=' my-3'>
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={`search?offer=true`}>Show more offers</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => (
                    <ListingCard listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className=' my-3'>
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={`search?offer=true`}>Show more places for Rent</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => (
                    <ListingCard listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }


        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className=' my-3'>
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={`search?offer=true`}>Show more palces for sale</Link>
              </div>
              <div className=' flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => (
                    <ListingCard listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home