import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function Adminupdatelist() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'sell',
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

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/backend/listing/get/${listingId}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);
  
  
  
  
  
  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
    }));
  };
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleImageSubmit = async () => {
    if (files.length === 0) {
      setImageUploadError('Please select at least one image');
      return;
    }
  
    try {
      setUploading(true);
      setImageUploadError(false);
  
      const storage = getStorage(app);
      const promises = [];
  
      // Upload each selected file to Firebase Storage
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        promises.push(
          new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Progress monitoring can be added here if needed
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    resolve(downloadURL);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              }
            );
          })
        );
      }
  
      // Wait for all uploads to complete
      const uploadUrls = await Promise.all(promises);
  
      // Update imageUrls state with the download URLs
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.concat(uploadUrls),
      }));
  
      setUploading(false);
    } catch (error) {
      setImageUploadError('Image upload failed');
      setUploading(false);
    }
  };
  
  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  


      // Send POST request to backend backend
      const res = await fetch(`/backend/listing/edits/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      setLoading(false);
  
      if (data.success) {
        // Redirect the user to a success page or perform any other actions
        navigate(`/adminedit`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <main className=' bg-[#90b3b7] rounded-xl p-5 max-w-3xl my-20 mx-auto'>
  



   <h1 className="text-2xl  text-red-600 font-bold text-center my-9">Edit Listing</h1>
      <form className="  flex flex-col sm:flex-row mx-auto">
      
        <div className="   flex flex-col gap-3 flex-1">
        <span className=" font-semibold inline-block p-2   rounded text-red-600 bg-blue-200 uppercase last:mr-0 mr-1">
  Your Name:-
</span>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
                  <br></br>
  <span className=" font-semibold inline-block p-2    rounded text-red-600 bg-blue-200 uppercase last:mr-0 mr-1">
  Enter your Description:-
</span>
 
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <br></br>
<span className=" font-semibold inline-block p-2   rounded text-red-600 bg-blue-200 uppercase last:mr-0 mr-1">
  Enter your Address:-
</span>

          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
           <br></br>

<span className=" font-semibold inline-block p-2    rounded text-red-600 bg-blue-200 uppercase last:mr-0 mr-1">
Enter below details carefully:-
</span>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
           
            <div className='flex gap-2'> 
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className='font-semibold text-red-500'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between"
              >
                <img
                  src={url}
                  alt='listing image'
                  className="w-20 h-20 object-contain p-3 rounded-lg  "
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className=" text-red-900  border p-2 rounded-lg uppercase hover:opacity-900"
                >
                  Delete
                </button>
              </div>
            ))}
          <button onClick={handleSubmit}
          className="p-3 border mb-20 rounded-lg border-slate-100 uppercase hover:opacity-80  disabled:opacity-80 font-bold text-slate-100 bg-slate-800 shadow-md"
        >EDIT LISTING</button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    
    </main>
  );
}
