import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header';

import AppRoutes from './routes/AppRoutes';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction"


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(handleRefresh())
    }
  }, [])


  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
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
