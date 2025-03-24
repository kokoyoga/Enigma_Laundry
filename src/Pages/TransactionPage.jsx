import Navbar from "../Components/Navbar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  user,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Result } from "postcss";

function TransactionsPage() {
  const [transactionCountMapping, setTransactionCountMapping] = useState({});

  const [customerList, setCustomerList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  const getCustomerList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer");
      setCustomerList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactionList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      setTransactionList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const countTransactionByCustomerId = (customerId) => {
    const result = transactionList.filter(
      (el) => el.customer_id == customerId
    ).length;
    return result;
  };

  useEffect(() => {
    getCustomerList();
    getTransactionList();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <Navbar />
      <Card className=" flex flex-col items-center">
        <h1 className="font-semibold text-center">Daftar Transaksi</h1>
        <Divider />
        <div className="flex flex-col gap-4 p-5 text-center">
          <h1>Kode Transaksi</h1>
          <Input id="transactionId" type="" />
          <h1>Nama Pelanggan</h1>
          <Input id="Name" type="text" />
          <h1>Paket Laundry</h1>
          <Input type="text" />
          <h1>Qty</h1>
          <Input type="text" />
          <h1>Total</h1>
          <p>.....</p>
          <Button id="buttonAddTransaction" className="w-50">
            Add Transaction
          </Button>
        </div>
      </Card>
      <Card className="">
        <CardBody className="gap-4">
          <div id="TableRow1" className="flex gap-4">
            <div id="CustomerId">Kode Pelanggan</div>
            <div id="Name">Nama Pelanggan</div>
            <div id="TransactionId">Tabel Transaksi</div>
          </div>

          {customerList.map((customer) => (
            <div key={customer.id} className="flex gap-4">
              <div>{customer.code}</div>
              <div className="flex flex-col">
                <p>{customer.name}</p>
                <p>{countTransactionByCustomerId(customer.id)} Transaksi</p>
              </div>
              <div>{customer.transactionId}</div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default TransactionsPage;
