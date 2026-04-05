import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Topbar />
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' ? <Dashboard key="dashboard" /> : <Transactions key="transactions" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
