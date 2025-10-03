
import React, { useState, useCallback } from 'react';
import { generateDarijaJoke } from './services/geminiService';
import type { Joke } from './types';
import JokeCard from './components/JokeCard';
import Loader from './components/Loader';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 text-yellow-300">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clipRule="evenodd" />
    </svg>
);


const App: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateJoke = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setJoke(null);
        try {
            const newJoke = await generateDarijaJoke();
            setJoke(newJoke);
        } catch (err) {
            setError('Failed to generate a joke. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
            <div 
              className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'rgb(120, 120, 120)\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}>
            </div>
            <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-500 tracking-tight">مول النكتة</h1>
                    <p className="text-lg md:text-xl mt-2 text-green-700 dark:text-green-400">Moroccan Darija Jokes Generator</p>
                </header>

                <div className="w-full max-w-2xl text-center">
                    <button
                        onClick={handleGenerateJoke}
                        disabled={isLoading}
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-green-400 dark:bg-green-700 dark:hover:bg-green-800 dark:disabled:bg-green-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-500 dark:focus:ring-green-600"
                    >
                        {isLoading ? (
                            <>
                                <Loader />
                                Generating...
                            </>
                        ) : (
                            <>
                                Get a New Joke
                                <StarIcon />
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-8 w-full max-w-2xl min-h-[250px] flex items-center justify-center">
                    {isLoading ? null : error ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
                            <p className="font-bold">Oops!</p>
                            <p>{error}</p>
                        </div>
                    ) : joke ? (
                        <JokeCard joke={joke} />
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <p className="text-lg">Click the button to get your first Darija joke!</p>
                          <p className="mt-2 text-sm">برك على البوطونة باش تشوف أول نكتة ديالك</p>
                        </div>
                    )}
                </div>
                <footer className="absolute bottom-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  <p>Powered by AI & Moroccan Humor</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
