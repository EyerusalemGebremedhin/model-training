"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Job, JobInput, UserProfile } from "./types";

const INITIAL_JOBS: Job[] = [
  { id: 1, title: "React & Next.js Landing Page Development", category: "Frontend", location: "📍 Mombasa Road, Nairobi", budget: "Ksh 25,000 Total", type: "Task", phone: "254712345678", employerName: "Safaricom Data Center", expiryDate: "Exp: July 20" },
  { id: 2, title: "FastAPI Bug Fix & Database Migration", category: "Backend", location: "📍 Wood Avenue, Kilimani", budget: "Ksh 15,000 Total", type: "Freelance", linkedin: "https://linkedin.com", employerName: "Jacaranda Health", expiryDate: "Exp: July 25" },
  { id: 3, title: "Python Script for CSV Data Cleaning", category: "Data & ML", location: "📍 Dennis Pritt Road, Kilimani", budget: "Ksh 8,000 Total", type: "Task", externalUrl: "https://forms.gle", employerName: "Ona Insights", expiryDate: "Exp: July 18" },
  { id: 4, title: "Fine-Tuning Llama 3 for Customer Support", category: "AI Eng", location: "📍 Ngong Road, Kilimani", budget: "Ksh 60,000 Total", type: "Task", phone: "254777889900", employerName: "Ada Labs", expiryDate: "Exp: July 30" }
];

