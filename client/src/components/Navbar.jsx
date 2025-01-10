import React, { useState } from 'react';
import { Menu, X, Home, AlertTriangle, PieChart, User, Trash2, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      name: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard'
    },
    {
      name: 'Report Bin',
      icon: <AlertTriangle className="w-5 h-5" />,
      path: 'http://localhost:5177/'
    },
    {
      name: 'Events',
      icon: <PieChart className="w-5 h-5" />,
      path: '/events'
    },
    {
      name: 'Segregate',
      icon: <Trash2 className="w-5 h-5" />,
      dropdownItems: [
        { name: 'Organic Waste', path: '/segregate/organic' },
        { name: 'Recyclable', path: '/segregate/recyclable' },
        { name: 'Hazardous', path: '/segregate/hazardous' }
      ]
    },
      
  ];

  return (
    <nav className="bg-transparent shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-green-600">WasteWise</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdownItems ? (
                  // Dropdown Menu
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 space-x-1">
                      {item.icon}
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular Menu Item
                  <a
                    href={item.path}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 space-x-1"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdownItems ? (
                  // Mobile Dropdown
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="w-full flex items-center px-3 py-2 text-gray-700 hover:text-green-600 space-x-1"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 ml-auto transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-6 py-2 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Mobile Regular Item
                  <a
                    href={item.path}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 space-x-1"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;