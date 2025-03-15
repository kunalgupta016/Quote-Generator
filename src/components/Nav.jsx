import React, { useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const Nav = () => {
  const [input, setInput] = useState('');
  const [quotes, setQuotes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [Randomloading, setRandomLoading] = useState(false);

  const getQuotes = async (tag) => {
    try {
      const response = await axios.get(`https://api.quotable.io/quotes?tags=${tag}`);
      return response.data.results; 
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const randomGenerate = async ()=>{
    setRandomLoading(true);
    try{
      const response = await axios.get('https://api.quotable.io/random');
      const data = response.data;
      setQuotes([data]);
    }catch(error){
      console.error('Error fetching random quote:', error);
    }
    setRandomLoading(false);
  }

  const getMultiplePagesOfQuotes = async (tag, totalPages = 3) => {
    setLoading(true)
    let allQuotes = [];
    
    for (let page = 1; page <= totalPages; page++) {
      const quotesFromPage = await getQuotes(tag);
      allQuotes = [...allQuotes, ...quotesFromPage]; // Concatenate quotes from each page
    }
    
    setQuotes(allQuotes); // Update state with all quotes
    setLoading(false)
  };

  const getdata = () => {
    if (input) {
      getMultiplePagesOfQuotes(input, 3); // Fetch 3 pages of quotes for example
    }
  };

  return (
    <>
    <h1 className='lg:text-7xl md:text-5xl text-xl font-semibold bg-transparent text-center m-2 '>QUOTE GENERATOR </h1>
      <div className="bg-transparent flex flex-wrap justify-center items-center min-h-screen p-6">
        
        <input
          className="p-4 lg:w-96 md:w-64 w-52 gap-0 rounded-lg text-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Tag (History, Love, ...)"
        />
        <button
          className="lg:ml-4 md:ml-3 ml-2 px-6 py-3 bg-emerald-300 text-white rounded-lg font-semibold shadow-lg hover:bg-emerald-400 transition-all duration-300 disabled:cursor-not-allowed"
          onClick={getdata}
          disabled={loading}
        >
          {loading ? 'Generating....' :'Generate'}
        </button>
        <button className="lg:ml-4 md:ml-3 ml-2 px-6 py-3 bg-emerald-300 text-white rounded-lg font-semibold shadow-lg hover:bg-emerald-400 transition-all duration-300 disabled:cursor-not-allowed"
          onClick={randomGenerate}
          disabled={Randomloading}>
          {Randomloading ? 'Generating....' :'Random Generate'}
        </button>
      </div>

      <Cards quotes={quotes} />
    </>
  );
};

export default Nav;
