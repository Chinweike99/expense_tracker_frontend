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
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Currencies</h1>
        <div className="flex gap-2">
          <Button onClick={() => updateExchangeRates()} className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer">
            Update Exchange Rates
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer">Add Currency</Button>
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
              <TableHead className="border-r text-center text-gray-500 font-semibold">Code</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Name</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Symbol</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Exchange Rate</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Primary</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell className="border-r text-center text-gray-500 font-semibold" >{currency.code}</TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold" >{currency.name}</TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold" >{currency.symbol}</TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold" >{currency.exchangeRate?.toFixed(4)}</TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold" >
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
                <TableCell className="border-r text-center text-gray-500 font-semibold">
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