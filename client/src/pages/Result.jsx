import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function Result() {

  const { resultImage, image } = useContext(AppContext)

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>

      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>

            {/* Image container */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>

            {/* Left */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-500 mb-2'>Original</p>
            <img className='rounded-md border' src={image ? URL.createObjectURL(image):''} alt="" />
          </div>

              {/* Right */}

          <div className='flex flex-col'>
            <p className='font-semibold text-gray-500 mb-2'>Background Removed</p>
            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
            <img className='rounded-md border' src={resultImage ? resultImage:''} alt="" />
            {
              !resultImage && image && <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 '>
              <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
            </div>
            }
            </div>
            <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 '>
              {/* <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div> */}
            </div>
          </div>

        </div>

        {resultImage && <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <input onChange={e=> removeBg(e.target.files[0])} type="file" accept='image/*' id="upload3" hidden/>
                           <label className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full cursor-pointer hover:scale-105 transition-all duration-700' htmlFor="upload2">
                              <p className='text-white text-sm'>Try another image</p>
                          </label>
          <a className='px-8 py-2.5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full cursor-pointer hover:scale-105 transition-all duration-700' href={resultImage} download>Download image</a>
        </div>
        }
      </div>

    </div>
  )
}

export default Result