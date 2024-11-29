"use client";
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface AddAnimalModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const AddAnimalModal = ({ isVisible, onClose }: AddAnimalModalProps) => {
  if (!isVisible) return null;

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const [animalName, setAnimalName] = useState('');
  const [animalImage, setAnimalImage] = useState<File | null>(null);
  const [animalCategory, setAnimalCategory] = useState<string>('Land Animal');

  const handleAnimalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalName(e.target.value);
  };

  const handleAnimalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAnimalImage(file);
  };

  const handleAnimalCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAnimalCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!animalName || !animalImage) return;

    const formData = new FormData();
    formData.append('animalName', animalName);
    formData.append('animalImage', animalImage);
    formData.append('animalCategory', animalCategory);

    try {
      const response = await axios.post('.../api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error uploading image:', error.message);
      } else {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm"
      onClick={handleWrapperClick}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-2">Add Animal</h2>
          <button
            type="button"
            className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="animalName"
              className="block text-sm font-medium text-gray-700"
            >
              Animal Name
            </label>
            <input
              type="text"
              id="animalName"
              name="animalName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={animalName}
              onChange={handleAnimalNameChange}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="animalImage"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              onChange={handleAnimalImageChange}
              type="file"
              id="animalImage"
              name="animalImage"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="animalCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="animalCategory"
              name="animalCategory"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={animalCategory}
              onChange={handleAnimalCategoryChange}
              required
            >
              <option value="Land Animal">Land Animal</option>
              <option value="Bird">Bird</option>
              <option value="Fish">Fish</option>
              <option value="Insect">Insect</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out w-full"
            onClick={() => { }}
          >
            Create Animal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimalModal;
