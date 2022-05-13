import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateOrUpdateUser from './components/UserCreateorUpdate';
import Table from './components/Table';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Table /> } />
        <Route path='/users/create' element={ <CreateOrUpdateUser /> } />
        <Route path='/users/update/:id' element={ <CreateOrUpdateUser /> } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
