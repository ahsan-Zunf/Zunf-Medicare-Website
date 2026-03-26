import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context"; 
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/custom"; 
import { Card } from "@/components/ui/card";
import { 
  UploadCloud, FileText, Loader2, Eye, Activity, DownloadCloud, 
  Bell, Share2, Syringe, Microscope, Stethoscope, Droplet, 
  X, CheckCircle2, Search, Trash2, Edit2, QrCode 
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";

const API_URL = "http://localhost:8080/reports"; 

const uploadCategories = [
  { id: "blood", name: "Blood Test", icon: <Droplet className="h-5 w-5" /> },
  { id: "radiology", name: "Radiology", icon: <Activity className="h-5 w-5" /> },
  { id: "xray", name: "X-Ray", icon: <FileText className="h-5 w-5" /> },
  { id: "urine", name: "Urine Test", icon: <Microscope className="h-5 w-5" /> },
  { id: "prescription", name: "Prescription", icon: <Stethoscope className="h-5 w-5" /> },
  { id: "other", name: "Other", icon: <Syringe className="h-5 w-5" /> },
];

const dummyNotifications = [
  { id: 1, title: "Vault Activated", text: "Welcome to your secure ZUNF EHR vault.", time: "Just now", unread: true },
];

export default function EhrDashboard() {
  const { user, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [reports, setReports] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // UI Modals
  const [singleQrModal, setSingleQrModal] = useState<{isOpen: boolean, reportId: string, title: string}>({isOpen: false, reportId: "", title: ""});
  const [showNotifications, setShowNotifications] = useState(false);
  const [renameModal, setRenameModal] = useState<{isOpen: boolean, reportId: string, currentTitle: string}>({isOpen: false, reportId: "", currentTitle: ""});

  const USER_ID = user?.id || localStorage.getItem('userId') || "65abcdef1234567890abcdef";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isAuthenticated === false && !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${USER_ID}`);
      setReports(response.data.reports || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Reports fetch error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, [USER_ID]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const cancelUpload = () => {
    setFile(null);
    setTitle("");
    setCategory("");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category) return alert("Please provide Title and Category!");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("reportFile", file);
    formData.append("title", title);
    formData.append("category", category); 
    formData.append("userId", USER_ID);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` },
      });
      alert("Report successfully uploaded!");
      cancelUpload();
      fetchReports();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please check your internet or backend server.");
    } finally {
      setIsUploading(false);
    }
  };

  // 🌟 FULL DELETE LOGIC
  const handleDelete = async (reportId: string, reportTitle: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${reportTitle}"?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${reportId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setReports(reports.filter(r => r._id !== reportId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete. Please ensure backend delete route is added.");
    }
  };

  // 🌟 FULL RENAME LOGIC
  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameModal.currentTitle.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/${renameModal.reportId}`, 
        { title: renameModal.currentTitle },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      setReports(reports.map(r => r._id === renameModal.reportId ? {...r, title: renameModal.currentTitle} : r));
      setRenameModal({isOpen: false, reportId: "", currentTitle: ""});
    } catch (error) {
      console.error("Rename error:", error);
      alert("Failed to rename. Please ensure backend patch route is added.");
    }
  };

  // 🌟 PERFECT SVG CARD GENERATOR
  const downloadFullCard = () => {
    const qrElement = document.getElementById("FloatingCardQR");
    if (!qrElement) return;
    
    // Exact ViewBox and Paths to ensure perfect scaling
    const viewBox = qrElement.getAttribute("viewBox") || "0 0 256 256";
    const innerPaths = qrElement.innerHTML;

    const patientName = user?.name || "Yazman Mahmood";
    const patientId = `ZM-${USER_ID.slice(-8).toUpperCase()}`;
    const logoUrl = `${window.location.origin}/zunf.png`;

    const cardSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0F2040" />
            <stop offset="40%" stop-color="#0A1628" />
            <stop offset="100%" stop-color="#091525" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <rect width="800" height="500" rx="32" fill="url(#bg)" stroke="#00C6A2" stroke-width="2" stroke-opacity="0.3"/>

        <circle cx="800" cy="0" r="280" fill="#00C6A2" opacity="0.15" filter="url(#glow)" />
        <circle cx="0" cy="500" r="220" fill="#4D9FFF" opacity="0.1" filter="url(#glow)" />

        <image href="${logoUrl}" x="60" y="60" width="180" height="60" preserveAspectRatio="xMinYMin meet" />

        <rect x="620" y="65" width="120" height="32" rx="16" fill="#00C6A2" fill-opacity="0.1" stroke="#00C6A2" stroke-width="1" stroke-opacity="0.4"/>
        <text x="680" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#00C6A2" letter-spacing="2" text-anchor="middle">MASTER QR</text>

        <text x="60" y="370" font-family="Arial, sans-serif" font-size="14" fill="#7A9BB5" letter-spacing="2">PATIENT NAME</text>
        <text x="60" y="415" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-transform="uppercase">${patientName}</text>
        <text x="60" y="450" font-family="Courier New, monospace" font-size="18" fill="#7A9BB5" letter-spacing="3">ID: ${patientId}</text>

        <rect x="520" y="210" width="220" height="220" rx="20" fill="#ffffff" />
        
        <svg x="530" y="220" width="200" height="200" viewBox="${viewBox}">
          ${innerPaths}
        </svg>
      </svg>
    `;

    const blob = new Blob([cardSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ZUNF_HealthCard_${patientName.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSingleQR = () => {
    const svg = document.getElementById("SingleQR");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ZUNF_Report_${singleQrModal.title.substring(0, 10).replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const rCat = r.category || 'Other';
    const matchesTab = activeTab === "All" || rCat.trim().toLowerCase() === activeTab.trim().toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 font-dm">
      <SiteHeader />
      
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Header & Notifications */}
        <div className="flex justify-between items-start md:items-center mb-10 flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-syne mb-1">
              Hello, <span className="text-[#00C6A2]">{user?.name || "Yazman Mahmood"}</span>
            </h1>
            <p className="text-slate-500 text-sm">Welcome to your secure health vault.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="px-5 py-3 rounded-2xl border-slate-100 shadow-sm bg-white flex items-center gap-4">
               <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Total Records</p>
                 <div className="text-xl font-extrabold text-slate-800 leading-none">{reports.length}</div>
               </div>
               <div className="p-2 bg-[#00C6A2]/10 rounded-xl text-[#00C6A2]"><FileText className="h-5 w-5" /></div>
            </Card>

            <div className="relative">
              <div 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-white rounded-full shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors relative"
              >
                 <Bell className="h-5 w-5 text-slate-600" />
                 <span className="absolute top-0 right-0 h-3 w-3 bg-[#FF5272] rounded-full border-2 border-white animate-pulse"></span>
              </div>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-bold text-slate-800">Notifications</h3>
                      <span className="text-xs bg-[#00C6A2]/10 text-[#00C6A2] px-2 py-1 rounded-full font-bold">New</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {dummyNotifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? 'bg-[#00C6A2]/5' : ''}`}>
                           <div className="flex justify-between items-start mb-1">
                             <h4 className={`text-sm ${n.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{n.title}</h4>
                             <span className="text-[10px] text-slate-400">{n.time}</span>
                           </div>
                           <p className="text-xs text-slate-500 leading-relaxed">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 🌟 FLOATING DIGITAL HEALTH PASSPORT */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#00c6a2_1px,transparent_1px),linear-gradient(to_bottom,#00c6a2_1px,transparent_1px)] bg-[size:2rem_2rem]" />
           
           <div className="flex-1 z-10 text-center md:text-left">
             <div className="inline-flex items-center gap-2 bg-[#00C6A2]/10 text-[#00C6A2] px-3 py-1.5 rounded-full text-xs font-bold mb-4">
               <QrCode className="h-4 w-4" /> Smart Identity
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight font-syne">
               Your Digital <br/><span className="text-[#00C6A2]">Health Passport</span>
             </h2>
             <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto md:mx-0 leading-relaxed">
               This is your master identity card. Keep it in your phone and let doctors scan it to view your complete health history securely.
             </p>
             <Button 
                onClick={downloadFullCard}
                className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-[#00C6A2]/20 hover:-translate-y-1 transition-all"
                style={{ background: 'linear-gradient(135deg, #00C6A2, #009E83)', color: '#fff' }}
              >
                <DownloadCloud className="mr-2 h-5 w-5" /> Download Full Card
              </Button>
           </div>

           <div className="flex-1 flex justify-center w-full z-10 perspective-1000">
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[440px] aspect-[1.58/1] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, #0F2040 0%, #0A1628 100%)', border: '1px solid rgba(0,198,162,0.3)' }}
              >
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C6A2]/10 rounded-full blur-[50px] pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4D9FFF]/10 rounded-full blur-[40px] pointer-events-none" />
                 
                 <div className="relative z-10 flex justify-between items-start">
                   <img src="/zunf.png" alt="ZUNF Medicare" className="h-6 w-auto object-contain drop-shadow-md" />
                   <span className="text-[8px] font-bold tracking-widest text-[#00C6A2] uppercase border border-[#00C6A2]/30 px-2 py-1 rounded-full bg-[#00C6A2]/10">Master QR</span>
                 </div>

                 <div className="relative z-10 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest mb-1">Patient Name</p>
                      <h3 className="text-xl font-bold text-white mb-0.5 uppercase tracking-wide">{user?.name || "Yazman Mahmood"}</h3>
                      <p className="text-[10px] font-mono text-slate-400 tracking-wider">ID: ZM-{USER_ID.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.15)] shrink-0">
                      <QRCode id="FloatingCardQR" value={`${window.location.origin}/shared-records/${USER_ID}`} size={80} />
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* UPLOAD ZONE */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 rounded-3xl shadow-sm border-slate-100 bg-white overflow-hidden relative h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00C6A2] to-[#4D9FFF]"></div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-syne text-slate-800">
                <UploadCloud className="text-[#00C6A2] h-6 w-6" /> Upload Record
              </h2>

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div 
                    key="dropzone"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px] transition-all"
                    style={{ borderColor: 'rgba(0,198,162,0.3)', background: 'rgba(0,198,162,0.02)' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#00C6A2'; e.currentTarget.style.background = 'rgba(0,198,162,0.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,198,162,0.3)'; e.currentTarget.style.background = 'rgba(0,198,162,0.02)'; }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                    <h3 className="font-bold text-lg text-slate-700 mb-2 font-syne">Select File</h3>
                    <p className="text-xs text-slate-400 px-4 leading-relaxed">Drag & drop or click to browse. PDF, JPG, PNG</p>
                    <input type="file" accept=".pdf, image/png, image/jpeg" onChange={handleFileSelect} className="hidden" ref={fileInputRef} />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <FileText className="h-6 w-6 text-[#00C6A2]" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                          <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={cancelUpload} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm"><X className="h-4 w-4" /></button>
                    </div>

                    <form onSubmit={handleUpload} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category *</label>
                        <div className="grid grid-cols-2 gap-2">
                          {uploadCategories.map((cat) => (
                            <button
                              type="button"
                              key={cat.id}
                              onClick={() => setCategory(cat.name)}
                              className={`p-2.5 rounded-xl flex items-center gap-2 transition-all border ${
                                category === cat.name ? 'shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-[#00C6A2]/30'
                              }`}
                              style={category === cat.name ? { borderColor: '#00C6A2', background: 'rgba(0,198,162,0.1)', color: '#00C6A2' } : {}}
                            >
                              {cat.icon}
                              <span className="text-[11px] font-bold truncate">{cat.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Title *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Chest X-Ray"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00C6A2]/50 bg-white text-sm"
                          required
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isUploading || !category || !title}
                        className="w-full rounded-xl h-12 text-sm font-bold shadow-[0_6px_15px_rgba(0,198,162,0.2)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 mt-2"
                        style={{ background: 'linear-gradient(135deg, #00C6A2, #009E83)', color: '#fff' }}
                      >
                        {isUploading ? <><Loader2 className="h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle2 className="h-5 w-5" /> Save Securely</>}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* REPORTS VAULT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SEARCH & FILTERS */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800 font-syne px-1">Your Records Vault</h2>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search reports..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:border-[#00C6A2] focus:ring-1 focus:ring-[#00C6A2]"
                    />
                  </div>
               </div>

               <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  <button 
                    onClick={() => setActiveTab("All")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === "All" ? 'bg-[#00C6A2] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >All</button>
                  {uploadCategories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveTab(cat.name)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === cat.name ? 'bg-[#00C6A2] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >{cat.name}</button>
                  ))}
               </div>
            </div>

            {/* Reports Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 text-[#00C6A2] animate-spin" />
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 border-dashed">
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
                <p className="text-slate-500 font-medium">No records found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredReports.map((report, index) => (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} key={report._id}>
                    <Card className="p-4 rounded-2xl flex flex-col h-full hover:shadow-xl transition-all border-slate-100 bg-white group">
                      
                      {/* Top Action Bar (Edit & Delete) */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2.5 rounded-xl transition-colors" style={{ background: 'rgba(0,198,162,0.1)', color: '#00C6A2' }}>
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setRenameModal({isOpen: true, reportId: report._id, currentTitle: report.title})} className="p-1.5 text-slate-400 hover:text-[#00C6A2] bg-slate-50 rounded-lg"><Edit2 className="h-3.5 w-3.5" /></button>
                          <button onClick={() => handleDelete(report._id, report.title)} className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>

                      <span className="inline-block w-max text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase border border-slate-50 mb-2 truncate max-w-[100px]">
                         {report.category || 'Other'}
                      </span>
                      
                      <h3 className="font-bold text-sm text-slate-900 mb-1 line-clamp-1" title={report.title}>
                        {report.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-4 font-medium">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                      
                      <div className="mt-auto pt-3 border-t border-slate-50 flex gap-2">
                        <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors">
                          <Eye className="h-3.5 w-3.5" /> View
                        </a>
                        <button 
                          onClick={() => setSingleQrModal({isOpen: true, reportId: report._id, title: report.title})}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors"
                          style={{ background: 'rgba(0,198,162,0.1)', color: '#00C6A2' }}
                        >
                          <Share2 className="h-3.5 w-3.5" /> Share
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
      
      <Footer />

      {/* RENAME MODAL */}
      <AnimatePresence>
        {renameModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
              <button onClick={() => setRenameModal({isOpen: false, reportId: "", currentTitle: ""})} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
              <h3 className="font-bold text-lg text-slate-900 font-syne mb-4">Rename Record</h3>
              <form onSubmit={handleRename}>
                <input 
                  type="text" 
                  value={renameModal.currentTitle}
                  onChange={(e) => setRenameModal({...renameModal, currentTitle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00C6A2] text-sm mb-4"
                  autoFocus
                  required
                />
                <button type="submit" className="w-full rounded-xl h-11 text-sm font-bold text-white transition-all bg-[#00C6A2] hover:bg-[#009E83]">Save Changes</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE REPORT PRIVACY QR MODAL */}
      <AnimatePresence>
        {singleQrModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
              <button onClick={() => setSingleQrModal({isOpen: false, reportId: "", title: ""})} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ background: 'rgba(0,198,162,0.1)', color: '#00C6A2' }}>
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 font-syne">Share Report</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1 px-4">{singleQrModal.title}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex justify-center mb-6 border border-slate-100">
                 <QRCode id="SingleQR" value={`${window.location.origin}/shared-report/${singleQrModal.reportId}`} size={160} />
              </div>
              <p className="text-xs text-center text-slate-500 mb-6 px-2 leading-relaxed">
                This QR code grants access <strong>ONLY</strong> to this specific document. Your other records remain private.
              </p>
              <button 
                onClick={downloadSingleQR}
                className="w-full rounded-xl h-11 text-sm font-bold shadow-[0_6px_20px_rgba(0,198,162,0.3)] transition-all flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #00C6A2, #009E83)', color: '#fff' }}
              >
                <DownloadCloud className="h-4 w-4" /> Download QR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}