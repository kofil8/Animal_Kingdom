import { useState } from 'react';

interface CategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

const CategoryModal = ({
  isVisible,
  onClose,
  onSearch,
}: CategoryModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-2">Add Category</h2>
          <button
            type="button"
            className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form>
          <div className="mb-2">
            <label
              htmlFor="categorySearch"
              className="block text-sm font-medium text-gray-700"
            >
              Search Category
            </label>
            <input
              type="text"
              id="categorySearch"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Animal Category"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-150 ease-in-out w-full"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
