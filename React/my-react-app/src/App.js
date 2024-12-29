import './Style.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Room from './Pages/Room';
import Signup from './Pages/Signup';
import Settings from './Pages/Settings';
import Topics from './Pages/Topics';
import Profile from './Pages/Profile';
import RoomCreate from './Pages/RoomCreate';
import RoomUpdate from './Pages/RoomUpdate';
import RoomDelete from './Pages/RoomDelete';
import MessagesDelete from './Pages/MessagesDelete';
import Logout from './Pages/Logout';
import PrivateRoute from './Utils/PrivateRoute';
import Authentication from './Context/Authentication';

function App() {
  return (
    <>
      <Authentication>
        <Routes>
          <Route path='/' element={<PrivateRoute Component={Home} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/topics' element={<Topics />} />
          <Route path='/profile/:id' element={<PrivateRoute Component={Profile} />} />

          <Route path="/rooms" >  {/* Parent route */}
            <Route index element={<PrivateRoute Component={Room} />} />  {/* Renders only when parent route called (/rooms) */} {/*  currently no component existing, just for your reference of calling component when the parent route called */}
            <Route path=':id' element={<PrivateRoute Component={Room} />} /> {/* Render to specific room */}
            <Route path='create' element={<RoomCreate />} />
            <Route path='update/:id' element={<RoomUpdate />} />
            <Route path='delete/:id' element={<RoomDelete />} />
          </Route>

          <Route path='/messages/delete/:id' element={<MessagesDelete />} />

        </Routes>
      </Authentication>
    </>
  );
}

export default App;
