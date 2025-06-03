import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Package2,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
  Bell,
  Settings,
  Calendar,
  MapPin,
  Activity,
  List,
  PackageCheck,
} from "lucide-react";
import LaporanKeuangan from "../LaporanKeuangan/LaporanKeuangan";

const Dashboard = ({ url }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  

  const [notifications, setNotifications] = useState([]);
  const [items, setItems] = useState([]);
  const totalProduk = items.filter(item => item.namaProduk).length;
const totalBahan = items.filter(item => item.namaBarang).length;


  const fetchList = async () => {
    try {
      const [foodResponse, bahanBakuResponse] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/bahanBaku/daftarBahanBaku`),
      ]);

      if (foodResponse.data.success && bahanBakuResponse.data.success) {
        const foodData = foodResponse.data.data;
        const bahanBakuData = bahanBakuResponse.data.data;

        // Gabungkan data jika perlu, atau simpan masing-masing
        const combinedData = [...foodData, ...bahanBakuData];
        const sortedByCreatedAt = [...combinedData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
const lastFiveAdded = sortedByCreatedAt.slice(0, 5); // Ambil 5 terakhir
setRecentlyAdded(lastFiveAdded);

        setItems(combinedData);

        // Filter stok rendah dari kedua data
        const lowStockNotifications = combinedData
          .filter((item) => item.jumlah < 10)
          .map((item) => {
            const isProduk = !!item.namaProduk;
            const isBarang = !!item.namaBarang;

            return {
              id: item._id,
              type: isProduk ? "produk" : isBarang ? "bahan_baku" : "lainnya",
              message: isProduk
                ? `Stok produk "${item.namaProduk}" tersisa ${item.jumlah}. Segera restok!`
                : isBarang
                ? `Stok bahan baku "${item.namaBarang}" tersisa ${item.jumlah}. Segera restok!`
                : `Stok item tidak dikenal tersisa ${item.jumlah}.`,
              time: new Date().toLocaleString("id-ID"),
            };
          });

        setNotifications(lowStockNotifications);
      } else {
        toast.error("Gagal mengambil data makanan atau bahan baku!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengambil data!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const totalValue = items.reduce(
    (sum, item) => sum + item.stock * item.price,
    0
  );
  const lowStockItems = items.filter(
    (item) => item.stock <= item.minStock
  ).length;
  const totalItems = items.reduce((sum, item) => sum + item.stock, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Package2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Inventory Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Dashboard manajemen inventori terpadu
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </div>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-2xl border border-white/20">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Produk",
                  value: totalProduk.toLocaleString(),
                  icon: Package2,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Total Bahan",
                  value: totalBahan.toLocaleString(),
                  icon: ShoppingCart,
                  color: "from-blue-500 to-blue-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

           {/* Recent Activity */}
{/* Recent Activity */}
<div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Aktivitas Terkini
  </h3>
  <div className="space-y-4">
    {recentlyAdded.map((item, index) => (
      <div
        key={index}
        className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors"
      >
        <div className="p-2 rounded-lg bg-green-100 text-green-600">
          <Plus className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-900">
            {item.namaProduk
              ? `${item.namaProduk} ditambahkan sebagai Produk`
              : `${item.namaBarang} ditambahkan sebagai Bahan`}
          </h2>
          <p className="text-sm text-gray-500">
            {/* Opsional: tambahkan item.tanggal jika tersedia */}
            {/* Misal: `Ditambahkan pada ${new Date(item.createdAt).toLocaleString()}` */}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


          </div>
        )}

        {activeTab === "analytics" && <LaporanKeuangan url={url} />}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notifikasi & Peringatan
              </h3>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-2xl border-l-4 ${
                      notification.type === "critical"
                        ? "bg-red-50 border-red-500"
                        : notification.type === "warning"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.type === "critical"
                              ? "bg-red-100 text-red-600"
                              : notification.type === "warning"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          <AlertTriangle className="w-5 h-5" />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {notification.message}
                          </p>
                          <p className="text-sm text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
