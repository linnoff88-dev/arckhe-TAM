import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Consultation from './pages/Consultation';
import VideoCall from './pages/VideoCall';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <>
            {/* Rotas com Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="pacientes" element={<Patients />} />
              <Route path="agendamentos" element={<Appointments />} />
              <Route path="atendimento/:id" element={<Consultation />} />
            </Route>

            {/* Rota sem Layout (tela cheia) */}
            <Route path="/videochamada/:id" element={<VideoCall />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
