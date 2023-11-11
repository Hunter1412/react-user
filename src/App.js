import { useState } from 'react';
import './App.scss';
import Header from './components/Header';

import AppRoutes from './AppRoutes';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
