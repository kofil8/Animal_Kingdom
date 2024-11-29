'use client';
import Link from 'next/link';
import { useState } from 'react';
import AnimalModal from '../Modals/AnimalModal';
import CategoryModal from '../Modals/CategoryModal';

interface Animal {
  name: string;
  category: string;
  image: string;
}

const animals: Animal[] = [
  { name: 'Elephant', category: 'Land Animal', image: '/images/elephant.svg' },
  { name: 'Horse', category: 'Land Animal', image: '/images/horse.svg' },
  { name: 'Fox', category: 'Land Animal', image: '/images/fox.svg' },
  { name: 'Cockatoo', category: 'Bird', image: '/images/cackatoo.svg' },
  { name: 'Phoenix', category: 'Bird', image: '/images/phoenix.svg' },
  { name: 'Sparrow', category: 'Bird', image: '/images/sparrow.svg' },
  { name: 'Tuna', category: 'Fish', image: '/images/tuna.svg' },
  { name: 'Red Fish', category: 'Fish', image: '/images/redFish.svg' },
  { name: 'Pomfret', category: 'Fish', image: '/images/pomfret.svg' },
  { name: 'Lady bug', category: 'Insect', image: '/images/ladyBug.svg' },
  { name: 'Butterfly', category: 'Insect', image: '/images/butterfly.svg' },
  { name: 'Bee', category: 'Insect', image: '/images/bee.svg' },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimalModalVisible, setAnimalModalVisibility] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisibility] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategorySelection = (category: string) => {
    setActiveCategory(category);
  };

  const handleAnimalModalToggle = () => {
    setAnimalModalVisibility((prev) => !prev);
  };

  const handleCategoryModalToggle = () => {
    setCategoryModalVisibility((prev) => !prev);
  };

  const filterAnimalsByCategory = (category: string) => {
    return category === 'All'
      ? animals
      : animals.filter((animal) => animal.category === category);
  };

  const filterAnimalsBySearchTerm = (animalsList: Animal[], term: string) => {
    return term
      ? animalsList.filter((animal) =>
          animal.category.toLowerCase().includes(term.toLowerCase())
        )
      : animalsList;
  };

  const displayedAnimals = filterAnimalsBySearchTerm(
    filterAnimalsByCategory(activeCategory),
    searchTerm
  );

  return (
    <>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-wrap gap-4 mb-6">
          {['All', 'Land Animal', 'Bird', 'Fish', 'Insect', 'Other'].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleCategorySelection(category)}
                className={`px-4 py-2 rounded flex items-center justify-center transition duration-300 ease-in-out ${
                  activeCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {category}
              </button>
            )
          )}
          <div className="flex-grow flex justify-end items-center px-4 space-x-4">
            <button
              onClick={handleAnimalModalToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Animal
            </button>
            <button
              onClick={handleCategoryModalToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Category
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedAnimals.map((animal) => (
            <div
              key={animal.name}
              className="bg-gray-100 p-4 rounded text-center"
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="mx-auto mb-2 h-40 w-40 object-cover"
              />
              <p className="font-semibold">{animal.name.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
      <AnimalModal
        isVisible={isAnimalModalVisible}
        onClose={handleAnimalModalToggle}
      />
      <CategoryModal
        isVisible={isCategoryModalVisible}
        onClose={handleCategoryModalToggle}
        onSearch={(term) => {
          setActiveCategory(term);
          setSearchTerm(term);
        }}
      />
    </>
  );
}
