import mongoose from "mongoose";

const pemasukanSchema = new mongoose.Schema({
  namaPemasukan: { type: String, required: true },
  keterangan: { type: String, required: true },
  jumlah: { type: Number, required: true },
  jenisPemasukan: {
    type: String,
    required: true,
    enum: ['Penjualan', 'Piutang', 'Investasi','Pendanaan', 'Lainya'], // bisa kamu ubah sesuai kasus
  },
  tanggal: {type: Date, required: true },
});

const pemasukanModel =
  mongoose.models.pemasukan || mongoose.model("pemasukan", pemasukanSchema);
export default pemasukanModel;
