import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/assets/hero-city-BodZyBoE.jpg" 
          alt="City skyline" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,55%,12%)] via-[hsl(220,55%,12%,0.9)] to-[hsl(220,55%,12%,0.7)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,55%,12%)] via-transparent to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-4 w-4 text-accent">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            <span className="text-sm text-white/90">City Complaint Management Portal</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight">
            Your Voice, <span className="text-gradient">Our Action</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 mb-8 animate-fade-in max-w-2xl leading-relaxed">
            A streamlined platform for citizens to report issues and for city officials to efficiently manage and resolve community complaints.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <a href="/register-complaint">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-11 rounded-md px-8 w-full sm:w-auto gradient-accent hover:opacity-90 text-white border-0 shadow-lg shadow-accent/25">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list mr-2 h-5 w-5"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
                Register a Complaint
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </a>
            <a href="/login">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-11 rounded-md px-8 w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield mr-2 h-5 w-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                Official Login
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in">
            {[
              { val: "2,500+", label: "Complaints Resolved" },
              { val: "48h", label: "Avg. Response Time" },
              { val: "95%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.val}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;