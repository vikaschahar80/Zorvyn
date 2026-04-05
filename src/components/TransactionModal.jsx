import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.description || !formData.amount || !formData.category) return;
    
    addTransaction({
      ...formData,
      amount: Number(formData.amount)
    });
    
    setFormData({ description: '', amount: '', category: '', type: 'expense' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 w-full max-w-lg shadow-[var(--shadow-glow)]" 
            onClick={e => e.stopPropagation()}
          >
        <div className="flex justify-between items-center mb-8">
          <h3 className="m-0 text-xl font-heading font-semibold text-[var(--color-text-primary)]">Add Transaction</h3>
          <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
             <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--color-text-primary)]">
                <input 
                  type="radio" 
                  name="type" 
                  value="expense" 
                  className="accent-rose-500 w-4 h-4 cursor-pointer"
                  checked={formData.type === 'expense'}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                />
                Expense
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--color-text-primary)]">
                <input 
                  type="radio" 
                  name="type" 
                  value="income"
                  className="accent-emerald-500 w-4 h-4 cursor-pointer" 
                  checked={formData.type === 'income'}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                />
                Income
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Description</label>
            <input 
              type="text" 
              className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 rounded-lg w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-[var(--color-text-muted)]" 
              placeholder="E.g., Office Supplies"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Amount</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 rounded-lg w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans placeholder:text-[var(--color-text-muted)]" 
                placeholder="0.00"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Category</label>
              <input 
                type="text" 
                className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 rounded-lg w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-[var(--color-text-muted)]" 
                placeholder="E.g., Hardware"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-card-hover)] hover:border-[var(--color-text-secondary)] transition-all" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:-translate-y-px transition-all"
            >
              Save Transaction
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
