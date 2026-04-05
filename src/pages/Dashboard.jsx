import React from 'react';
import { useFinance } from '../context/FinanceContext';
import TrendChart from '../components/charts/TrendChart';
import BreakdownChart from '../components/charts/BreakdownChart';
import { FiDollarSign, FiArrowUpRight, FiArrowDownRight, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MetricCard = ({ title, amount, icon, type }) => {
  const isIncome = type === 'income';
  const isNeutral = type === 'neutral';
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[1rem] p-6 shadow-sm hover:shadow-md hover:shadow-[var(--shadow-glow)] transition-all flex flex-col gap-4 group"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-[var(--color-text-muted)] font-medium m-0 text-sm">{title}</h4>
        <div className={`p-2.5 rounded-[10px] transition-colors ${
          isNeutral ? 'bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20' : 
          isIncome ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20' : 
          'bg-rose-500/10 text-rose-500 group-hover:bg-rose-500/20'
        }`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-heading font-bold tracking-tight text-[var(--color-text-primary)]">
         ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { stats, transactions, isLoading } = useFinance();

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
      className="flex flex-col gap-6 w-full max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-heading font-semibold text-[var(--color-text-primary)]">Dashboard Overview</h2>
        <div className="inline-flex items-center px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-sm font-medium">
          Last 30 Days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Balance" 
          amount={stats.totalBalance} 
          type="neutral"
          icon={<FiDollarSign size={20} />} 
        />
        <MetricCard 
          title="Total Income" 
          amount={stats.totalIncome} 
          type="income"
          icon={<FiArrowUpRight size={20} />} 
        />
        <MetricCard 
          title="Total Expenses" 
          amount={stats.totalExpense} 
          type="expense"
          icon={<FiArrowDownRight size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[1rem] p-6 shadow-sm hover:border-[var(--color-border)]/80 transition-all">
          <h4 className="mb-6 font-medium text-[var(--color-text-primary)] font-heading">Balance Trend</h4>
          <TrendChart data={transactions} />
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[1rem] p-6 shadow-sm">
            <h4 className="mb-6 font-medium text-[var(--color-text-primary)] font-heading">Spending Breakdown</h4>
            <BreakdownChart data={stats.categoryStats} />
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[1rem] p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-[var(--shadow-glow)]">
              <FiTrendingUp size={24} />
            </div>
            <div>
              <p className="text-[var(--color-text-muted)] text-sm mb-1 font-medium">Highest Spending Category</p>
              <h4 className="m-0 text-xl font-heading font-semibold text-[var(--color-text-primary)]">
                {stats.highestSpendingCategory}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
