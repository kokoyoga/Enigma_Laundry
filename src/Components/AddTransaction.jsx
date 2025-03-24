import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import React, { useState } from "react";
import axios from "axios";

function TransactionsPage() {
  // State untuk kontrol transaction
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  // Fungsi untuk membuka transaction
  const openTransaction = () => setIsTransactionOpen(true);

  // Fungsi untuk menutup transaction
  const closeTransaction = () => setIsTransactionOpen(false);

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      {/* Transaction */}
      {isTransactionOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closeTransaction}
        >
          <div
            className="bg-white p-5 rounded-lg w-96 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // mencegah klik luar modal menutupnya
          >
            <h2 className="font-semibold text-center mb-4">Transaksi Baru</h2>
            <form>
              <label htmlFor="transactionCode" className="block mb-2">
                Kode Transaksi
              </label>
              <input
                type="text"
                id="transactionCode"
                value="TR02282401"
                disabled
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />

              <label htmlFor="consumerName" className="block mb-2">
                Nama Konsumen
              </label>
              <select
                id="consumerName"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option>Pilih Konsumen</option>
                {/* Option Konsumen lainnya */}
              </select>

              <label htmlFor="laundryPackage" className="block mb-2">
                Pilih Paket Laundry
              </label>
              <select
                id="laundryPackage"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option>Pilih Paket</option>
                {/* Option Paket Laundry lainnya */}
              </select>

              <label htmlFor="qtyKg" className="block mb-2">
                Qty (Kg)
              </label>
              <input
                type="number"
                id="qtyKg"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />

              <label htmlFor="totalPay" className="block mb-2">
                Total Bayar
              </label>
              <input
                type="text"
                id="totalPay"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                disabled
              />

              <div className="flex justify-end gap-4">
                <Button type="button" onClick={closeModal}>
                  Tutup
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;
