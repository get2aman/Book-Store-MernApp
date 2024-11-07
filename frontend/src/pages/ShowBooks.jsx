import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6">
      <BackButton />
      <h1 className="text-4xl font-bold text-blue-900 my-6">Book Details</h1>
      {loading ? (
        <div className="flex justify-center mt-8">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl border-2 border-blue-300 w-full max-w-md p-8 flex flex-col items-start">
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">ID:</span>
            <span className="text-lg ml-2 text-gray-800">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Title:</span>
            <span className="text-lg ml-2 text-gray-800">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Author:</span>
            <span className="text-lg ml-2 text-gray-800">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Publish Year:</span>
            <span className="text-lg ml-2 text-gray-800">{book.publishyear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Created At:</span>
            <span className="text-lg ml-2 text-gray-800">
              {new Date(book.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Last Updated:</span>
            <span className="text-lg ml-2 text-gray-800">
              {new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
