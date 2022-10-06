
import React, {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios'
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
function App() {
  const [images, setImages] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [term, setTerm] = useState('')

   useEffect(()=>{
    axios.get(`https://pixabay.com/api/?key=30367474-891d2377e60b75a54d4c4bed6&q=${term}&image_type=photo&pretty=true`)
    .then((response)=>{
       setImages(response.data.hits)
       console.log(response.data)
       setIsLoading(false)
    }).catch((error)=>{
      console.log(error)
    })
   },[term])

  return (
    <div className='container mx-auto'>
    <ImageSearch searchText={(text)=> setTerm(text)}/>
    {!isLoading && images.length === 0 && <h1 className='text-4xl text-center mx-auto mt-32'>No Images Found</h1>}
    { isLoading? <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1> : <div className='grid grid-cols-3 gap-4'>
       {images.map(image=>{
        return(

        <ImageCard key={image.id} image={image} />
        )
       })}
    </div>}
    </div>
  );
}

export default App;

