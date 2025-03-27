import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Card, CardBody, Button, Link, Chip } from "@heroui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function TransactionDetailPage() {
  const { customerId } = useParams(); // Get the customerId from the URL
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const getCustomerDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/customer/${customerId}`
      );
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactionsForCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?customer_id=${customerId}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductsList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // mengambil nama paket dari data produk
  const getProductName = (productId) => {
    const product = productsList.find((el) => el.id == productId);
    return product ? product.name : "";
  };

  // mengambil harga paket dari data produk
  const getProductPrice = (productId) => {
    const product = productsList.find((el) => el.id == productId);
    return product ? product.price : Number;
  };

  useEffect(() => {
    getCustomerDetail();
    getProductsList();
    getTransactionsForCustomer();
  }, [customerId]);

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <Navbar />
      <Card className="w-full max-w-4xl mt-5">
        <CardBody className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-center">
            Detail Transaksi untuk {customer?.name}
          </h2>
          <div className="flex w-full justify-between items-center p-3 bg-gray-200 rounded-lg mb-3">
            <div className="font-medium w-1/4 text-center">Kode Transaksi</div>
            <div className="font-medium w-1/4 text-center">
              Tanggal Transaksi
            </div>
            <div className="font-medium w-1/4 text-center">Paket Laundry</div>
            <div className="font-medium w-1/4 text-center">Qty</div>
            <div className="font-medium w-1/4 text-center">Total Bayar</div>
          </div>

          {transactions.map((transactions) => (
            <div
              key={transactions.id}
              className="flex w-full justify-between items-center p-3 border-b"
            >
              <div className="w-1/4 text-center">{transactions.code}</div>
              <div className="w-1/4 text-center">
                {transactions.Tanggal_Transaksi}
              </div>{" "}
              <div className="w-1/4 text-center">
                {getProductName(transactions.product_id)}
              </div>
              <div className="w-1/4 text-center">
                {transactions.quantity} Kg
              </div>
              <div className="w-1/4 text-center">
                {transactions.quantity *
                  getProductPrice(transactions.product_id)}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
      <div className="">
        <Link href="/customerPage">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
