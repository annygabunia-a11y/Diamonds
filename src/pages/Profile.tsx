import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ShoppingBag, Loader2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigate } from 'react-router-dom';

interface Purchase {
  id: string;
  productId: string;
  diamonds: number;
  price: number;
  accountId: string;
  serverId: string;
  timestamp: string;
}

export default function Profile() {
  const { user, userData, loading: authLoading } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchases() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'purchases'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Purchase[];
        
        // Sort client-side to avoid requiring a composite index in Firestore
        data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setPurchases(data);
      } catch (error) {
        // Ignore network or permission errors
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      if (user) {
        fetchPurchases();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="pb-12 flex-1">
      {/* Cover Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-black" />
        {/* Placeholder cover pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-40 h-40 rounded-full border-4 border-[#0a0a0a] overflow-hidden bg-[#1c1c1c] shadow-[0_0_30px_rgba(124,58,237,0.3)] flex items-center justify-center">
            {/* Fallback avatar if no image uploaded (since we don't handle file uploads here) */}
            <div className="w-full h-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-4xl font-bold text-white uppercase">
              {userData?.username?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
          </div>
          
          <h1 className="mt-4 text-3xl font-bold text-white tracking-tight">
            {userData?.username || 'მომხმარებელი'}
          </h1>
          <p className="text-violet-400 mt-1">{user.email}</p>
        </div>

        <div className="mt-12 bg-[#1c1c1c]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <ShoppingBag className="text-violet-400" />
            <h2 className="text-xl font-bold text-white">შეძენილი პროდუქტები</h2>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
          ) : purchases.length > 0 ? (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={purchase.id} 
                  className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-black/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
                      <div className="w-6 h-6 border-2 border-violet-400 rounded-sm rotate-45" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{purchase.diamonds} ალმასი</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <span>ID: {purchase.accountId}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>Server: {purchase.serverId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className="text-lg font-bold text-violet-400">{purchase.price}₾</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Calendar size={12} />
                      {new Date(purchase.timestamp).toLocaleDateString('ka-GE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400">ჯერ არ გაქვთ შეძენილი პროდუქტები</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
