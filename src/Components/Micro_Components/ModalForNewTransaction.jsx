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
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalForNewTransaction() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State untuk harga produk, paket yang dipilih, qty, dan total harga
  const [priceList, setPriceList] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(""); // Menyimpan paket yang dipilih
  const [quantity, setQuantity] = useState(0); // Menyimpan quantity
  const [totalPrice, setTotalPrice] = useState(0); // Menyimpan total harga

  // Fungsi untuk mendapatkan daftar produk
  const getProductList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setPriceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk mendapatkan harga produk berdasarkan nama
  const getProductPrice = (productName) => {
    const productPrice = priceList.find(
      (el) => el.name.toLowerCase() === productName.toLowerCase() // Pencocokan dengan .includes() agar lebih fleksibel
    );
    console.log("Found product:", productPrice); // Debugging output to check what we found
    return productPrice ? productPrice.price : 0; // Return 0 jika tidak ada harga
  };

  // Fungsi untuk menghitung total harga berdasarkan paket dan quantity
  const calculateTotalPrice = () => {
    if (selectedPackage && quantity > 0) {
      const price = getProductPrice(selectedPackage); // Dapatkan harga berdasarkan paket
      console.log("Selected Price:", price); // Debugging to check price before calculation
      if (price > 0) {
        setTotalPrice(price * quantity); // Menghitung total harga
      } else {
        setTotalPrice(0); // Jika harga tidak ditemukan, set total harga ke 0
      }
    }
  };

  // Hook untuk mengambil data produk ketika komponen dimuat
  useEffect(() => {
    getProductList();
  }, []);

  // Hook untuk menghitung total harga setiap kali selectedPackage atau quantity berubah
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedPackage, quantity]); // Menjalankan setiap kali selectedPackage atau quantity berubah

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Transaksi Baru
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
                  value={selectedPackage}
                  onChange={(e) => {
                    setSelectedPackage(e.target.value); // Pastikan value yang dipilih adalah string
                  }}
                >
                  <SelectItem value="promo akhir bulan">
                    Promo Akhir Bulan
                  </SelectItem>
                  <SelectItem value="ekonomis">Ekonomis</SelectItem>
                  <SelectItem value="hemat">Hemat</SelectItem>
                  <SelectItem value="mewah">Mewah</SelectItem>
                  <SelectItem value="super mewah">Super Mewah</SelectItem>
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
                  onChange={(e) => setQuantity(e.target.value)} // Update quantity
                />
                <h2 className="text-center">Total Harga :</h2>
                <p className="text-center">Rp {totalPrice}</p>{" "}
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
