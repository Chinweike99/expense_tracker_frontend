"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import  CurrencyForm  from "@/app/components/currencies/CurrencyForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useCurrencyStore } from "@/app/stores/currency.store";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CurrenciesPage() {
  const {
    currencies,
    fetchCurrencies,
    setPrimaryCurrency,
    updateExchangeRates,
    deleteCurrency,
  } = useCurrencyStore();

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Currencies</h1>
        <div className="flex gap-2">
          <Button onClick={() => updateExchangeRates()}>
            Update Exchange Rates
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Currency</Button>
            </DialogTrigger>
            <DialogContent>
            <DialogTitle></DialogTitle>
              <CurrencyForm onSuccess={() => fetchCurrencies()} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Exchange Rate</TableHead>
              <TableHead>Primary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell>{currency.code}</TableCell>
                <TableCell>{currency.name}</TableCell>
                <TableCell>{currency.symbol}</TableCell>
                <TableCell>{currency.exchangeRate?.toFixed(4)}</TableCell>
                <TableCell>
                  {currency.isPrimary ? (
                    <span className="text-green-500">Primary</span>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => setPrimaryCurrency(currency.code)}
                    >
                      Set Primary
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {!currency.isPrimary && (
                    <Button
                      variant="ghost"
                      onClick={() => deleteCurrency(currency.code)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}