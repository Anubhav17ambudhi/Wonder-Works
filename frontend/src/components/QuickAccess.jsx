import React from 'react';

const QuickAccess = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Get Started</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Access Portal</h2>
          <p className="text-muted-foreground">Choose your role to access the appropriate dashboard</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Admin Card */}
          <a className="group" href="/login">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-primary/20 overflow-hidden">
              <div className="h-2 gradient-primary"></div>
              <div className="p-8 text-center">
                <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-10 w-10 text-white"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Mayor / Admin</h3>
                <p className="text-sm text-muted-foreground mb-4">Access the administrative dashboard with full control over city complaints</p>
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  Login as Admin
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </a>

          {/* Supervisor Card */}
          <a className="group" href="/supervisor/login">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-secondary/20 overflow-hidden">
              <div className="h-2 gradient-secondary"></div>
              <div className="p-8 text-center">
                <div className="h-20 w-20 rounded-2xl gradient-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-secondary/25">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-10 w-10 text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Supervisor</h3>
                <p className="text-sm text-muted-foreground mb-4">Manage area complaints and assign tasks to field workers</p>
                <div className="flex items-center justify-center gap-2 text-secondary font-medium">
                  Login as Supervisor
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </a>

          {/* Citizen Card */}
          <a className="group sm:col-span-2 lg:col-span-1" href="/register-complaint">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm h-full shadow-card hover:shadow-elevated transition-all border-0 group-hover:border-accent/20 overflow-hidden">
              <div className="h-2 gradient-accent"></div>
              <div className="p-8 text-center">
                <div className="h-20 w-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-accent/25">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list h-10 w-10 text-white"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Citizen</h3>
                <p className="text-sm text-muted-foreground mb-4">Register a new complaint or track status of existing ones</p>
                <div className="flex items-center justify-center gap-2 text-accent font-medium">
                  File a Complaint
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 text-center">
          <a href="/track-complaint">
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-5 w-5"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Track Existing Complaint
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;