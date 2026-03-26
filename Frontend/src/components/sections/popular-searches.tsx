import { Link } from "react-router-dom";

const searchCategories = [
  {
    title: "Top Labs in Pakistan",
    links: ["Chughtai Lab", "Dr. Essa Lab", "Test Zone Diagnostic", "Ayzal Lab", "Jinnah MRI Center", "Biotech Lab"]
  },
  {
    title: "Popular Blood Tests",
    links: ["CBC Blood Test", "HbA1c Test", "Lipid Profile", "Liver Function Test (LFT)", "Renal Function Test (RFT)", "Vitamin D Test"]
  },
  {
    title: "Health Checkup Packages",
    links: ["Basic Health Screening", "Comprehensive Full Body", "Cardiac Risk Assessment", "Diabetic Care Package", "Women's Health Profile"]
  },
  {
    title: "Top Cities",
    links: ["Lab Tests in Lahore", "Lab Tests in Karachi", "Lab Tests in Islamabad", "Lab Tests in Rawalpindi", "Lab Tests in Faisalabad"]
  }
];

export function PopularSearches() {
  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-slate-800 mb-8 text-center md:text-left">Popular Searches & Keywords</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {searchCategories.map((category, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {category.title}
              </h4>
              <ul className="space-y-2">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to="/services/labs" 
                      className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 before:content-['›'] before:text-slate-300 hover:before:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}