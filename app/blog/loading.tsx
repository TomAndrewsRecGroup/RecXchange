export default function BlogLoading() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 bg-gray-800/50 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-800/30 rounded-lg w-1/2 mx-auto"></div>
        </div>

        {/* Category filter skeleton */}
        <div className="flex gap-3 mb-12 justify-center animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-800/30 rounded-xl"></div>
          ))}
        </div>

        {/* Posts skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl border border-white/5 animate-pulse">
              {/* Platform badge */}
              <div className="h-6 w-24 bg-cyan-500/20 rounded-full mb-4"></div>
              
              {/* Content */}
              <div className="space-y-3 mb-4">
                <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                <div className="h-4 bg-gray-800/50 rounded w-11/12"></div>
                <div className="h-4 bg-gray-800/50 rounded w-10/12"></div>
                <div className="h-4 bg-gray-800/50 rounded w-9/12"></div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 w-20 bg-gray-800/30 rounded-full"></div>
                ))}
              </div>

              {/* Date */}
              <div className="h-4 w-32 bg-gray-800/30 rounded"></div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading posts...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
