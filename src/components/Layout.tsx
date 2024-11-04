import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Swords, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';

export const Layout = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Swords className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-xl">KoW Manager</span>
            </Link>
            
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};