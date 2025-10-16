"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import debounce from "lodash.debounce";
import JobList from "@/app/_components/JobList";
import Spinner from "./Spinner";

export default function SearchForm({ jobs }) {
  const [searchTerms, setSearchTerms] = useState("");
  const [locationTerms, setLocationTerms] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Memoize the debounced filter function
  const debouncedFilter = useMemo(
    () =>
      debounce((search, location) => {
        const filtered = jobs.filter((job) => {
          const matchesSearch = search
            ? job.title.toLowerCase().includes(search.toLowerCase()) ||
              job.company.toLowerCase().includes(search.toLowerCase())
            : true;
          const matchesLocation = location
            ? job.location.toLowerCase().includes(location.toLowerCase())
            : true;
          return matchesSearch && matchesLocation;
        });
        setFilteredJobs(filtered);
      }, 800),
    [jobs]
  );

  // Handle input changes
  const handleInputChange = (search, location) => {
    debouncedFilter(search, location);
  };

  // Sync filteredJobs with initial jobs
  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  return (
    <>
      {/* ================= HEADER / HERO SEARCH ================= */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 text-white py-24 px-6 overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Find the job that <span className="text-amber-200">fits your life</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-100">
            Explore thousands of opportunities from top companies around the world.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-2xl p-4 max-w-3xl mx-auto">
            <input
              type="search"
              value={searchTerms}
              onChange={(e) => {
                const newSearch = e.target.value;
                setSearchTerms(newSearch);
                handleInputChange(newSearch, locationTerms);
              }}
              placeholder="Job title or keyword"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
            <input
              type="search"
              value={locationTerms}
              onChange={(e) => {
                const newLocation = e.target.value;
                setLocationTerms(newLocation);
                handleInputChange(searchTerms, newLocation);
              }}
              placeholder="Location"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
          </div>

          <p className="mt-6 text-sm text-gray-200">
            Browse job offers by category or location
          </p>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* ================= JOB SECTORS ================= */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Discover the right job sectors
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found matching your criteria</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Suspense fallback={<Spinner />}>
              {filteredJobs.map((job, index) => (
                <JobList
                  key={job.id}
                  jobId={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  index={index} // Pass index for animation
                />
              ))}
            </Suspense>
          </ul>
        )}
      </div>
    </>
  );
}