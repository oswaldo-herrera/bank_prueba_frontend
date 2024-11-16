import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute.jsx';
import Home from './pages/home.jsx';
import Lista_cuentas from './pages/lista-cuentas.jsx';
import Lista_transacciones from './pages/lista-transacciones.jsx';
import Iniciar_sesion from './pages/iniciar-sesion.jsx';
import Registro from './pages/registro.jsx';

function App() {
  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center p-5" >
      <Router >
        <Routes>
          <Route path="/login" element={<Iniciar_sesion />} /> 
          <Route path="/register" element={<Registro />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/bank/:name" element={
            <PrivateRoute>
              <Lista_cuentas />
            </PrivateRoute>
          } />
          <Route path="/cuenta/:id/:link" element={
            <PrivateRoute>
              <Lista_transacciones />
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
