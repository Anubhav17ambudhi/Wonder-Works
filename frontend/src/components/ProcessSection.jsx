import React from 'react';

const ProcessSection = () => {
  const steps = [
    {
      title: "Register Complaint",
      desc: "Citizens can easily submit complaints with details about their location and issue type.",
      stepNum: "Step 1",
      iconClass: "gradient-primary",
      img: "/assets/register-complaint-DuRenkwp.png",
      list: ["Simple registration form", "Category selection", "Location-based filing"]
    },
    {
      title: "Assignment & Tracking",
      desc: "Supervisors assign complaints to workers and track progress in real-time.",
      stepNum: "Step 2",
      iconClass: "gradient-secondary",
      img: "/assets/assignment-tracking-Ctq9k-zo.png",
      list: ["Area-wise distribution", "Worker assignment", "Real-time status updates"],
      extraClass: "md:-mt-4" // Stagger effect
    },
    {
      title: "Resolution & Analytics",
      desc: "The Mayor's office monitors all complaints and views analytics for better governance.",
      stepNum: "Step 3",
      iconClass: "gradient-accent",
      img: "/assets/analytics-resolution-Xgw7dauK.png",
      list: ["Dashboard analytics", "Heatmap visualization", "Performance metrics"]
    }
  ];

  return (
    <section className="py-20 md:py-28 container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">How It Works</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Simple & Efficient Process</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our complaint management system ensures every concern is heard and addressed promptly.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className={`rounded-lg bg-card text-card-foreground shadow-sm shadow-card hover:shadow-elevated transition-all border-0 animate-fade-in group overflow-hidden ${step.extraClass || ''}`}>
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                <img src={step.img} alt={step.title} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-10 w-10 rounded-xl ${step.iconClass} flex items-center justify-center`}>
                  {/* Generic Icon Placeholder - You can dynamically swap these if needed */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list h-5 w-5 text-white"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${step.stepNum === 'Step 2' ? 'text-secondary bg-secondary/10' : step.stepNum === 'Step 3' ? 'text-accent bg-accent/10' : 'text-primary bg-primary/10'}`}>
                  {step.stepNum}
                </span>
              </div>
              <h3 className="font-semibold tracking-tight text-xl">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2">
                {step.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-4 w-4 text-secondary"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;