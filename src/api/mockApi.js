import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateMockData = () => {
  const today = new Date();
  return [
    { id: uuidv4(), description: 'Zorvyn Cloud Setup', category: 'Software', type: 'expense', amount: 1599.00, date: subDays(today, 1).toISOString() },
    { id: uuidv4(), description: 'Client Project Alpha', category: 'Freelance', type: 'income', amount: 4500.00, date: subDays(today, 2).toISOString() },
    { id: uuidv4(), description: 'Design Assets', category: 'Design', type: 'expense', amount: 120.50, date: subDays(today, 3).toISOString() },
    { id: uuidv4(), description: 'Monthly Retainer', category: 'Salary', type: 'income', amount: 5500.00, date: subDays(today, 5).toISOString() },
    { id: uuidv4(), description: 'AWS Hosting', category: 'Infrastructure', type: 'expense', amount: 890.00, date: subDays(today, 7).toISOString() },
    { id: uuidv4(), description: 'Marketing Ad Spend', category: 'Marketing', type: 'expense', amount: 2100.00, date: subDays(today, 8).toISOString() },
    { id: uuidv4(), description: 'Consulting Fees', category: 'Freelance', type: 'income', amount: 1200.00, date: subDays(today, 10).toISOString() },
    { id: uuidv4(), description: 'Office Equipment', category: 'Hardware', type: 'expense', amount: 3200.00, date: subDays(today, 15).toISOString() },
    { id: uuidv4(), description: 'SaaS Subscriptions', category: 'Software', type: 'expense', amount: 340.00, date: subDays(today, 16).toISOString() },
    { id: uuidv4(), description: 'Q1 Bonus', category: 'Salary', type: 'income', amount: 3000.00, date: subDays(today, 20).toISOString() },
  ];
};

const getPersistedData = () => {
  const saved = localStorage.getItem('zorvyn_transactions');
  if (saved) return JSON.parse(saved);
  
  const initial = generateMockData();
  localStorage.setItem('zorvyn_transactions', JSON.stringify(initial));
  return initial;
};

const persistData = (data) => {
  localStorage.setItem('zorvyn_transactions', JSON.stringify(data));
};

export const api = {
  getTransactions: async () => {
    await delay(600); // simulate 600ms network delay
    return getPersistedData();
  },
  
  createTransaction: async (transaction) => {
    await delay(400);
    const transactions = getPersistedData();
    const newTx = { ...transaction, id: uuidv4(), date: new Date().toISOString() };
    persistData([newTx, ...transactions]);
    return newTx;
  },
  
  deleteTransaction: async (id) => {
    await delay(400);
    const transactions = getPersistedData();
    const filtered = transactions.filter(t => t.id !== id);
    persistData(filtered);
    return id;
  }
};
