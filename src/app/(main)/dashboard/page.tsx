import { AccountForm } from "@/app/components/accounts/AccountForm";
import CurrencyForm from "@/app/components/currencies/CurrencyForm";
import CurrenciesPage from "../settings/currencies/page";
import { TransactionForm } from "@/app/components/transactions/TransactionForm";

export default function Dashboard() {
    return(
        <div>
            Welcome
            <AccountForm />
            {/*<CurrencyForm /> */}
            {/* <CurrenciesPage /> */}
            <TransactionForm />

        </div>
    )
}