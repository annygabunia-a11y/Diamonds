import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { LogOut, Info, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="z-20 px-4 md:px-8 py-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-[#7c3aed] rounded-lg rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.6)] border border-white/20 group-hover:rotate-90 transition-transform duration-500">
          <svg className="-rotate-45 w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 9L12 22L19.5 9L12 2Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xs tracking-widest text-[#c084fc] font-bold uppercase">MLBB STORE</span>
          <span className="text-[10px] text-white/50 font-medium tracking-tighter">ალმასები იაფად</span>
        </div>
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-3 md:px-4 py-2 rounded-xl transition-all focus:outline-none"
            >
              <div className="w-5 h-5 bg-[#7c3aed] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {userData?.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-semibold hidden md:inline-block">
                {userData?.username || 'მომხმარებელი'}
              </span>
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">შესული ხართ როგორც</p>
                    <p className="text-sm font-semibold text-white truncate mt-1">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link 
                      to="/profile" 
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ShoppingBag size={16} className="text-[#c084fc]" />
                      შეძენილი პროდუქტები
                    </Link>
                    <a 
                      href="https://t.me/mlbbalmasebi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Info size={16} className="text-[#c084fc]" />
                      დახმარება (Telegram)
                    </a>
                  </div>
                  <div className="p-2 border-t border-white/10">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut size={16} />
                      გასვლა
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link 
            to="/login"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all"
          >
            შესვლა
          </Link>
        )}
      </div>
    </nav>
  );
}
