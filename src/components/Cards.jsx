import React from 'react';
import { motion } from 'framer-motion';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,

} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";


function Cards({ quotes }) {

  const shareUrl = window.location.href;

  return (
    <motion.div 
      className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-6 py-8 bg-gradient-to-r from-sky-100 to-indigo-200'
    >
      {quotes.length > 0 ? (
        quotes.map((quote, index) => (
          <motion.div 
            key={index}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 5,
              bottom: 0
            }}
            className='w-full h-auto rounded-2xl p-6 bg-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl flex flex-col justify-between items-start relative'
          >
            <p className='text-lg text-gray-700 font-medium mb-4'>{quote.content}</p>
            <h3 className='text-xl font-semibold text-teal-500'>- {quote.author}</h3>
            <div >
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true}/>
              </FacebookShareButton>
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true}/>
              </EmailShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true}/>
              </WhatsappShareButton>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={32} round={true}/>
              </TwitterShareButton>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-500">No quotes available. Please enter a tag and click Generate.</p>
      )}
    </motion.div>
  );
}

export default Cards;
