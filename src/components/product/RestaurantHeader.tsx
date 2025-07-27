// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const RestaurantHeader = () => {
//   const navigate = useNavigate();

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* <Button 
//           variant="ghost" 
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Home
//         </Button> */}
//         <h1 className="text-xl font-bold text-primary">Bella Vista Restaurant</h1>
//       </div>
//     </header>
//   );
// };

// export default RestaurantHeader;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import i18n from "@/lib/i18n";

const flags: Record<string, string> = {
  AM: "🇦🇲",
  RU: "🇷🇺",
  EN: "🇬🇧",
};

const RestaurantHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
    setOpen(false);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

    // Optionally: add language switching logic here

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Bella Vista Restaurant</h1>
        
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-black/30 px-2 py-1 rounded-lg hover:bg-gray-200"
          >
            <span className="text-xl">{flags[i18n.language]}</span>
            <FaChevronDown className="text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg">
              {Object.keys(flags).map((lang) => (
                <div
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <span className="text-xl">{flags[lang]}</span>
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;
