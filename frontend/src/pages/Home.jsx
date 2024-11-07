import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-gradient-to-t from-black opacity-70 absolute inset-0 z-0"></div> {/* Overlay for text readability */}
      <div className="relative z-10">
        <div className="flex justify-between items-center gap-x-4 mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            onClick={() => setShowType('table')}
          >
            Table View
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            onClick={() => setShowType('card')}
          >
            Card View
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-white font-semibold my-8">Books List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-blue-800 text-4xl hover:text-blue-600" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
