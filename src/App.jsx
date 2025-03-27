import CustomerPage from "./Pages/CustomersPage";
import TransactionsPage from "./Pages/TransactionPage";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<RegisterPage />} path="/RegisterPage" />
      <Route element={<LoginPage />} path="/LoginPage" />
      <Route element={<CustomerPage />} path="/customerPage" /> ;
      <Route element={<TransactionsPage />} path="/transaction/:customerId" /> ;
    </Routes>
  );
}

export default App;
