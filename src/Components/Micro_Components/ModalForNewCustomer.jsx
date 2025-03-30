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
import axios from "axios";
import { use, useEffect, useState } from "react";
import { nanoid } from "nanoid";

function ModalForNewCustomer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newCustomer, setNewCustomer] = useState("");
  const [generateCode, setGenerateCode] = useState("");
  const [productList, setProductList] = useState([]);

  const getlistofproduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customer");
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // generate code for new customer 'LDR001', ....
  //fungsi untuk generate kode transaction dengan format TRX001, TRX002, dst
  async function generateCodeCustomer() {
    try {
      // Fetch semua transaksi untuk menemukan kode tertinggi
      const response = await axios.get("http://localhost:3000/customer");
      const customer = response.data;

      let highestNumber = 0;

      // Loop melalui semua transaksi untuk menemukan nomor TRX tertinggi
      transactions.forEach((customer) => {
        if (customer.code && customer.code.startsWith("LDR")) {
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
      const newCode = `LDR${formattedNumber}`;

      setGenerateCode(newCode);
      console.log("generate code", newCode);
    } catch (error) {
      console.error("Error generating transaction code:", error);
      // Fallback ke nanoid jika API gagal
      const generate = nanoid(6);
      setGenerateCode("LDR" + generate);
      console.log("generate fallback code", generate);
    }
  }

  const addCustomerHandleButton = async () => {
    const response = await axios.get("http://localhost:3000/customer");
    const getId = response.data;
    const nextId = String(getId.length + 1);

    await axios.post("http://localhost:3000/customer", {
      id: nextId,
      name: newCustomer,
      code: generateCode,
    });
    setNewCustomer("");
    setGenerateCode("");
    onOpenChange(false);
  };

  useEffect(() => {
    getlistofproduct();
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateCodeCustomer();
    }
  }, [isOpen]);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Customer
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Customer
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter your Name"
                  variant="bordered"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                />
                <h1>Your Transaction Code</h1>
                <p>{generateCode}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={addCustomerHandleButton}>
                  Add New Customer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForNewCustomer;
