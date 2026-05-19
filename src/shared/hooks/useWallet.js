import { useEffect, useState } from 'react';
import { walletApi } from '../api/walletApi';

export function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadWallet = async () => {
      setLoading(true);
      try {
        const [balance, txResult] = await Promise.all([
          walletApi.getBalance(),
          walletApi.getTransactions(1, 20),
        ]);
        if (!cancelled) {
          setWallet(balance);
          setTransactions(txResult.transactions || []);
          setError(null);
        }
      } catch (error) {
        console.error('Failed to load wallet:', error);
        if (!cancelled) setError(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadWallet();
    return () => {
      cancelled = true;
    };
  }, []);

  const topUp = async (amount, paymentMethodId) => {
    setLoading(true);
    try {
      const result = await walletApi.topUp(amount, paymentMethodId);
      const balance = await walletApi.getBalance();
      setWallet(balance);
      setError(null);
      return result;
    } catch (error) {
      console.error('Failed to top up:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    wallet,
    transactions,
    loading,
    error,
    topUp,
  };
}
