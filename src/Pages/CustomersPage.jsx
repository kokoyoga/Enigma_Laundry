import Navbar from "../Components/Navbar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionsPage() {
  const [customerList, setCustomerList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  const navigate = useNavigate();

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

  const handleButtonTransactionDetail = (customerId) => {
    navigate(`/transaction/${customerId}`);
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <Navbar />
      <Card className="w-full max-w-4xl mt-5">
        <CardBody className="flex flex-col items-center gap-4">
          <div className="flex w-full justify-between items-center p-3 bg-gray-200 rounded-lg mb-3">
            <div className="font-medium w-1/4 text-center">Kode Pelanggan</div>
            <div className="font-medium w-1/4 text-center">Nama Pelanggan</div>
            <div className="font-medium w-1/4 text-center">Tabel Transaksi</div>
          </div>

          {customerList.map((customer) => (
            <div
              key={customer.id}
              className="flex w-full justify-between items-center p-3 border-b"
            >
              <div className="w-1/4 text-center">{customer.code}</div>
              <div className="w-1/4 text-center">
                <p>{customer.name}</p>
                <p>{countTransactionByCustomerId(customer.id)} Transaksi</p>
              </div>
              <div className="w-1/4 text-center">
                <Button
                  onPress={() => handleButtonTransactionDetail(customer.id)}
                >
                  Detail Transaksi
                </Button>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default TransactionsPage;
