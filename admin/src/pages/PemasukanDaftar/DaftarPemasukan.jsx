import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt, FaInbox, FaSearch } from "react-icons/fa";

const DaftarPemasukan = ({ url }) => {
  const [pemasukan, setPemasukan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jenisFilter, setJenisFilter] = useState("");

  const navigate = useNavigate();

  const fetchPemasukan = async () => {
    try {
      const response = await axios.get(`${url}/api/pemasukan/daftarPemasukan`);
      if (response.data.success) {
        setPemasukan(response.data.data);
        setFiltered(response.data.data);
      } else {
        toast.error("Gagal mengambil data pemasukan!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengambil data!");
    }
  };

  const hapusPemasukan = async (id) => {
    try {
      const response = await axios.post(`${url}/api/pemasukan/hapusPemasukan`, { id });
      if (response.data.success) {
        toast.success("Data berhasil dihapus!");
        fetchPemasukan();
      } else {
        toast.error("Gagal menghapus data!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus data!");
    }
  };

  const formatTanggal = (isoDate) => {
    const tanggal = new Date(isoDate);
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const editPemasukan = (id) => {
    navigate(`/daftarPemasukan/edit/${id}`);
  };

  const filterData = () => {
    let data = [...pemasukan];

    if (search.trim()) {
      data = data.filter((item) =>
        item.namaPemasukan.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (startDate) {
      data = data.filter((item) => new Date(item.tanggal) >= new Date(startDate));
    }

    if (endDate) {
      data = data.filter((item) => new Date(item.tanggal) <= new Date(endDate));
    }

    if (jenisFilter) {
      data = data.filter((item) => item.jenisPemasukan === jenisFilter);
    }

    setFiltered(data);
  };

  useEffect(() => {
    fetchPemasukan();
  }, []);

  useEffect(() => {
    filterData();
  }, [search, startDate, endDate, jenisFilter, pemasukan]);

  const jenisOptions = [...new Set(pemasukan.map((item) => item.jenisPemasukan))];

  const totalPemasukan = filtered.reduce((acc, item) => acc + item.jumlah, 0);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-green-200">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              💰 Daftar Pemasukan
            </h1>
            <p className="text-gray-600">Manajemen pemasukan harian</p>
          </div>
          <button
            onClick={() => navigate("/pemasukan")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md"
          >
            <FaPlus /> Tambah Pemasukan
          </button>
        </div>

        {/* Filter & Search */}
        <div className="bg-green-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Cari nama pemasukan..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
            title="Tanggal Mulai"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
            title="Tanggal Akhir"
          />
          <select
            value={jenisFilter}
            onChange={(e) => setJenisFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Semua Jenis</option>
            {jenisOptions.map((jenis, index) => (
              <option key={index} value={jenis}>
                {jenis}
              </option>
            ))}
          </select>
        </div>

        {/* Total Pemasukan */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg mb-6">
          <p className="text-sm text-green-700 font-medium">Total Pemasukan</p>
          <h2 className="text-xl font-bold text-green-600">
            Rp {totalPemasukan.toLocaleString("id-ID")}
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-green-100 text-green-800">
                {["Nama Pemasukan", "Jumlah", "Jenis", "Tanggal", "Keterangan", "Aksi"].map(
                  (title) => (
                    <th key={title} className="px-5 py-3 font-semibold text-center text-base">
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item._id} className="border-b border-green-200 hover:bg-green-50">
                    <td className="px-5 py-3 font-medium text-center">{item.namaPemasukan}</td>
                    <td className="px-5 py-3 text-center">
                      Rp {item.jumlah.toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {item.jenisPemasukan}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">{formatTanggal(item.tanggal)}</td>
                    <td className="px-5 py-3 max-w-xs truncate text-gray-600 text-center">
                      {item.keterangan}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => editPemasukan(item._id)}
                          className="p-2 rounded-full bg-green-400 hover:bg-green-500 text-white shadow-md"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => hapusPemasukan(item._id)}
                          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="flex flex-col items-center text-gray-500 text-lg">
                      <FaInbox size={48} className="mb-3" />
                      <h3 className="text-xl font-semibold">Tidak ada data ditemukan</h3>
                      <p className="mb-4">Ubah filter atau tambahkan pemasukan baru.</p>
                      <button
                        onClick={() => navigate("/pemasukan")}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow"
                      >
                        <FaPlus /> Tambah Pemasukan
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarPemasukan;
