'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, ShieldAlert, Loader2, Home, BarChart3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { templates } from '@/lib/templates.config';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOrder = any;

export default function Kac8Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [orders, setOrders] = useState<AnyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setOrders(data);
      }
      setLoading(false);
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrdersManual = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kac8') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied. Nice try hacker.');
      setPassword('');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this legend?')) return;
    
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (!error) {
      setOrders(orders.filter(o => o.id !== id));
    } else {
      alert('Error deleting: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-4">
        <ShieldAlert size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-2xl font-mono text-white mb-8 tracking-widest uppercase">Restricted Area</h1>
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
          <input 
            type="password" 
            placeholder="Enter Override Code" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 bg-black border border-red-500/50 rounded text-red-500 focus:outline-none focus:border-red-500 font-mono text-center tracking-[0.5em]"
            autoFocus
          />
          <button type="submit" className="w-full py-4 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600 transition-all uppercase font-bold tracking-widest">
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  // Calculate stats
  const totalCerts = orders.length;
  
  const templateCounts = orders.reduce((acc, order) => {
    const tId = order.template_id || 'unknown';
    acc[tId] = (acc[tId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(templateCounts).map(key => {
    const template = templates.find(t => t.id === key);
    return {
      name: template ? template.name.en : key,
      value: templateCounts[key],
      color: template ? template.themeColor : '#555555'
    };
  });

  return (
    <div className="min-h-screen bg-obsidian text-white font-inter">
      <header className="bg-black border-b border-gray-800 p-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            <Home size={24} />
          </Link>
          <h1 className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-2">
            <ShieldAlert className="text-neon" size={24} /> 
            KAC8 COMMAND CENTER
          </h1>
        </div>
        <div className="bg-neon/10 border border-neon text-neon px-4 py-2 rounded font-mono font-bold">
          TOTAL: {totalCerts}
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Analytics */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-gray-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 size={18} /> Template Distribution
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="lg:col-span-2">
          <div className="bg-[#0c0c0c] border border-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-[80vh]">
            <div className="p-4 border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
              <h2 className="text-white font-bold uppercase tracking-widest">Live Certificate Feed</h2>
              <button onClick={fetchOrdersManual} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                Refresh
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="animate-spin text-neon" /></div>
              ) : orders.length === 0 ? (
                <div className="text-center text-gray-500 py-12">No data found.</div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-black border border-gray-800 rounded-lg p-4 flex justify-between items-center group hover:border-gray-600 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-royal">{order.serial_number}</span>
                        <span className="text-xs bg-gray-900 text-gray-400 px-2 py-0.5 rounded uppercase">{order.template_id || 'unknown'}</span>
                        <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{order.customer_name}</h3>
                      <p className="text-neon text-sm">{order.language_preference === 'ar' ? order.title_ar : order.title_en}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}