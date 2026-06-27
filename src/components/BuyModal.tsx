import { useState, type FormEvent } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    diamonds: number;
    price: number;
    redirectUrl: string;
    title: string;
  };
}

export default function BuyModal({ isOpen, onClose, product }: BuyModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState('');
  const [serverId, setServerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accountId || !serverId) {
      setError('შეავსეთ ყველა ველი');
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'purchases'), {
        userId: user.uid,
        productId: product.id,
        diamonds: product.diamonds,
        price: product.price,
        accountId,
        serverId,
        timestamp: new Date().toISOString(),
      });
      
      // Redirect to payment link
      window.location.href = product.redirectUrl;
    } catch (err) {
      setError('დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(124,58,237,0.15)] overflow-hidden transform transition-all p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
          <p className="text-2xl text-violet-400 font-mono font-bold">{product.price}₾</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              აქაუნთის ID
            </label>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder="მაგ: 123456789"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Server ID
            </label>
            <input
              type="text"
              value={serverId}
              onChange={(e) => setServerId(e.target.value)}
              placeholder="მაგ: 6264"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors font-mono"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl bg-[#7c3aed] px-4 py-3.5 text-white font-bold transition-all hover:bg-[#6d28d9] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none shadow-[0_0_20px_rgba(124,58,237,0.35)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="flex items-center justify-center gap-2">
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                <span>{loading ? 'მუშავდება...' : 'ყიდვა'}</span>
              </div>
            </button>
            {!user && (
              <p className="mt-3 text-center text-xs text-red-400">
                ყიდვისთვის აუცილებელია ავტორიზაცია
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
