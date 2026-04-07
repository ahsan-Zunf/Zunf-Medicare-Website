import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CanonicalUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Check karein ke canonical tag pehle se hai ya nahi
    let canonicalLink = document.querySelector("link[rel='canonical']");
    
    // Agar nahi hai toh naya bana lein
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    
    // Current URL ke hisaab se tag ko update karein
    canonicalLink.setAttribute("href", `https://zunfmedicare.com${location.pathname}`);
  }, [location]);

  return null; // Yeh component screen par kuch draw nahi karega, sirf background mein tag update karega
}