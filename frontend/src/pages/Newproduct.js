import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'

import Footer from '../component/Footer'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
    quantity: '',
    unitType: '',
    sellerEmail: '',
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

    const {name,image,category,price,quantity,unitType,sellerEmail} = data

    if(name && image && category && price && quantity && unitType && sellerEmail){
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
                <option value="per kg">Per Kg</option>
                <option value="per litre">Per Litre</option>
                <option value="per one unit">Per One Unit</option>
                <option value="per Half Kg">Per Half Kg</option>
                <option value="per Half Litre">Per Half Litre</option>
                <option value="other">Other</option>
          </select>
        <label htmlFor='quantiy' className='my-1'>Quantity</label>
        <input className='bg-slate-200 p-1 my-1' type="number" name="quantity" placeholder="Quantity" onChange={handleOnChange} />
          
        <label htmlFor='sellerEmail' className='my-1'>Seller Email</label>
          
        <input className='bg-slate-200 p-1 my-1'  type="email" name="sellerEmail" placeholder="Seller Email" onChange={handleOnChange} required />
            
        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>



        <button className='bg-green-600 hover:bg-green-700 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
        
       </form>
       <Footer/>
    </div>
  )
}

export default Newproduct