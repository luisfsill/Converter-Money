interface AmountInputProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  label: string;
  disabled?: boolean;
}

export default function AmountInput({ amount, onAmountChange, label, disabled = false }: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onAmountChange(value);
    } else if (e.target.value === '') {
      onAmountChange(0);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        className="input-field"
        placeholder="0.00"
        value={amount === 0 ? '' : amount}
        onChange={handleChange}
        min="0"
        step="0.01"
        disabled={disabled}
      />
    </div>
  );
} 