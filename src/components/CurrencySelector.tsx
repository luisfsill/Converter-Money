import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { popularCurrencies } from '../services/currencyService';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  label: string;
}

export default function CurrencySelector({ selectedCurrency, onCurrencyChange, label }: CurrencySelectorProps) {
  const selected = popularCurrencies.find(currency => currency.code === selectedCurrency) || popularCurrencies[0];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Listbox value={selectedCurrency} onChange={onCurrencyChange}>
        <div className="relative mt-1">
          <Listbox.Button className="input-field flex items-center justify-between pr-10">
            <span className="flex items-center">
              <span className="text-xl mr-2">{selected.flag}</span>
              <span className="block truncate">{selected.code} - {selected.name}</span>
            </span>
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {popularCurrencies.map((currency) => (
                <Listbox.Option
                  key={currency.code}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? 'bg-secondary/10 text-primary' : 'text-gray-900'
                    }`
                  }
                  value={currency.code}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{currency.flag}</span>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {currency.code} - {currency.name}
                        </span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 