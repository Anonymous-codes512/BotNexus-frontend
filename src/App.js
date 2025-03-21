import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toastify

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Dashboard from './pages/Dashboard/index';
import Header from './components/Header/index';
import Sidebar from './components/Sidebar';
import ComposeMessage from './pages/Compose Message';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import ContactsList from './pages/Contact/Contacts List';
import { ToastContainer } from 'react-toastify/unstyled';
import Reports from './pages/Reports';
import PaymentScreen from './pages/Payment Screen';

// Initialize Stripe with your public key (replace with your actual public key)
const stripePromise = loadStripe('pk_test_51R1PToP8FP4KADdgC5T5E0red3ToQAwvHCsC1gsyEAHlhLXwCNsh02QO2LZUbJMbSSdewDCh7qPzdJVpprlBOauL00xDGB02v2');

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer /> 
      <div className="main d-flex">
        <aside className="sidebar-wrapper">
          <Sidebar />
        </aside>

        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compose-message" element={<ComposeMessage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/contact-list" element={<ContactsList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Reports />} />
            
            {/* Wrap PaymentScreen component with Elements provider */}
            <Route 
              path="/payment-screen" 
              element={
                <Elements stripe={stripePromise}>
                  <PaymentScreen />
                </Elements>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
