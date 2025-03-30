import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function ModalForNewTransaction() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [productList, setProductList] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(""); // Menyimpan paket yang dipilih
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);
  const [quantity, setQuantity] = useState(0); // Menyimpan quantity
  const [customerList, setCustomerList] = useState([]);
  const [codeTransaction, setCodeTransaction] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  //fungsi untuk generate kode transaction dengan format TRX001, TRX002, dst
  async function generateCode() {
    try {
      // Fetch semua transaksi untuk menemukan kode tertinggi
      const response = await axios.get("http://localhost:3000/transactions");
      const transactions = response.data;

      let highestNumber = 0;

      // Loop melalui semua transaksi untuk menemukan nomor TRX tertinggi
      transactions.forEach((transaction) => {
        if (transaction.code && transaction.code.startsWith("TRX")) {
          const numberPart = transaction.code.substring(3);
          const number = parseInt(numberPart, 10);
          if (!isNaN(number) && number > highestNumber) {
            highestNumber = number;
          }
        }
      });

      // Generate nomor berikutnya (tertinggi + 1)
      const nextNumber = highestNumber + 1;

      // Format dengan leading zeros (e.g., TRX009)
      const formattedNumber = String(nextNumber).padStart(3, "0");
      const newCode = `TRX${formattedNumber}`;

      setCodeTransaction(newCode);
      console.log("generate code", newCode);
    } catch (error) {
      console.error("Error generating transaction code:", error);
      // Fallback ke nanoid jika API gagal
      const generate = nanoid(6);
      setCodeTransaction("TRX" + generate);
      console.log("generate fallback code", generate);
    }
  }

  const getCustomerList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer");
      setCustomerList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductPrice = (productId) => {
    const productPrice = productList.find((el) => el.id === productId);
    if (!productPrice) {
      console.log(productId, productList);
    }
    return productPrice ? productPrice.price : 0;
  };

  useEffect(() => {
    getProductList();
    getCustomerList();
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateCode();
    }
  }, [isOpen]);

  // Hook untuk menghitung total harga setiap kali selectedPackage atau quantity berubah
  useEffect(() => {
    setPrice(getProductPrice(selectedPackageId));
    console.log("debug:", getProductPrice(selectedPackageId));
  }, [selectedPackageId, quantity]); // Menjalankan setiap kali selectedPackage atau quantity berubah

  const postTransaction = async () => {
    try {
      // Get the next ID (simple numeric ID)
      const transactionsResponse = await axios.get(
        "http://localhost:3000/transactions"
      );
      const transactions = transactionsResponse.data;
      const nextId = String(transactions.length + 1);

      await axios.post("http://localhost:3000/transactions", {
        id: nextId,
        code: codeTransaction,
        product_id: parseInt(selectedPackageId, 10),
        customer_id: parseInt(selectedCustomerId, 10),
        quantity: quantity,
        Tanggal_Transaksi: selectedDate,
      });

      // Reset form after successful submission
      setSelectedPackageId("");
      setSelectedCustomerId(0);
      setQuantity(0);
      setSelectedDate("");

      onOpenChange(false); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="transparant" onPress={onOpen}>
        <h1 className="font-semibold text-s">Transaksi Baru</h1>
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Transaksi Baru
              </ModalHeader>
              <ModalBody>
                {/**Autogenerate untuk memilih Kode transaksi customer */}
                <p>Kode Transaksi</p>
                <Input value={codeTransaction} />

                {/**Dropdown untuk memilih nama customer */}
                <Select
                  label="Pilih Nama"
                  placeholder="Silahkan Pilih Nama"
                  variant="bordered"
                  value={selectedCustomerId}
                  onChange={(e) => {
                    const selectedValue = e.target.value; // Mendapatkan nilai string yang dipilih
                    console.log("debug selectvalue", selectedValue);
                    setSelectedCustomerId(selectedValue); // Menyimpan string yang dipilih
                  }}
                >
                  {customerList.map((el) => {
                    return <SelectItem key={el.id}>{el.name}</SelectItem>;
                  })}
                </Select>
                {/* Dropdown untuk memilih Paket Laundry */}
                <Select
                  label="Paket Laundry"
                  placeholder="Silahkan Pilih Paket"
                  variant="bordered"
                  value={selectedPackageId}
                  onChange={(e) => {
                    const selectedValue = e.target.value; // Mendapatkan nilai string yang dipilih
                    console.log("debug selectvalue", selectedValue);
                    setSelectedPackageId(selectedValue); // Menyimpan string yang dipilih
                  }}
                >
                  {productList.map((el) => {
                    return <SelectItem key={el.id}>{el.name}</SelectItem>;
                  })}
                </Select>
                <Input
                  label="Tanggal"
                  placeholder="Silahkan Masukan Tanggal"
                  variant="bordered"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    const selectedDateValue = e.target.value;
                    setSelectedDate(selectedDateValue);
                  }}
                />
                <Input
                  label="Qty (Kg)"
                  placeholder="Total Berat"
                  variant="bordered"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
                <h2 className="text-center">Total Harga :</h2>
                <p className="text-center">Rp {price * quantity}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={postTransaction}>
                  Add Transaction
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
