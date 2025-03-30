import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  Card,
  CardBody,
  Button,
  Link,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function TransactionDetailPage() {
  const { customerId } = useParams(); // Get the customerId from the URL
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const deleteTransactionButton = async () => {
    if (!selectedTransaction) return;

    setIsDeleting(true);
    try {
      // Delete the transaction by its ID
      await axios.delete(
        `http://localhost:3000/transactions/${selectedTransaction.id}`
      );

      // Update the transactions list after deletion
      setTransactions(
        transactions.filter((t) => t.id !== selectedTransaction.id)
      );

      // Close the confirmation modal
      onClose();

      // Show success notification (if you have a notification system)
      console.log(`Transaction ${selectedTransaction.code} has been deleted`);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      // Show error notification (if you have a notification system)
    } finally {
      setIsDeleting(false);
      setSelectedTransaction(null);
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
    return product ? product.price : 0;
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
          <h2 className="font-semibold text-center text-xl mb-4">
            Detail Transaksi untuk {customer?.name}
          </h2>
          <div className="flex w-full justify-between items-center p-3 bg-gray-200 rounded-lg mb-3">
            <div className="font-medium w-1/6 text-center">Kode</div>
            <div className="font-medium w-1/6 text-center">Tanggal</div>
            <div className="font-medium w-1/6 text-center">Paket</div>
            <div className="font-medium w-1/6 text-center">Qty</div>
            <div className="font-medium w-1/6 text-center">Total</div>
            <div className="font-medium w-1/6 text-center">Aksi</div>
          </div>

          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex w-full justify-between items-center p-3 border-b hover:bg-gray-50"
              >
                <div className="w-1/6 text-center">{transaction.code}</div>
                <div className="w-1/6 text-center">
                  {transaction.Tanggal_Transaksi}
                </div>
                <div className="w-1/6 text-center">
                  {getProductName(transaction.product_id)}
                </div>
                <div className="w-1/6 text-center">
                  {transaction.quantity} Kg
                </div>
                <div className="w-1/6 text-center">
                  Rp{" "}
                  {(
                    transaction.quantity *
                    getProductPrice(transaction.product_id)
                  ).toLocaleString()}
                </div>
                <div className="w-1/6 text-center">
                  <Button
                    color="danger"
                    size="sm"
                    onPress={() => confirmDelete(transaction)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Tidak ada transaksi untuk pelanggan ini
            </div>
          )}
        </CardBody>
      </Card>
      <div className="mt-4">
        <Link href="/customerPage">
          <Button color="primary">Kembali</Button>
        </Link>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konfirmasi Hapus
              </ModalHeader>
              <ModalBody>
                <p>
                  Apakah Anda yakin ingin menghapus transaksi{" "}
                  <strong>{selectedTransaction?.code}</strong>?
                </p>
                <p className="text-sm text-red-500 mt-2">
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disabled={isDeleting}
                >
                  Batal
                </Button>
                <Button
                  color="danger"
                  onPress={deleteTransactionButton}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1>Please Reload After Add New Customer and Transaction</h1>
    </div>
  );
}

export default TransactionDetailPage;
