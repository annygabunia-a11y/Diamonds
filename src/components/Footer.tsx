export default function Footer() {
  return (
    <footer className="z-20 p-4 md:p-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-black/40 backdrop-blur-md mt-auto gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] md:text-[11px] text-white/40 uppercase font-bold tracking-[0.2em]">
        <span className="hover:text-white transition-colors cursor-pointer">ავტორიზაცია</span>
        <span className="hover:text-white transition-colors cursor-pointer">კონფიდენციალურობა</span>
        <span className="hover:text-white transition-colors cursor-pointer">დახმარება</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-white/30 uppercase">Accepted Payments</span>
        <div className="flex gap-2">
          <div className="h-6 w-10 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold opacity-50">VISA</div>
          <div className="h-6 w-10 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold opacity-50">MC</div>
          <div className="h-6 w-10 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold opacity-50">BANK</div>
        </div>
      </div>
    </footer>
  );
}
