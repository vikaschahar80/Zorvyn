import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { api } from '../api/mockApi';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [role, setRole] = useState(() => {
    return localStorage.getItem('zorvyn_role') || 'viewer';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('zorvyn_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('zorvyn_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('zorvyn_theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to load transactions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const newTx = await api.createTransaction(transaction);
      setTransactions(prev => [newTx, ...prev]);
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};

    transactions.forEach(t => {
      const amt = Number(t.amount);
      if (t.type === 'income') {
        income += amt;
      } else {
        expense += amt;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      }
    });

    let highestSpendingCategory = 'N/A';
    let maxSpend = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxSpend) {
        maxSpend = amt;
        highestSpendingCategory = cat;
      }
    });

    return {
      totalBalance: income - expense,
      totalIncome: income,
      totalExpense: expense,
      highestSpendingCategory,
      categoryStats: categoryTotals
    };
  }, [transactions]);

  const value = {
    transactions,
    isLoading,
    role,
    setRole,
    theme,
    toggleTheme,
    addTransaction,
    deleteTransaction,
    stats
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
