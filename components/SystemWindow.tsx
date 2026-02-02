export const SystemWindow = ({ src, label }: { src: string, label: string }) => (
  <div className="group relative">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#312fd7] to-[#c71df1] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
    <div className="relative glass-card rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
      <img src={src} alt={label} className="w-full h-auto" />
    </div>
  </div>
);
