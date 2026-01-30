"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Role {
  id: number;
  title: string;
  company: string;
  location: string;
  fee: string;
  type: 'Exclusive' | 'Standard';
  tags: string[];
}

const mockRoles: Role[] = [
  { id: 1, title: "Senior DevOps Engineer", company: "FinTech Scaleup", location: "London / Remote", fee: "20%", type: "Exclusive", tags: ["AWS", "Kubernetes"] },
  { id: 2, title: "Head of Growth", company: "Web3 Studio", location: "Dubai", fee: "25%", type: "Standard", tags: ["Marketing", "Crypto"] },
  { id: 3, title: "Full Stack Developer", company: "E-commerce Giant", location: "Berlin", fee: "18%", type: "Standard", tags: ["React", "Node.js"] },
];

export default function RecruiterRoles() {
  const [roles] = useState<Role[]>(mockRoles);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <span className="text-label mb-4 block">Marketplace Feed</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Live <span className="gradient-text">Mandates</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl">
            Verified roles from across the Xchange. Submit your best candidates and track split-fee progress in real-time.
          </p>
        </header>

        <div className="grid gap-4">
          <AnimatePresence>
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-blue-500/30"
              >
                <div>
                  <div className="flex gap-3 mb-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${role.type === 'Exclusive' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {role.type}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400">
                      Split: {role.fee}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{role.title}</h3>
                  <p className="text-gray-500 text-sm">{role.company} • {role.location}</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex gap-2 mr-4">
                    {role.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-600 border border-white/5 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-blue-600 transition-all">
                    View Brief
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
