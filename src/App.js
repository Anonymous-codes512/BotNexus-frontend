import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/home';
import Header from './components/Header/index';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main d-flex">
        <aside className="sidebar-wrapper">
          <Sidebar/>
        </aside>

        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
