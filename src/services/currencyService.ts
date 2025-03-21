import axios from 'axios';

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: CurrencyRates;
}

// API para obter taxas de câmbio em tempo real
// Usamos a API gratuita da exchangerate-api.com
const API_URL = 'https://open.er-api.com/v6/latest';

export const getCurrencyRates = async (baseCurrency = 'USD'): Promise<CurrencyRates> => {
  try {
    const response = await axios.get<CurrencyResponse>(`${API_URL}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    console.error('Erro ao buscar taxas de câmbio:', error);
    throw new Error('Não foi possível obter as taxas de câmbio. Por favor, tente novamente mais tarde.');
  }
};

export const convertCurrency = (amount: number, fromRate: number, toRate: number): number => {
  return (amount / fromRate) * toRate;
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Lista de moedas populares com seus códigos, nomes e bandeiras
export const popularCurrencies = [
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭' },
  { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
]; 