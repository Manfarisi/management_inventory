import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsCalendar2CheckFill } from "react-icons/bs";
import {
  FaBalanceScale,
  FaBox,
  FaCommentDots,
  FaHashtag,
  FaPlus,
  FaTags,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const KeluarBarang = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({
    namaBarang: "",
    jumlah: "",
    satuan: "",
    jenisPengeluaran: "",
    keterangan: "",
    tanggal: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setData((prev) => ({ ...prev, tanggal: today }));
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/bahanBaku/daftarBahanBaku`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Gagal mengambil data!");
      }
    } catch {
      toast.error("Terjadi kesalahan saat mengambil data!");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "namaBarang") {
      const selected = list.find((item) => item.namaBarang === value);
      setData((prev) => ({
        ...prev,
        namaBarang: value,
        satuan: selected ? selected.satuan : "",
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/bahanBaku/kurangiBahanBaku`, data);
      if (res.data.success) {
        toast.success("Barang keluar berhasil ditambahkan!");
        setData({
          namaBarang: "",
          jumlah: "",
          satuan: "",
          jenisPengeluaran: "",
          keterangan: "",
          tanggal: new Date().toISOString().split("T")[0],
        });
        setTimeout(() => navigate("/daftarKeluar"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Terjadi kesalahan saat mengirim data!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <i className="fas fa-sign-out-alt"></i> Tambah Barang Keluar
      </h2>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Barang */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              <FaBox className="inline mr-2 text-blue-500" />
              Nama Barang
            </label>
            <select
              name="namaBarang"
              value={data.namaBarang}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">-- Pilih Barang --</option>
              {list.map((item, i) => (
                <option key={i} value={item.namaBarang}>
                  {item.namaBarang}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              <FaHashtag className="inline mr-2 text-indigo-500" />
              Jumlah
            </label>
            <input
              type="number"
              name="jumlah"
              value={data.jumlah}
              onChange={onChangeHandler}
              placeholder="Masukkan jumlah"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Satuan */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              <FaBalanceScale className="inline mr-2 text-green-500" />
              Satuan
            </label>
            <input
              type="text"
              value={data.satuan || "--"}
              disabled
              className="w-full px-4 py-2 border bg-gray-100 rounded-md"
            />
          </div>

          {/* Jenis Pengeluaran */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              <FaTags className="inline mr-2 text-purple-500" />
              Jenis Pengeluaran
            </label>
            <select
              name="jenisPengeluaran"
              value={data.jenisPengeluaran}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="">-- Pilih Jenis --</option>
              <option value="Produksi">Produksi</option>
              <option value="Rusak">Rusak</option>
              <option value="Lainya">Lainya</option>
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              <BsCalendar2CheckFill className="inline mr-2 text-pink-500" />
              Tanggal
            </label>
            <input
              type="date"
              name="tanggal"
              value={data.tanggal}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-300"
            />
          </div>

          {/* Keterangan */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1 text-gray-700">
              <FaCommentDots className="inline mr-2 text-gray-500" />
              Keterangan
            </label>
            <textarea
              name="keterangan"
              rows="3"
              value={data.keterangan}
              onChange={onChangeHandler}
              placeholder="Tulis keterangan tambahan..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            ></textarea>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          >
            <FaPlus /> Tambah Barang Keluar
          </button>
        </div>
      </form>
    </div>
  );
};

export default KeluarBarang;
