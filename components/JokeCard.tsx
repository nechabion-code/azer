
import React from 'react';
import type { Joke } from '../types';

interface JokeCardProps {
  joke: Joke;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl transform transition-all duration-500 animate-fade-in">
      <div className="space-y-6">
        
        {/* Darija Section */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2 text-right font-cairo">بالدارجة</h2>
          <p dir="rtl" className="text-2xl font-cairo text-right text-gray-800 dark:text-gray-200 leading-relaxed">
            {joke.joke_darija}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Transliteration Section */}
        <div>
          <h2 className="text-sm font-semibold text-red-600 dark:text-red-500 uppercase tracking-wider mb-2">Transliteration</h2>
          <p className="text-lg italic text-gray-600 dark:text-gray-400">
            {joke.joke_transliteration}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* English Section */}
        <div>
          <h2 className="text-sm font-semibold text-red-600 dark:text-red-500 uppercase tracking-wider mb-2">English Translation</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {joke.joke_english}
          </p>
        </div>

      </div>
       <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default JokeCard;
