import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { format, parseISO } from 'date-fns';
import { FiSearch, FiPlus, FiTrash2, FiFilter, FiDownload } from 'react-icons/fi';
import TransactionModal from '../components/TransactionModal';
import { exportToCSV, exportToJSON } from '../utils/export';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions = () => {
  const { transactions, role, deleteTransaction, isLoading } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter & Search Logic
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    // Sort Logic
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'amount-desc') {
        return Number(b.amount) - Number(a.amount);
      } else if (sortBy === 'amount-asc') {
        return Number(a.amount) - Number(b.amount);
      }
      return 0;
    });

    return result;
  }, [transactions, searchTerm, filterType, sortBy]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 h-full max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-heading font-semibold text-[var(--color-text-primary)] m-0">Transactions History</h2>
        {role === 'admin' && (
          <button 
             className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:-translate-y-px transition-all w-full sm:w-auto"
             onClick={() => setIsModalOpen(true)}
          >
            <FiPlus size={18} /> Add Transaction
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[1rem] shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-[var(--color-border)]">
          <div className="flex-1 max-w-md relative">
            <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              className="w-full bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] pl-11 pr-4 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-[var(--color-text-muted)] text-sm" 
              placeholder="Search description or category..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <FiFilter size={18} className="text-[var(--color-text-muted)] hidden sm:block" />
              <select 
                className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm cursor-pointer" 
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select 
                className="bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm cursor-pointer" 
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>
            </div>

            <div className="w-px h-8 bg-[var(--color-border)] hidden sm:block"></div>

            <div className="flex gap-2">
              <button 
                onClick={() => exportToCSV(filteredTransactions)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-main)] hover:bg-white/5 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                title="Export as CSV"
              >
                <FiDownload size={14} /> CSV
              </button>
              <button 
                onClick={() => exportToJSON(filteredTransactions)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-main)] hover:bg-white/5 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                title="Export as JSON"
              >
                <FiDownload size={14} /> JSON
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)]">Date</th>
                <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)]">Description</th>
                <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)]">Category</th>
                <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)]">Type</th>
                <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)] text-right">Amount</th>
                {role === 'admin' && <th className="bg-white/5 px-6 py-4 font-medium text-[var(--color-text-secondary)] text-sm border-b border-[var(--color-border)] text-center w-20">Action</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={role === 'admin' ? 6 : 5} className="text-center py-12 text-[var(--color-text-muted)]">
                      No transactions found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((t, i) => (
                    <motion.tr 
                      key={t.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className={`px-6 py-4 text-sm text-[var(--color-text-muted)] ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                        {format(parseISO(t.date), 'MMM dd, yyyy')}
                      </td>
                      <td className={`px-6 py-4 font-medium text-[var(--color-text-primary)] ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                        {t.description}
                      </td>
                      <td className={`px-6 py-4 ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                        <span className="inline-flex items-center px-3 py-1 bg-[var(--color-main)] border border-[var(--color-border)] rounded-full text-xs font-medium text-[var(--color-text-primary)]">
                          {t.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold ${t.type === 'income' ? 'text-emerald-500' : 'text-[var(--color-text-primary)]'} ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                        {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      {role === 'admin' && (
                        <td className={`px-6 py-4 text-center ${i !== filteredTransactions.length -1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                          <button 
                            onClick={() => deleteTransaction(t.id)}
                            className="p-2 text-[var(--color-text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Delete Transaction"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default Transactions;
