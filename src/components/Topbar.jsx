import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { FiUser, FiSun, FiMoon } from 'react-icons/fi';

const Topbar = () => {
  const { role, setRole, theme, toggleTheme } = useFinance();

  return (
    <header className="h-[72px] border-b border-[var(--color-border)] flex items-center justify-between px-8 bg-[var(--color-main)]/80 backdrop-blur-md sticky top-0 z-10 w-full">
      <div>
        <h3 className="m-0 font-medium text-lg font-heading text-[var(--color-text-primary)]">Finance Overview</h3>
        <p className="text-[var(--color-text-muted)] text-sm m-0">Welcome back, track your expenses</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-[var(--color-text-muted)] text-sm font-medium">Role:</label>
          <select 
            className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-3 py-1.5 rounded-md font-sans text-sm outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-glow)] transition-all cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div 
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors shadow-sm"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <FiMoon size={18} color="var(--color-text-secondary)" /> : <FiSun size={18} color="var(--color-text-secondary)" />}
        </div>
        
        <div className="w-9 h-9 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors shadow-sm">
          <FiUser size={18} color="var(--color-text-secondary)" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
