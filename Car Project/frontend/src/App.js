import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/home/Home";
import {BrowserRouter,Routes,Route, Outlet, Navigate} from "react-router-dom"
import Header from "./components/header/Header";
import { useState } from 'react';
import CreatePost from "./components/create/CreatePost";



const PrivateRoute = ({ isAuthenticated, ...props }) => {
  //const token = sessionStorage.getItem('accessToken');
  //&& token
  return isAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
        <Header/>
        <div style={{marginTop:64}}>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />}  />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

          </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
