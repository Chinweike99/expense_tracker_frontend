import { useCurrencyStore } from "../stores/currency.store";


export function useCurrencyConverter(){
    const { currencies, primaryCurrency} = useCurrencyStore();
    const convert = (amount: number, fromCurrency: string, toCurrency?: string) => {
        if(!primaryCurrency) return amount;

        const targetCurrency = toCurrency || primaryCurrency.code;
        if(fromCurrency === targetCurrency) return amount;

        const fromRate = currencies.find(c => c.code  === fromCurrency)?.exchangeRate || 1;
        const toRate = currencies.find(c => c.code === targetCurrency)?.exchangeRate || 1;

        return (amount / fromRate) * toRate;
    };

    const format = (amount: number, currency: string) => {
        return amount.toLocaleString(undefined, {
            style: "currency",
            currency,
        })
    }

    return { convert, format}
}

