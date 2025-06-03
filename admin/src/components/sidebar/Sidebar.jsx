// This would be in a file like src/components/Sidebar.jsx
import React, { useState } from 'react';
// Assuming you have your Lucide icons set up or similar
import { LayoutDashboard, Package, ShoppingBasket, BarChart3, Users, Settings, LogOut, ChevronDown, PackageMinus } from 'lucide-react';

// Define your navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Produk",
    href: "/produk",
    icon: Package,
    submenu: [
      { title: "Daftar Produk", href: "/list" },
      { title: "Daftar Bahan", href: "/daftarBaku" },
    ],
  },
  {
    title: "Transaksi",
    href: "/transaksi",
    icon: ShoppingBasket,
    submenu: [
      { title: "Pemasukan", href: "/daftarPemasukan" },
      { title: "Pengeluaran", href: "/daftarPengeluaran" },
    ],
  },

   {
    title: "Keluar",
    href: "/keluar",
    icon: PackageMinus,
    submenu: [
      { title: "Daftar Produk Keluar", href: "/daftarProdukKeluar" },
      { title: "Daftar Bahan Baku Keluar", href: "/daftarKeluar" },
    ],
  },
];

const Sidebar = ({ activePath = "/" }) => { // activePath would be passed from a router (e.g., react-router-dom)
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (href) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const isActiveLink = (href) => activePath === href;
  const isActiveSubmenuParent = (href) => activePath.startsWith(href) || openSubmenus[href];


  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64 shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-gray-700">
        <a href="/" className="flex items-center gap-2 font-semibold text-xl">
          <ShoppingBasket className="h-6 w-6 text-orange-400" />
          <span>Labodine</span>
        </a>
        {/* You could add a collapse/expand trigger here if needed */}
      </div>

      {/* Sidebar Content (Menu) */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <React.Fragment key={item.href}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.href)}
                    className={`flex items-center w-full p-2 rounded-md transition-colors duration-200
                      ${isActiveSubmenuParent(item.href) ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${openSubmenus[item.href] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSubmenus[item.href] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.href}
                          href={subItem.href} // Use <Link> from Next.js or react-router-dom if applicable
                          className={`flex items-center p-2 rounded-md text-sm transition-colors duration-200
                            ${isActiveLink(subItem.href) ? 'bg-gray-600 text-white' : 'hover:bg-gray-600 text-gray-400'}`}
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href} // Use <Link> from Next.js or react-router-dom if applicable
                  className={`flex items-center p-2 rounded-md transition-colors duration-200
                    ${isActiveLink(item.href) ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;