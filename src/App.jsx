import CustomerPage from "./Pages/CustomersPage";
import TransactionsPage from "./Pages/TransactionPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<CustomerPage />} path="/" /> ;
      <Route element={<TransactionsPage />} path="/transaction/:customerId" /> ;
    </Routes>
  );
}

export default App;
