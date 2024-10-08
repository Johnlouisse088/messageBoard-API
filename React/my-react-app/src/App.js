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

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/topics' element={<Topics />} />
        <Route path='/profile/:id' element={<Profile />} />

        <Route path="/rooms" >  {/* Parent route */}
          <Route index element={<Room />} />  {/* Renders only when parent route called (/rooms) */}
          <Route path='create/:id' element={<RoomCreate />} />
          <Route path='update/:id' element={<RoomUpdate />} />
          <Route path='delete/:id' element={<RoomDelete />} />
        </Route>

        <Route path='/messages/delete/:id' element={<MessagesDelete />} />
      </Routes>
    </>
  );
}

export default App;
