import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-4 py-20 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl pb-3 mt-4 font-semibold bg-gradient-to-r from-gray-300 to-gray-600 bg-clip-text text-transparent parkinsans-f'>Steps to remove background <br />image in seconds</h1>
        <div className='flex items-start flex-wrap gap-4 mt-18 xl:mt-24 justify-center'> 
         <div className=' p-0.5 bg-gradient-to-br from-orange-500 via-violet-800 to-sky-400 rounded-md'>
            <div className='flex items-start gap-4 bg-color drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <div>
                <img className='max-w-9' src={assets.upload_icon} alt="" />
                </div>

                <div>
                <p className='text-xl font-medium text-gray-300'>Upload image</p>
                <p className='text-sm text-neutral-500 mt-1'>Upload the image to remove background. <br />Click on upload image button</p>
            </div>
            </div>
        </div>

        <div className=' p-0.5 bg-gradient-to-br from-orange-500 via-violet-800 to-sky-400 rounded-md'>
            <div className='flex items-start gap-4 bg-color drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <div>
                <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
                </div>

                <div>
                <p className='text-xl font-medium text-gray-300'>Remove background</p>
                <p className='text-sm text-neutral-500 mt-1'>The background of image is removed. <br />The image with removed background is generated</p>
            </div>
            </div>
        </div>

        <div className=' p-0.5 bg-gradient-to-br from-orange-500 via-violet-800 to-sky-400 rounded-md'>
            <div className='flex items-start gap-4 bg-color drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <div>
                <img className='max-w-9' src={assets.download_icon} alt="" />
                </div>

                <div>
                <p className='text-xl font-medium text-gray-300'>Download image</p>
                <p className='text-sm text-neutral-500 mt-1'>Download the image with removed background. <br />Click on download image button.</p>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Steps