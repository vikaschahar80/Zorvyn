import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { FiGrid, FiList, FiPieChart, FiSettings } from 'react-icons/fi';

const Sidebar = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-[260px] bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col p-6 transition-all sticky top-0 h-screen z-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] shadow-[var(--shadow-glow)]">
          <FiPieChart color="white" size={20} />
        </div>
        <h2 className="m-0 text-xl font-heading font-semibold tracking-tight text-[var(--color-text-primary)]">Zorvyn</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-colors font-sans ${
             currentView === 'dashboard' ? 'bg-white/5 text-[var(--color-text-primary)] font-semibold' : 'bg-transparent text-[var(--color-text-secondary)] font-normal hover:bg-white/5 hover:text-[var(--color-text-primary)]'
          }`}
        >
          <FiGrid size={18} /> Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('transactions')}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-colors font-sans ${
             currentView === 'transactions' ? 'bg-white/5 text-[var(--color-text-primary)] font-semibold' : 'bg-transparent text-[var(--color-text-secondary)] font-normal hover:bg-white/5 hover:text-[var(--color-text-primary)]'
          }`}
        >
          <FiList size={18} /> Transactions
        </button>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-[var(--color-text-secondary)] text-left hover:text-[var(--color-text-primary)] transition-colors rounded-lg font-sans">
          <FiSettings size={18} /> Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
