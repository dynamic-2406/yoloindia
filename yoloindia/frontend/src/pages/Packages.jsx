import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../components/common/Section';
import PackageCard from '../components/packages/PackageCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useFetch } from '../hooks/useFetch';
import { fetchPackages } from '../services/api';
import { formatPrice } from '../utils/helpers';

const CATEGORIES = ['All','Heritage','Honeymoon','Wildlife','Adventure','Pilgrimage'];
const SORT_OPTIONS = [
  { value:'popularity', label:'Most Popular' },
  { value:'price-asc', label:'Price: Low to High' },
  { value:'price-desc', label:'Price: High to Low' },
  { value:'rating', label:'Highest Rated' },
];
const DEFAULT_MAX_PRICE = 1000;

const PackagesPage = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, DEFAULT_MAX_PRICE]);
  const [maxDays, setMaxDays] = useState(15);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: allPackages, loading } = useFetch(fetchPackages);

  const filtered = useMemo(() => {
    if (!allPackages) return [];
    return allPackages
      .filter(p => category === 'All' || p.category === category)
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => p.days <= maxDays)
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        return b.popularity - a.popularity;
      });
  }, [allPackages, category, sort, priceRange, maxDays]);

  const Sidebar = () => (
    <div className="space-y-7">
      <div>
        <h4 className="font-display font-bold text-gray-900 mb-4">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${category === cat ? 'border-saffron-500 bg-saffron-500' : 'border-gray-300 group-hover:border-saffron-300'}`}>
                {category === cat && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input type="radio" name="category" value={cat} checked={category === cat}
                onChange={() => setCategory(cat)} className="sr-only" />
              <span className={`font-body text-sm ${category === cat ? 'text-saffron-600 font-semibold' : 'text-gray-600'}`}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div>
        <h4 className="font-display font-bold text-gray-900 mb-4">Budget Range</h4>
        <div className="space-y-4">
          <div className="flex justify-between font-body text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <input type="range" min={0} max={DEFAULT_MAX_PRICE} step={10}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full accent-saffron-500" />
          <div className="flex gap-3">
            <input type="number" value={priceRange[0]} placeholder="Min"
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-saffron-200" />
            <input type="number" value={priceRange[1]} placeholder="Max"
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-saffron-200" />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div>
        <h4 className="font-display font-bold text-gray-900 mb-4">Duration (up to {maxDays} days)</h4>
        <input type="range" min={3} max={15} step={1} value={maxDays}
          onChange={e => setMaxDays(+e.target.value)}
          className="w-full accent-saffron-500" />
        <div className="flex justify-between font-body text-xs text-gray-400 mt-1">
          <span>3 days</span><span>15 days</span>
        </div>
      </div>

      <button onClick={() => { setCategory('All'); setSort('popularity'); setPriceRange([0,DEFAULT_MAX_PRICE]); setMaxDays(15); }}
        className="w-full py-2.5 text-sm font-body font-medium text-red-500 hover:bg-red-50 rounded-xl border border-red-100 transition-colors">
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen">
      {/* Banner */}
      <div className="relative h-56 md:h-72 bg-gradient-to-r from-dark via-gray-900 to-saffron-900 flex items-center">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1477587458883-47145ed68e33?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <p className="font-body text-saffron-400 text-sm mb-2 uppercase tracking-widest">Explore</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Tour Packages</h1>
          <p className="font-body text-white/70 mt-2 text-sm">{filtered.length} packages found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <h3 className="font-display font-bold text-gray-900 text-lg mb-6 pb-4 border-b border-gray-100">Filter Packages</h3>
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort + Filter bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="font-body text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> packages
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-body text-sm text-gray-700 shadow-sm"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <div className="relative">
                  <select value={sort} onChange={e => setSort(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-saffron-200 shadow-sm cursor-pointer">
                    {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full font-body text-xs font-semibold transition-all duration-200
                    ${category === cat ? 'bg-saffron-500 text-white shadow-md shadow-saffron-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-saffron-300'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {loading ? <SkeletonGrid count={6} /> : (
              filtered.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(pkg => (
                    <motion.div key={pkg.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }}>
                      <PackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">No packages found</h3>
                  <p className="font-body text-gray-500 text-sm">Try adjusting your filters</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <motion.div initial={{ x:'-100%' }} animate={{ x:0 }} exit={{ x:'-100%' }}
            className="relative w-80 bg-white h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <Sidebar />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
