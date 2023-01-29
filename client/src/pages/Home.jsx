import React, { useState, useEffect } from 'react'

import { Card, FormField, Loader } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length) {
    return (
      data.map(post => (
        <Card
          key={post._id}
          {...post}
        />
      ))
    ); 
  }
  return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
}

const Home = () => {
  const [loading, setLoading] = useState(false); 
  const [allPosts, setAllPosts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [ searchTimeout, setSearchTimeout ] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      if (!response.ok) throw new Error('API call failed.');

      const { data } = await response.json();
      setAllPosts(data.reverse());

      } catch (error) {
        alert(error);
        
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleSearch = async ({ target }) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchQuery(target.value);

    setSearchTimeout(
      setTimeout(() => {
        if (target.value === '') {
          setSearchQuery('');
          return;
        }
  
        const searchResults = allPosts.filter(post => {
          return post.name.toLowerCase().includes(searchQuery.toLowerCase()) || post.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        }); 
  
        setSearchResults(searchResults);
      }, 500)
    );
  }



  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Community Showcase</h1>
        <p className='mt-2 text-[#555e75] text-[16px] max-w-[500px]'>Dare to get Stunned by DALL-E made imaginative images</p>
      </div>

      <div className='mt-16'>
        <FormField 
          label='Search posts'
          name='search'
          type='text'
          placeholder='Search by name or prompt'
          value={searchQuery}
          handleChange={handleSearch}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchQuery && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for: <span classNam='text-[#222328]'>{searchQuery}</span>
              </h2>
            )}
            
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchQuery ? (
                <RenderCards 
                  data={searchResults}
                  title='No results found' 
                />) : (
                <RenderCards
                  data={allPosts}
                  title='No posts found'
                />
              )}
            </div>
          </>
        )}

      </div>
    </section>
  )
}

export default Home