import { useState, useEffect } from 'react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import { getCurrencyRates, convertCurrency, formatCurrency } from './services/currencyService';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [rates, setRates] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getCurrencyRates('USD');
        setRates(data);
        
        // Formata a data de atualização
        const now = new Date();
        setLastUpdated(
          now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        );
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao buscar taxas de câmbio. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchRates();

    // Atualiza as taxas a cada 60 minutos
    const interval = setInterval(fetchRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      
      if (fromRate && toRate) {
        const rate = toRate / fromRate;
        setExchangeRate(rate);
        const converted = convertCurrency(amount, fromRate, toRate);
        setConvertedAmount(converted);
      }
    }
  }, [rates, fromCurrency, toCurrency, amount]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="currency-card max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Conversor de Moedas</h1>
        
        {error ? (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        ) : null}
        
        <div className="mb-6">
          <AmountInput 
            amount={amount} 
            onAmountChange={setAmount} 
            label="Valor para conversão" 
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <CurrencySelector
            selectedCurrency={fromCurrency}
            onCurrencyChange={setFromCurrency}
            label="De"
          />
          
          <div className="flex justify-center -my-2">
            <button 
              onClick={handleSwapCurrencies}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all"
              aria-label="Trocar moedas"
            >
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <CurrencySelector
            selectedCurrency={toCurrency}
            onCurrencyChange={setToCurrency}
            label="Para"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h2 className="text-sm text-gray-500 mb-1">Resultado da conversão</h2>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
          ) : (
            <div className="flex flex-col">
              <p className="text-xl font-bold text-primary">
                {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          {lastUpdated ? `Última atualização: ${lastUpdated}` : 'Atualizando taxas...'}
        </div>
        
        <div className="mt-8 text-xs text-gray-400 text-center">
          Desenvolvido By LF System | Dados fornecidos por Open Exchange Rates
        </div>
      </div>
    </div>
  );
}

export default App;
