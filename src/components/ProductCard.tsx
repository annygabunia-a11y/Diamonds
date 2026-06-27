import { useState } from 'react';
import { cn } from '../lib/utils';
import BuyModal from './BuyModal';

interface ProductCardProps {
  id: string;
  diamonds: number;
  price: number;
  iconColor: string;
  dropShadow?: string;
  title: string;
  subtitle?: string;
  redirectUrl: string;
  isSale?: boolean;
}

export default function ProductCard({
  id,
  diamonds,
  price,
  iconColor,
  dropShadow,
  title,
  subtitle,
  redirectUrl,
  isSale,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "backdrop-blur-xl rounded-[24px] p-6 flex flex-col items-center gap-4 shadow-2xl group cursor-pointer transition-all h-full relative overflow-hidden",
          isSale 
            ? "bg-white/10 border border-[#f5c542]/40 shadow-[0_0_30px_rgba(245,197,66,0.15)]" 
            : "bg-white/5 border border-white/10 hover:border-[#7c3aed]/50"
        )}
      >
        {isSale && (
          <div className="absolute top-3 right-[-30px] bg-[#f5c542] text-black text-[10px] font-black py-1 px-10 rotate-45 shadow-xl uppercase z-10">
            -SALE
          </div>
        )}

        <div className={cn("w-24 h-24 flex items-center justify-center mb-2", dropShadow)}>
          <svg className={cn("w-full h-full", iconColor)} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 9L12 22L19.5 9L12 2Z" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className={cn(
            "text-xs uppercase tracking-widest mt-1",
            isSale ? "text-[#f5c542]/60" : "text-white/40"
          )}>{subtitle}</p>
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <div className={cn("text-2xl font-black", isSale && "text-[#f5c542]")}>{price}₾</div>
          <button 
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-colors",
              isSale 
                ? "bg-[#f5c542] hover:bg-[#d9ae36] text-black shadow-[0_0_20px_rgba(245,197,66,0.35)]" 
                : "bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_20px_rgba(124,58,237,0.35)]"
            )}
          >
            ყიდვა
          </button>
        </div>
      </div>

      <BuyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={{ id, diamonds, price, redirectUrl, title }} 
      />
    </>
  );
}
