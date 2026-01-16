import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 border-t bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-5 w-5 text-white"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>
            </div>
            <div>
              <span className="font-bold text-lg">City Complaint Portal</span>
              <p className="text-xs text-muted-foreground">Making cities better, together</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a className="hover:text-foreground transition-colors" href="/register-complaint">Register</a>
            <a className="hover:text-foreground transition-colors" href="/track-complaint">Track</a>
            <a className="hover:text-foreground transition-colors" href="/login">Admin</a>
            <a className="hover:text-foreground transition-colors" href="/supervisor/login">Supervisor</a>
          </div>
          <p className="text-sm text-muted-foreground">©️ 2024 City Municipal Corporation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;