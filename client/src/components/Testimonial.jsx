import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div>
        {/* Title */}
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl pb-3 mt-4 font-semibold bg-gradient-to-r from-gray-200 to-gray-600  bg-clip-text text-transparent py-5'>Customer Testimonials</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-20'>
            {testimonialsData.map((item,index) =>
            <div className='p-0.5 bg-gradient-to-br from-orange-500 via-violet-800 to-sky-400 rounded-xl'>
                <div className='bg-color rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-500' key={index}>
                    <p className='text-4xl text-gray-500 parkinsans-f'>"</p>
                    <p className='text-sm text-gray-500'>{item.text}</p>
                    <div className='flex items-center gap-3 mt-5'>
                        <img  className='w-9 rounded-full' src={item.image} alt="" />

                    <div>
                        <p className='text-gray-400'>{item.author}</p>
                        <p className='text-sm text-gray-600'>{item.jobTitle}</p>
                    </div>

                    </div>
                </div>
                </div>
            )}
            
        </div>
    </div>
  )
}

export default Testimonial