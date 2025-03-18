import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/index';
import Header from './components/Header/index';
import Sidebar from './components/Sidebar';
import ComposeMessage from './pages/Compose Message';
import Chat from './pages/Chat';


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
            <Route path="/compose-message" element={<ComposeMessage/>} />
            <Route path="/chat" element={<Chat/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
