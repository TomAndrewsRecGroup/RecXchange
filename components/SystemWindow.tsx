export const SystemWindow = ({ src, label }: { src: string, label: string }) => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#312fd7] to-[#c71df1] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
    <div className="relative glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
      {/* Ensure the image fill is clean */}
      <div className="bg-[#0a0a0a] min-h-[300px] flex items-center justify-center">
        <img 
          src={src} 
          alt={label} 
          className="w-full h-auto block object-cover" 
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/800x450/0a0a0a/312fd7?text=System+Preview+Loading..."; 
          }}
        />
      </div>
    </div>
  </div>
);
