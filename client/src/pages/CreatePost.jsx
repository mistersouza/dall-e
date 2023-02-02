import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import { useFetch } from '../utils/useFetch';

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const [ generatingImage, setGeneratingImage ] = useState(false); 
  const [ form, setForm ] = useState({
    title: '',
    prompt: '',
    image: ''
  }); 

  const { loading, post } = useFetch('http://localhost:8080/api');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (form.prompt && form.image) {
      post('posts', form)
        .then(() => navigate('/'))
        .catch(error => alert(error));

    } else {
      alert('Please enter a prompt to generate an image');
    }
  }; 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSurpriseMeClick = () => {
    setForm(prevState => ({
      ...prevState,
      prompt: getRandomPrompt(form.prompt)
    }));
  };

  const handleGenerateImageClick = async () => {
    if (form.prompt) {
      setGeneratingImage(true);
      
      try {
        const response = await fetch('http://localhost:8080/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: form.prompt })
            });
            const data = await response.json();
            setForm(prevState => ({
              ...prevState,
              image: `data:image/jpeg;base64,${data.image}`
            }));

      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#555e75] text-[16px] max-w-[500px]'>Create imaginative and stunning images with DALL-E and share them with the Community</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            label='Your name'
            name='name'
            placeholder='John Doe'
            type='text'
            value={form.name}
            handleChange={handleChange}
          />

          <FormField 
            label='Prompt'
            name='prompt'
            placeholder='A plush toy robot is sitting against a yellow wall'
            type='text'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMeClick={handleSurpriseMeClick}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-sm rounded-lg focus-ring-blue-300 focus-border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.image ? (
              <img 
                className='w-full h-full object-contain'
                src={form.image}
                alt={form.prompt}
              />
            ) : (
              <img
                className='w-9/12 h-9/12 object-contain opacity-40'
                src={preview}
                alt='preview'
              />
            )}

            {generatingImage && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>  
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center sm:w-full'
            type='submit'
            onClick={handleGenerateImageClick}
          >
            {generatingImage ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">When you're done creating the image you want, you're welcome to share it with the community</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-full px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost