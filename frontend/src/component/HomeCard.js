import React from 'react'
import {Link} from 'react-router-dom'

const HomeCard = ({name,image,category,price,loading,id,unitType}) => {
  return (
    <div className="min-w-[160px] min-h-[180px] bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center justify-between">
    {name ? (
      <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="w-32 h-32 flex items-center justify-center mx-auto">
          <img src={image} alt={name} className="object-contain h-full" />
        </div>
        <h3 className="text-center text-lg font-semibold text-gray-800 mt-2">{name}</h3>
        <p className="text-center text-sm text-gray-500">{category}</p>
        <div className="flex justify-center items-center gap-2 mt-1">
          <p className="font-bold text-gray-700">
            <span className="text-red-600">₹</span>{price}
          </p>
          <span className="text-sm text-gray-500">{unitType}</span>
        </div>
      </Link>
    ) : (
      <div className="h-full flex justify-center items-center">
        <p>{loading}</p>
      </div>
    )}
  </div>
  
  )
  
}

export default HomeCard;