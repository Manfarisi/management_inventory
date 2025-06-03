import React from 'react'
import { ToastContainer } from "react-toastify";
import {Routes,Route} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import EditBahanBaku from './pages/BahanBakuEdit/EditBahanBaku';
import DaftarBaku from './pages/BahanDaftar/DaftarBaku';
import EditBahanKeluar from './pages/BahanKeluarEdit/EditBahanKeluar';
import Dashboard from './pages/Dashboard/Dashboard';
import KeluarBarang from './pages/Keluar/KeluarBarang';
import DaftarKeluar from './pages/KeluarDaftar/DaftarKeluar';
import BarangMasuk from './pages/Masuk/BarangMasuk';
import Pemasukan from './pages/Pemasukan/Pemasukan';
import DaftarPemasukan from './pages/PemasukanDaftar/DaftarPemasukan';
import EditPemasukan from './pages/PemasukanEdit/EditPemasukan';
import Pengeluaran from './pages/Pengeluaran/Pengeluaran';
import DaftarPengeluaran from './pages/PengeluaranDaftar/DaftarPengeluaran';
import EditPengeluaran from './pages/PengeluaranEdit/EditPengeluaran';
import List from './pages/ProdukDaftar/List';
import Edit from './pages/ProdukEdit/EditFood';
import Add from './pages/TambahProduk/Add';
import LaporanKeuangan from './pages/LaporanKeuangan/LaporanKeuangan';
import DaftarProdukKeluar from './pages/ProdukKeluarDaftar/ProdukKeluarDaftar';
import ProdukKeluar from './pages/TambahProdukKeluar/TambahProdukKeluar';
import EditProdukKeluar from './pages/ProdukKeluarEdit/EditProdukKeluar';
import Layout from './Layout';

const App = () => {

  const url ="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="flex min-h-screen">
        <Sidebar/>
        <div className="flex-1 bg-gray-100">

        <Routes>
          <Route path="/" element={<Dashboard url={url}/>}/>
          <Route path="/laporanKeuangan" element={<LaporanKeuangan url={url}/>}/>


          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path="/list/edit/:id" element={<Edit url={url}/>} />


          <Route path="/daftarProdukKeluar" element={<DaftarProdukKeluar url={url}/>} />
          <Route path="/produk-keluar/tambah" element={<ProdukKeluar url={url}/>} />
          <Route path="/bahanKeluar/edit/:id" element={<EditProdukKeluar url={url} />} />


          <Route path='/pemasukan' element={<Pemasukan url={url}/>}/>
          <Route path='/daftarPemasukan' element={<DaftarPemasukan url={url}/>}/>
          <Route path='/daftarPemasukan/edit/:id' element={<EditPemasukan url={url}/>}/>
          
          <Route path='/pengeluaran' element={<Pengeluaran url={url}/>}/>
          <Route path='/daftarPengeluaran' element={<DaftarPengeluaran url={url}/>}/>
          <Route path='/daftarPengeluaran/edit/:id' element={<EditPengeluaran url={url}/>}/>
          
          <Route path='/keluar' element={<KeluarBarang url={url}/>}/>
          <Route path='/daftarKeluar' element={<DaftarKeluar url={url}/>}/>
          <Route path='/daftarKeluar/edit/:id' element={<EditBahanKeluar url={url}/>}/>

          <Route path='/masuk' element={<BarangMasuk url={url}/>}/>
          <Route path='/daftarBaku' element={<DaftarBaku url={url}/>}/>
          <Route path='/daftarBaku/edit/:id' element={<EditBahanBaku url={url}/>}/>

        </Routes>
        </div>
      </div>
    </div>
  )
}

export default App