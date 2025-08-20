import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'

import Footer from '../component/Footer'

const Sell = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
    quantity: '',
    unitType: '',
    sellerEmail: '',
    contactNumber: ''
  })
  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }
  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])

      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price,quantity,unitType,sellerEmail,contactNumber} = data

    if(name && image && category && price && quantity && unitType && sellerEmail && contactNumber){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : "",
          quantity: '',
          unitType: '',           
          sellerEmail: '',

        }
      })
    }
    else{
      toast("Enter required Fields")
    }
    
   
  }
  return (
    <div className="p-4">
     
       <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"}  name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"select"}>Select category</option>
          <option value={"Fruits"}>Fruits</option>
          <option value={"Vegetable"}>Vegetable</option>
          <option value={"Fertilizers"}>Fertilizers</option>
          <option value={"Pesticides"}>Pesticides</option>
          <option value={"Seeds"}>seeds</option>
          <option value={"Dairy"}>dairyproducts</option>
          <option value={"Grains"}>Grains</option>
          <option value={"Pulses"}>Pulses</option>
          <option value={"Spices"}>Spices</option>
          <option value={"PlantSaplings"}>PlantSaplings</option>
          <option value={"Organic"}>Organic</option>
          <option value={"Equipments"}>Equipments</option>
          <option value={"other"}>Others</option>
        </select>

        <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} alt="" className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label> 
        

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>
        <label htmlFor='unitType' className='my-1'>Unit Type</label>
        <select name="unitType"className='bg-slate-200 p-1 my-1' onChange={handleOnChange}>
                <option value="">Select Unit Type</option>
                <option value="per 1kg">Per 1Kg</option>
                <option value="per 1litre">Per 1 Litre</option>
                <option value="per 1 unit">Per One Unit</option>
                <option value="per 500g">Per 500g</option>
                <option value="per 500ml">Per 500ml</option>
                <option value="per dozen">Per Dozen</option>
                <option value="per 250g">Per 250g</option>
                <option value="per 250ml">Per 250ml</option>
                <option value="per 100g">Per 100g</option>
                <option value="per 100ml">Per 100ml</option>
                <option value="per Packet">Per Packet</option>
                <option value="other">Other</option>
          </select>
        <label htmlFor='quantiy' className='my-1'>Quantity</label>
        <input className='bg-slate-200 p-1 my-1' type="number" name="quantity" onChange={handleOnChange} />
          
        <label htmlFor='sellerEmail' className='my-1'>Seller Email</label>
          
        <input className='bg-slate-200 p-1 my-1'  type="email" name="sellerEmail" onChange={handleOnChange} required />
        <label htmlFor='contactNumber' className='my-1'>Contact number</label>
          
        <input className='bg-slate-200 p-1 my-1'  type="text" name="contactNumber" onChange={handleOnChange} required />
            
        
        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>



        <button className='bg-green-600 hover:bg-green-700 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
        
       </form>
       <Footer/>
    </div>
  )
}

export default Sell