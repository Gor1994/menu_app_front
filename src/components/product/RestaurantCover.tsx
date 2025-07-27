// import { Badge } from "@/components/ui/badge";
// import restaurantCover from "@/assets/restaurant-cover.jpg";

// const RestaurantCover = () => {
//   return (
//     <section className="relative h-[50vh] overflow-hidden mt-16">
//       <img 
//         src={restaurantCover} 
//         alt="Bella Vista Restaurant" 
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/40 flex items-end">
//         <div className="container mx-auto px-4 pb-8">
//           <div className="text-white space-y-2">
//             <h1 className="text-4xl md:text-5xl font-bold">Bella Vista Restaurant</h1>
//             <p className="text-xl opacity-90">Italian Fine Dining Experience</p>
//             {/* <div className="flex items-center gap-4 text-sm">
//               <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
//                 ⭐ 4.8 Rating
//               </Badge>
//               <span>📍 Downtown • Italian Cuisine</span>
//               <span>🕒 Open until 11:00 PM</span>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RestaurantCover;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface BranchData {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

const RestaurantCover = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [branchData, setBranchData] = useState<BranchData | null>(null);
  const API_BASE = "https://admin.nushx.com";

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/branches/${branchId}`);
        setBranchData(res.data);
      } catch (err) {
        console.error("Failed to load branch cover", err);
      }
    };

    fetchBranchData();
  }, [branchId]);

  if (!branchData) return null;

  return (
    <section className="relative h-[50vh] overflow-hidden mt-16">
      <img 
        src={branchData.image ? `${API_BASE}/${branchData.image}` : "/fallback.jpg"}
        alt={branchData.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="text-white space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{branchData.title}</h1>
            <p className="text-xl opacity-90">{branchData.subtitle}</p>
            <p className="text-sm opacity-80">{branchData.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCover;
