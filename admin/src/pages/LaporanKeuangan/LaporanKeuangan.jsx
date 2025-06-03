import React, { useEffect, useState } from "react";
import {
  FaWallet,
  FaShoppingCart,
  FaChartPie,
  FaExchangeAlt,
  FaBalanceScale,
  FaFileAlt,
} from "react-icons/fa";

function LaporanKeuangan({ url }) {
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [activeTab, setActiveTab] = useState("cashFlow");

  const totalPemasukan = pemasukan.reduce((acc, item) => acc + item.jumlah, 0);
  const totalPengeluaran = pengeluaran.reduce((acc, item) => acc + item.jumlah, 0);
  const labaBersih = totalPemasukan - totalPengeluaran;

  useEffect(() => {
    const fetchDataGabungan = async () => {
      try {
        const [resPemasukan, resPengeluaran, resProdukKeluar] = await Promise.all([
          fetch(`${url}/api/pemasukan/daftarPemasukan`),
          fetch(`${url}/api/pengeluaran/daftarPengeluaran`),
          fetch(`${url}/api/bahanKeluar/daftarProdukKeluar`)
        ]);

        const dataPemasukan = await resPemasukan.json();
        const dataPengeluaran = await resPengeluaran.json();
        const dataProdukKeluar = await resProdukKeluar.json();

        const pemasukanManual = dataPemasukan.success ? dataPemasukan.data : [];
        const pengeluaranData = dataPengeluaran.success ? dataPengeluaran.data : [];

        let pemasukanPenjualan = [];

        if (dataProdukKeluar.success) {
          pemasukanPenjualan = dataProdukKeluar.data
            .filter(item => item.jenisPengeluaran === "Penjualan")
            .map(item => ({
              _id: item._id,
              namaPemasukan: item.namaProduk,
              jumlah: item.harga * item.jumlah,
              jenisPemasukan: item.jenisPengeluaran,
              tanggal: item.tanggal,
              keterangan: item.keterangan,
            }));
        }

        setPemasukan([...pemasukanManual, ...pemasukanPenjualan]);
        setPengeluaran(pengeluaranData);
      } catch (err) {
        console.error("Gagal fetch data gabungan", err);
      }
    };

    fetchDataGabungan();
  }, [url]);

  // Gabungkan & urutkan transaksi berdasarkan tanggal menurun
  const semuaTransaksi = [
    ...pemasukan.map(item => ({ ...item, tipe: "pemasukan" })),
    ...pengeluaran.map(item => ({ ...item, tipe: "pengeluaran" })),
  ].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg p-4 rounded-lg border-l-4 border-green-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Pemasukan</p>
              <h2 className="text-xl font-bold text-green-500">
                Rp {totalPemasukan.toLocaleString("id-ID")}
              </h2>
            </div>
            <FaWallet className="text-green-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg border-l-4 border-red-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Pengeluaran</p>
              <h2 className="text-xl font-bold text-red-500">
                Rp {totalPengeluaran.toLocaleString("id-ID")}
              </h2>
            </div>
            <FaShoppingCart className="text-red-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg border-l-4 border-blue-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Akhir</p>
              <h2 className="text-xl font-bold text-blue-500">
                Rp {labaBersih.toLocaleString("id-ID")}
              </h2>
            </div>
            <FaChartPie className="text-blue-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex space-x-4 mb-4">
          <button
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "cashFlow"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("cashFlow")}
          >
            <FaExchangeAlt className="mr-2" /> Arus Kas
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "balanceSheet"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("balanceSheet")}
          >
            <FaBalanceScale className="mr-2" /> Neraca Keuangan
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded ${
              activeTab === "summary"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            <FaFileAlt className="mr-2" /> Ringkasan
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow p-4 rounded-lg">
          {activeTab === "cashFlow" && (
            <div>
              <h3 className="text-lg font-bold mb-4">
                Laporan Arus Kas - Juni 2023
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">Nama</th>
                      <th className="px-4 py-2 border">Jumlah</th>
                      <th className="px-4 py-2 border">Jenis</th>
                      <th className="px-4 py-2 border">Tanggal</th>
                      <th className="px-4 py-2 border">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semuaTransaksi.map((item) => (
                      <tr
                        key={item._id}
                        className={`transition-all ${
                          item.tipe === "pemasukan"
                            ? "bg-green-50 hover:bg-green-200"
                            : "bg-red-50 hover:bg-red-200"
                        }`}
                      >
                        <td className="px-4 py-2 border">
                          {item.namaPemasukan || item.namaPengeluaran}
                        </td>
                        <td className="px-4 py-2 border">
                          Rp {item.jumlah.toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.jenisPemasukan || item.jenisPengeluaran}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(item.tanggal).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-4 py-2 border">{item.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "balanceSheet" && (
            <div>
              <h3 className="text-lg font-bold mb-4">
                Neraca Keuangan - 30 Juni 2023
              </h3>
              <p className="text-gray-600">Detail neraca akan ditampilkan di sini.</p>
            </div>
          )}

          {activeTab === "summary" && (
            <div>
              <h3 className="text-lg font-bold mb-4">
                Ringkasan Keuangan - Semester 1 2023
              </h3>
              <p className="text-gray-600">Ringkasan akan ditampilkan di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaporanKeuangan;
