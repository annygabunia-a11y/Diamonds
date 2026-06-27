import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: "prod-1",
    diamonds: 2195,
    price: 70,
    title: "2195 ალმასი",
    subtitle: "Basic Pack",
    iconColor: "text-pink-500",
    dropShadow: "drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    redirectUrl: "https://tiny.keepz.me/bdh28bz2"
  },
  {
    id: "prod-2",
    diamonds: 3688,
    price: 120,
    title: "3688 ალმასი",
    subtitle: "Pro Bundle",
    iconColor: "text-pink-700",
    dropShadow: "drop-shadow-[0_0_15px_rgba(157,23,77,0.4)]",
    redirectUrl: "https://tiny.keepz.me/muwkcy96"
  },
  {
    id: "prod-3",
    diamonds: 5532,
    price: 170,
    title: "5532 ალმასი",
    subtitle: "Elite Choice",
    iconColor: "text-[#c084fc]",
    dropShadow: "drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]",
    redirectUrl: "https://tiny.keepz.me/5bmd358r"
  },
  {
    id: "prod-4",
    diamonds: 9288,
    price: 250,
    title: "9288 ალმასი",
    subtitle: "Mythic Vault",
    iconColor: "text-[#f5c542]",
    dropShadow: "drop-shadow-[0_0_20px_rgba(245,197,66,0.5)]",
    redirectUrl: "https://tiny.keepz.me/5bmd358r",
    isSale: true
  }
];

export default function Home() {
  return (
    <div className="pt-24 pb-12 px-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          MOBILE LEGENDS ალმასები
        </h1>

        <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full max-w-2xl mx-auto">
          <span className="text-red-500 text-sm font-bold">⚠️</span>
          <p className="text-red-400 text-xs md:text-sm font-bold uppercase tracking-wide text-left">
            ალმასები ირიცხება მხოლოდ Global რეგიონზე. ფილიპინურ აქაუნთებზე არ ჩაირიცხება
          </p>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-[920px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