export default function JobBoard() {
  const [user, setUser] = useState<UserProfile>({ name: "", email: "", role: null, trackPreference: "Frontend" });
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  
  const [signupForm, setSignupForm] = useState({ name: "", email: "", role: "talent" as 'talent' | 'employer', trackPreference: "Frontend" });
  const [loginForm, setLoginForm] = useState({ email: "", role: "talent" as 'talent' | 'employer' });
  
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contactMethod, setContactMethod] = useState<string>("phone");

  const [formData, setFormData] = useState<JobInput>({
    title: "", category: "Software Eng", location: "", budget: "", type: "Task", employerName: "", phone: "", linkedin: "", externalUrl: "", expiryDate: "Exp: Aug 15"
  });

  const filteredJobs = jobs.filter((job: Job) => {
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.employerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ name: signupForm.name, email: signupForm.email, role: signupForm.role, trackPreference: signupForm.trackPreference });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ name: "Logged User", email: loginForm.email, role: loginForm.role, trackPreference: "Frontend" });
  };

  const handleCreateJob = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newJob: Job = {
      ...formData,
      id: jobs.length + 1,
      employerName: user.name || "Verified Partner",
      phone: contactMethod === "phone" ? formData.phone : undefined,
      linkedin: contactMethod === "linkedin" ? formData.linkedin : undefined,
      externalUrl: contactMethod === "externalUrl" ? formData.externalUrl : undefined,
    };
    setJobs([newJob, ...jobs]);
    setIsModalOpen(false);
  };

  const handleApply = (job: Job): void => {
    if (job.phone) {
      const message = encodeURIComponent(`Hi! I saw your tech opening for "${job.title}" on Anza Jobs and I'm interested.`);
      window.open(`https://wa.me{job.phone}?text=${message}`, "_blank");
    } else if (job.linkedin) {
      window.open(job.linkedin, "_blank");
    } else if (job.externalUrl) {
      window.open(job.externalUrl, "_blank");
    }
  };

  const trackList = ["Software Eng", "AI Eng", "Frontend", "Backend", "Data & ML", "UX Research", "Product Mgt", "Product Design", "QA Eng", "Cybersecurity"];
  if (user.role === null) {
    return (
      <div className="main-container" style={{ alignItems: "center" }}>
        <main className="app-layout" style={{ maxWidth: "450px", flexDirection: "column" }}>
          <div className="left-panel" style={{ width: "100%" }}>
            <div className="brand-box" style={{ textAlign: "center" }}>
              <h1 className="logo-text">Anza <span className="logo-accent">Jobs</span> 🇰🇪</h1>
              <p className="sub-text">AkiraChix Talent Platform</p>
            </div>

            {isLoginMode ? (
              <form onSubmit={handleLogin} className="modal-form-element">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" required placeholder="name@domain.com" className="search-input" onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Select Your Account Type</label>
                  <select className="search-input select-field" onChange={(e) => setLoginForm({...loginForm, role: e.target.value as 'talent' | 'employer'})}>
                    <option value="talent">🙋‍♀️ Student / Graduate</option>
                    <option value="employer">🏢 Employer / Recruiter</option>
                  </select>
                </div>
                <button type="submit" className="action-post border-none w-full cursor-pointer" style={{ marginTop: "10px" }}>Log In</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="modal-form-element">
                <div className="form-group">
                  <label className="form-label">Your Name / Company Name</label>
                  <input type="text" required placeholder="e.g. Maria Nekesa" className="search-input" onChange={(e) => setSignupForm({...signupForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" required placeholder="name@domain.com" className="search-input" onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">What is your role?</label>
                  <select className="search-input select-field" onChange={(e) => setSignupForm({...signupForm, role: e.target.value as 'talent' | 'employer'})}>
                    <option value="talent">🙋‍♀️ I need a job (Student / Graduate)</option>
                    <option value="employer">🏢 I am an employer (Looking to hire)</option>
                  </select>
                </div>
                {signupForm.role === "talent" && (
                  <div className="form-group">
                    <label className="form-label">Select Your Tech Track Focus</label>
                    <select className="search-input select-field" onChange={(e) => setSignupForm({...signupForm, trackPreference: e.target.value})}>
                      {trackList.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
                <button type="submit" className="action-post border-none w-full cursor-pointer" style={{ marginTop: "10px" }}>Create Account</button>
              </form>
            )}

            <div className="toggle-link-container">
              <button onClick={() => setIsLoginMode(!isLoginMode)} className="toggle-link-btn">
                {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (user.role === "employer") {
    const myPostedJobs = jobs.filter(j => j.employerName === user.name || j.employerName === "Logged User");
    return (
      <div className="main-container">
        <header className="top-header">
          <div className="header-content">
            <div className="header-logo">Anza <span className="logo-accent">Jobs</span> <span className="workspace-tag">Employer Workspace</span></div>
            <div className="header-nav" style={{ gap: "16px", display: "flex", alignItems: "center" }}>
              <span className="user-profile-badge">🏢 {user.name === "Logged User" ? "Workspace Console" : user.name}</span>
              <button onClick={() => setUser({ name: "", email: "", role: null })} className="tag-action inactive-tag" style={{ border: "none" }}>Log Out</button>
            </div>
          </div>
        </header>

        <div className="app-layout" style={{ flexDirection: "column" }}>
          <div className="panel-top">
            <div>
              <h2 className="panel-title">Your Job Postings</h2>
              <p className="sub-text" style={{ textTransform: "none" }}>Manage openings you posted for AkiraChix students</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="action-post border-none cursor-pointer">+ Post a New Job</button>
          </div>

          <div className="system-alert-banner alert-blue">
            📢 <strong>Employer Notice:</strong> Students are currently active on the platform looking for openings in your track domains.
          </div>

          <div className="jobs-list" style={{ gridTemplateColumns: "1fr" }}>
            {myPostedJobs.length === 0 ? (
              <p className="empty-text">You have not posted any jobs yet. Click the button above to post one.</p>
            ) : (
              myPostedJobs.map((job) => (
                <div key={job.id} className="job-card" style={{ minHeight: "auto", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span className="job-badge" style={{ marginRight: "10px" }}>{job.category}</span>
                    <span className="job-location">{job.location}</span>
                    <h3 className="job-title" style={{ marginTop: "10px" }}>{job.title}</h3>
                    <p className="job-budget" style={{ marginBottom: "0px", marginTop: "4px" }}>{job.budget}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span className="expiry-badge">{job.expiryDate}</span>
                    <div className="track-status-alert">
                      <span className="alert-pulse-dot"></span>
                      Job Live
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header-box">
                <h2>Post a Job</h2>
                <button onClick={() => setIsModalOpen(false)} className="close-action-btn">✕</button>
              </div>
              
              <form onSubmit={handleCreateJob} className="modal-form-element">
                <div className="form-group">
                  <input type="text" required placeholder="Job Title" className="search-input" onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="form-grid">
                  <select className="search-input select-field" onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {trackList.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select className="search-input select-field" onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="Task">Task</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                
                <div className="form-grid">
                  <input type="text" required placeholder="Location" className="search-input" onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  <input type="text" required placeholder="Budget" className="search-input" onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                </div>

                <div className="form-grid">
                  <input type="text" required placeholder="Application Expiry (e.g. Exp: Aug 20)" className="search-input" onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                  <select className="search-input select-field" onChange={(e) => setContactMethod(e.target.value)}>
                    <option value="phone">WhatsApp</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div className="form-group">
                  <input 
                    type="text" 
                    required 
                    placeholder={contactMethod === "phone" ? "e.g. 254712345678" : "https://linkedin.com..."} 
                    className="search-input" 
                    onChange={(e) => contactMethod === "phone" 
                      ? setFormData({...formData, phone: e.target.value, linkedin: undefined}) 
                      : setFormData({...formData, linkedin: e.target.value, phone: undefined})
                    } 
                  />
                </div>

                <button type="submit" className="form-submit-action">Publish Job</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
    const matchingPendingJobsCount = jobs.filter(j => j.category === user.trackPreference).length;
  const filteredTalentJobs = jobs.filter((job: Job) => {
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.employerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="main-container">
      <header className="top-header">
        <div className="header-content">
          <div className="header-logo">Anza <span className="logo-accent">Jobs</span> <span className="workspace-tag">Student Dashboard</span></div>
          <div className="header-nav" style={{ gap: "16px", display: "flex", alignItems: "center" }}>
            <span className="user-profile-badge">🎓 {user.name === "Logged User" ? "Student Network" : user.name} ({user.trackPreference})</span>
            <button onClick={() => setUser({ name: "", email: "", role: null })} className="tag-action inactive-tag" style={{ border: "none" }}>Log Out</button>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <aside className="left-panel">
          <div className="brand-box"><h2 className="panel-brand-title">Search Filters</h2><p className="sub-text">Find work matching your track</p></div>
          <div className="find-box">
            <label className="box-title">Search Jobs</label>
            <input type="text" placeholder="Type company name or skill..." className="search-input" value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
          </div>
          <div className="tracks-box">
            <label className="box-title">Filter by Tracks</label>
            <div className="tag-list">
              {["All", ...trackList].map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`tag-action ${selectedCategory === cat ? "active-tag" : "inactive-tag"}`}>{cat}</button>
              ))}
            </div>
          </div>
        </aside>

        <main className="right-panel">
          {matchingPendingJobsCount > 0 && (
            <div className="system-alert-banner alert-green">
              🚀 <strong>New Update:</strong> There are <strong>{matchingPendingJobsCount} new openings available</strong> matching your track focus: <u>{user.trackPreference}</u>! Apply below.
            </div>
          )}

          <div className="panel-top">
            <h2 className="panel-title">Available Positions</h2>
            <span className="count-tag">{filteredTalentJobs.length} active jobs</span>
          </div>

          <div className="jobs-list">
            {filteredTalentJobs.length === 0 ? (
              <p className="empty-text">No active positions match your specific search matrix.</p>
            ) : (
              filteredTalentJobs.map((job: Job) => (
                <div key={job.id} className="job-card">
                  <div className="card-top">
                    <div className="job-header">
                      <span className="job-badge">{job.type}</span>
                      <span className="expiry-badge">{job.expiryDate}</span>
                    </div>
                    <div className="employer-badge">🏢 {job.employerName}</div>
                    <span className="job-location" style={{ display: 'block', marginBottom: '8px' }}>{job.location}</span>
                    <h3 className="job-title">{job.title}</h3>
                  </div>
                  <div className="card-bottom">
                    <p className="job-budget" style={{ marginTop: '12px' }}>{job.budget}</p>
                    <button onClick={() => handleApply(job)} className={`action-apply ${job.phone ? 'via-whatsapp' : 'via-linkedin'}`}>
                      {job.phone ? "💬 Apply via WhatsApp" : "🔗 Apply via LinkedIn"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


