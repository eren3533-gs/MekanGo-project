import React, { useState } from 'react'
import { Menu, X, Search, MapPin, Star, Phone, Globe, Facebook, Instagram, Twitter } from 'lucide-react'
import './App.css'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const businesses = [
    {
      id: 1,
      name: 'Kahve Dükkanı',
      category: 'Kahveler',
      rating: 4.8,
      reviews: 245,
      location: 'Beyoğlu, İstanbul',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
      phone: '+90 212 123 4567',
      website: 'www.kahvedukkan.com'
    },
    {
      id: 2,
      name: 'Pizza Evi',
      category: 'Pizzeria',
      rating: 4.6,
      reviews: 189,
      location: 'Kadıköy, İstanbul',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
      phone: '+90 216 234 5678',
      website: 'www.pizzaevi.com'
    },
    {
      id: 3,
      name: 'Doğal Güzellik Salonu',
      category: 'Güzellik',
      rating: 4.9,
      reviews: 312,
      location: 'Nişantaşı, İstanbul',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      phone: '+90 212 345 6789',
      website: 'www.dogalguzellık.com'
    },
    {
      id: 4,
      name: 'Fitness Plus',
      category: 'Spor',
      rating: 4.7,
      reviews: 156,
      location: 'Şişli, İstanbul',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      phone: '+90 212 456 7890',
      website: 'www.fitnessplus.com'
    },
    {
      id: 5,
      name: 'Tekne Turizm',
      category: 'Turizm',
      rating: 4.9,
      reviews: 428,
      location: 'Eminönü, İstanbul',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop',
      phone: '+90 212 567 8901',
      website: 'www.tekneturizm.com'
    },
    {
      id: 6,
      name: 'Gurme Restoran',
      category: 'Resepsiyon',
      rating: 4.8,
      reviews: 267,
      location: 'Beşiktaş, İstanbul',
      image: 'https://images.unsplash.com/photo-1504674900967-77b2d8f85d38?w=400&h=300&fit=crop',
      phone: '+90 212 678 9012',
      website: 'www.gurmerestoran.com'
    }
  ]

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">MekanGo</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-slate-300 hover:text-white transition">İşletmeler</a>
              <a href="#" className="text-slate-300 hover:text-white transition">Kategoriler</a>
              <a href="#" className="text-slate-300 hover:text-white transition">Hakkımız</a>
              <a href="#" className="text-slate-300 hover:text-white transition">İletişim</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-slate-300 hover:text-white transition">Giriş Yap</button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold">
                Kayıt Ol
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Şehrin En İyi <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">İşletmelerini Keşfet</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">Restoranlar, kafe, salons ve daha fazlasını bul. Yorum oku, oylama yap ve rezervasyon yap.</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="İşletme adı veya kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Popüler İşletmeler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-slate-700"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-blue-300">{business.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{business.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(business.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-white">{business.rating}</span>
                    <span className="text-sm text-slate-400">({business.reviews} yorum)</span>
                  </div>

                  <div className="space-y-3 mb-6 border-t border-slate-700 pt-4">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Phone size={16} className="text-blue-400 flex-shrink-0" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Globe size={16} className="text-blue-400 flex-shrink-0" />
                      <span className="text-blue-400 hover:underline">{business.website}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold text-sm">
                      Detaylar
                    </button>
                    <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
                      ❤️
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-pink-400 transition">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-blue-300 transition">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Aradığınız işletme bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">MekanGo</h4>
              <p className="text-slate-400 text-sm">Şehirindeki en iyi işletmeleri keşfet, yorum oku ve rezervasyon yap.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">İşletmeler</a></li>
                <li><a href="#" className="hover:text-white transition">Kategoriler</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-white transition">Kullanım Şartları</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">İletişim</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Email: info@mekango.com</li>
                <li>Tel: +90 212 000 0000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2026 MekanGo. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
