import { Badge } from "@/components/ui/badge";
import restaurantCover from "@/assets/restaurant-cover.jpg";

const RestaurantCover = () => {
  return (
    <section className="relative h-[50vh] overflow-hidden mt-16">
      <img 
        src={restaurantCover} 
        alt="" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="text-white space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">Bella Vista Restaurant</h1>
            <p className="text-xl opacity-90">Italian Fine Dining Experience</p>
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ⭐ 4.8 Rating
              </Badge>
              <span>📍 Downtown • Italian Cuisine</span>
              <span>🕒 Open until 11:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCover;