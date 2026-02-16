interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin: string;
    portfolio?: string;
    ruwwaad?: string;
  }
  
  export const teamMembers: TeamMember[] = [
    {
      name: "Mr. Noor Hassan",
      role: "CEO",
      image: "/noor.jpeg",
      linkedin: "https://www.linkedin.com/in/noor-hassan-b1987124b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mr. Faisal Mushtaq",
      role: "CFO",
      image: "/faisal.png",
      linkedin: "https://www.linkedin.com/in/muhammad-faisal-mushtaq-4b030a219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mr. Ahsan Nadeem",
      role: "CTO",
      image: "/eshan.png",
      linkedin: "https://www.linkedin.com/in/ahsannadeem01?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mr. Muqeem Malik",
      role: "SSE",
      image: "/muqeem.png",
      linkedin: "https://www.linkedin.com/in/muqeem-malik-166401295?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      portfolio: "https://muqeemmalik.netlify.app",
      ruwwaad: "https://ruwwaad.netlify.app",
    },
  ];