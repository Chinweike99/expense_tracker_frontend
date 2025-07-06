import { AccountForm } from "@/app/components/accounts/AccountForm";
import CurrencyForm from "@/app/components/currencies/CurrencyForm";
import CurrenciesPage from "../settings/currencies/page";

export default function Dashboard() {
    return(
        <div>
            Welcome
            {/* <AccountForm />
            <CurrencyForm /> */}
            <CurrenciesPage />
        </div>
    )
}