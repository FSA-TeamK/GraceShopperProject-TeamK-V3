import React from 'react';
import AppRoutes from './AppRoutes';
import Navbar from '../features/Navbar/Navbar.js'
import Footer from '../features/Footer/Footer.js';


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
