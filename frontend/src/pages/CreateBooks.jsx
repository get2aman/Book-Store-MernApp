import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSavebook = () => {
    const data = { title, author, publishyear };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-blue-800 my-6">Create New Book</h1>
      {loading && <div className="flex justify-center my-4"><Spinner /></div>}
      <div className="flex flex-col border-2 border-blue-300 bg-white shadow-lg rounded-xl w-full max-w-lg mx-auto p-6">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-blue-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-600"
            placeholder="Enter book title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-blue-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-600"
            placeholder="Enter author name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Publish Year</label>
          <input
            type="text"
            value={publishyear}
            onChange={(e) => setPublishyear(e.target.value)}
            className="border border-blue-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-600"
            placeholder="Enter publish year"
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
          onClick={handleSavebook}
          disabled={loading}
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
