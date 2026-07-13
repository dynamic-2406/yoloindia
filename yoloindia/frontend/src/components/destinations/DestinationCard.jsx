import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";

const DestinationCard = ({ destination, size = "md" }) => {
  const heights = { sm: "h-52", md: "h-64", lg: "h-80" };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link to={`/destinations/${destination.slug}`} className="block">
        <div className={`${heights[size]} relative overflow-hidden`}>
          <img
            src={destination.image}
            alt={destination.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-body font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm
              ${destination.type === "International" ? "bg-ocean-500/80 text-white" : "bg-saffron-500/80 text-white"}`}
              
            >
              {destination.type}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display font-bold text-white text-xl leading-tight">
              {destination.name}
            </h3>
            <p className="font-body text-white/75 text-sm mt-1">
              {destination.tagline}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5 text-white/60 text-xs font-body">
                <Sun size={13} className="text-saffron-400" />
                <span>Best: {destination.bestTime}</span>
              </div>
              <span
                className="flex items-center gap-1 text-white text-xs font-body font-semibold
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-saffron-500 px-3 py-1.5 rounded-full"
              >
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default DestinationCard;
