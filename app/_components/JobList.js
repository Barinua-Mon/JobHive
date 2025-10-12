"use client";

import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation variants for the slide-in effect
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 },
  }),
};

export default function JobList({ title, company, location, type, jobId, index }) {
  return (
    <motion.li
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4 border border-gray-100 hover:border-amber-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of card is in view
      variants={cardVariants}
      custom={index} // Pass index for staggered animation
    >
      {/* Job Title */}
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>

      {/* Company */}
      <p className="text-gray-500 font-medium">{company}</p>

      {/* Job Details */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-amber-500" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-amber-500" />
          {type}
        </span>
      </div>

      {/* Apply Link */}
      <Link
        href={`/jobs/${jobId}`}
        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-center"
      >
        Apply Now
      </Link>
    </motion.li>
  );
}