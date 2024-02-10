import React, { useEffect, useState } from "react";
import {getDownloadURL, ref,getStorage, uploadBytesResumable }from 'firebase/storage';
import {app} from '../firebase';
import {useSelector} from 'react-redux'; 
import { useNavigate ,useParams} from 'react-router-dom';

export default function EditList() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const params=useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 
 
  useEffect(()=>{
    const fetchList = async ()=>{
const listingId =params.listingId;
const res=await fetch(`/api/listing/get/${listingId}`)
const data=await res.json();
if(data.success ===false){
    console.log(data.message);
    return;
}
setFormData(data);
console.log(listingId);
    };
    fetchList()
  },[]);
 
 
  
  const  handleImageSubmit =  (e) => {
    e.preventDefault();
    if(files.length>0  && files.length+ formData.imageUrls.length<7)
    {
      setUploading(true);
      setImageUploadError(false);
      const promises =[];
      for(let i=0;i<files.length;i++)
      {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({ ...formData,imageUrls:formData.imageUrls.concat(urls),});
      setImageUploadError(false);
      setUploading(false);
      }).catch((err)=>{
        setImageUploadError('Imaeg is not uploeaded');
        setUploading(false);
      });
    }
    else{
      setImageUploadError('only upload 6 images');
      setUploading(false);
    }
  };

const storeImage =async (file)=>{
  return new Promise((resolve,reject)=>{
const storage = getStorage(app);
const fileName = new Date().getTime()+file.name;
const storageRef =ref(storage,fileName);
const uploadTask =uploadBytesResumable(storageRef,file);
uploadTask.on('state_changed',

(snapshot)=>{
  const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  console.log(`upload is ${progress}%done `);
},

                (error)=>{
                  reject(error);
                },
                ()=>{
                  
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL);
                  });
                }
   
);
});}
const handleChange = (e) => {
  if (e.target.id === 'sale' || e.target.id === 'rent') {
    setFormData({
      ...formData,
      type: e.target.id,
    });
  }
  if (
    e.target.id === 'parking' ||
    e.target.id === 'furnished' ||
    e.target.id === 'offer'
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked,
    });
  }

  

  if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

};

const handleRemoveImage=(index)=>{
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  });
}
const handleSubmit = async (e) => {
  e.preventDefault ();
  try {
    if (formData.imageUrls.length < 1)
      return setError('You must upload at least one image');
    if (+formData.regularPrice < +formData.discountPrice)
      return setError('Discount price must be lower than regular price');
    setLoading(true);
    setError(false);
   
   const res = await fetch(`/api/listing/edit/${params.listingId}`, {
      
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    });
    const data = await res.json();

    setLoading(false);
    if (data.success === false) {
      setError(data.message);
    }
    navigate(`/listing/${data._id}`);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
 };

  return (
    <main className=" bg-[url('/src/img/img2.jpg')]  h-1/3 w-3/3
     flex flex-col flex-1 gap-4   bg-rounded-xl">
      <img
        src="/src/img/logo.png"
        alt="Your Image Description"
        className="mx-auto  rounded-lg shadow-lg max-w-32"
       
      />
  
      <h1 className="text-2xl font-bold text-center my-9">Edit Listing</h1>
      <form className="  flex flex-col sm:flex-row mx-auto">
        <div className="   flex flex-col gap-3 flex-1">
        <span className=" font-semibold inline-block p-2   rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
  Your Name:-
</span>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <br></br>
  <span className=" font-semibold inline-block p-2   uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
  Enter your Description:-
</span>
          <textarea
            type="text"
            placeholder="Description"
            className="border p-2 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

<br></br>
<span className=" font-semibold inline-block p-2   rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
  Enter your Address:-
</span>
          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <br></br>

          <span className=" font-semibold inline-block p-2   uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
  Enter below details carefully:-
</span>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2  font-bold text-slate-200">
              <input type="checkbox" id="sale" className="w-4"  onChange={handleChange}
                checked={formData.type === 'sale'} />
              <span>Sell</span>
              
            </div>

            <div className="flex gap-2  font-bold text-slate-200">
              <input type="checkbox"  id="rent" className="w-4" onChange={handleChange}
                checked={formData.type === 'rent' }/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2  font-bold text-slate-200">
              <input type="checkbox" id="parking" className="w-4"   onChange={handleChange}
                checked={formData.parking}/>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox" id="furnished" onChange={handleChange}
                checked={formData.furnished} className="w-4" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox"  onChange={handleChange}
                checked={formData.offer} id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5  font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            
            <div className='flex items-center gap-1'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className='p-2 border  border-gray-300 rounded-lg'
                
              />
              <div className=' text-orange-500 flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}

              </div>
            </div>
            {formData.offer &&(<div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-2 border border-gray-300 rounded-lg'
                  
                />
                <div className='flex flex-col items-center text-orange-500'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
  )}
          </div>
        
    
       
          <p className='font-bold text-red-500'>
            Images:
            <span className='font-normal text-blue-500 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex   gap-4 mx-5">
            
            <input  
            onChange={(e) => setFiles(e.target.files)} 
            className="p-3 border border-gray-300 rounded w-full" 
            type="file" 
            id='images' 
            accept="image/*" 
            multiple/>
          
                  <button
                  type='button'
                    onClick={handleImageSubmit} 
                    className="p-3 border border-slate-100 rounded uppercase hover:opacity-80 disabled:opacity-80font-bold text-slate-100 bg-slate-800 shadow-md"
                  >   {uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
          <p className="text-red-800"> 
           {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
<div 
  key={url} 
  className="flex justify-between">
<img src={url} alt="listing images"
className="w-20 h-20 object-contain p-3 rounded-lg  "/>

<button 
    type="button"
    onClick={()=>handleRemoveImage(index)} 
        className=" text-red-900  border p-2 rounded-lg uppercase hover:opacity-900">Delete</button>

</div>
            )
            )
          }
          <button onClick={handleSubmit}
          className="p-3 border mb-20 rounded-lg border-slate-100 uppercase hover:opacity-80  disabled:opacity-80 font-bold text-slate-100 bg-slate-800 shadow-md"
        >EDIT LISTING</button>
       {error &&<p className="text-red-800-sm">{error}</p>}
        </div>
      </form>
    </main>
  

);
}
