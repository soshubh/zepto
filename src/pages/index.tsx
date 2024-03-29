// pages/index.tsx
import React from 'react';
// import AutocompleteChips from './AutocompleteChips';
import AutoComplete from './AutoComplete';

const Home: React.FC = () => {
  return (
    <div className="container flex flex-col max-w-screen-xl items-center pt-20 h-screen bg-slate-100">
       <h1 className="text-4xl font-bold text-gray-900 mb-4">Pick User</h1>
      <AutoComplete />
    </div>
  );
};

export default Home;
