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
import { Card, CardBody } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function ModalForNewTransaction() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State untuk harga produk, paket yang dipilih, qty, dan total harga
  const [productList, setProductList] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(""); // Menyimpan paket yang dipilih
  const [quantity, setQuantity] = useState(0); // Menyimpan quantity
  const [totalPrice, setTotalPrice] = useState(0); // Menyimpan total harga
  const [price, setPrice] = useState(0);

  const getProductList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk mendapatkan harga produk berdasarkan nama
  const getProductPrice = (productId) => {
    const productPrice = productList.find((el) => el.id === productId);
    if (!productPrice) {
      console.log(productId, productList);
    }
    return productPrice ? productPrice.price : 0; // Return 0 jika tidak ada harga
  };

  // Hook untuk mengambil data produk ketika komponen dimuat
  useEffect(() => {
    getProductList();
  }, []);

  // Hook untuk menghitung total harga setiap kali selectedPackage atau quantity berubah
  useEffect(() => {
    setPrice(getProductPrice(selectedPackageId));
    console.log("debug:", getProductPrice(selectedPackageId));
  }, [selectedPackageId, quantity]); // Menjalankan setiap kali selectedPackage atau quantity berubah

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
                <Input
                  label="Nama"
                  placeholder="Masukan Nama"
                  variant="bordered"
                  type="string"
                />
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
                />
                <Input
                  label="Qty (Kg)"
                  placeholder="Total Berat"
                  variant="bordered"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))} // Update quantity
                />
                <h2 className="text-center">Total Harga :</h2>
                <p className="text-center">Rp {price * quantity}</p>
                {/* Menampilkan total harga */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
