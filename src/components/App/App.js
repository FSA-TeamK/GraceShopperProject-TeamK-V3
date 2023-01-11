import React from 'react';
import AppRoutes from './AppRoutes';
import Navbar from '../Navbar/Navbar.js'
import Footer from '../Footer.js';


const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
