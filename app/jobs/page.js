
import SearchForm from "@/app/_components/SearchForm";
import Footer from "../_components/Footer";
import { getCachedJobs } from "@/lib/supabase";
import ErrorFallback from "../_components/ErrorFallback";

//Set revalidate time for the page in secs
export const revalidate = 1800;

export default async function Page() {
  const {jobs, error} = await getCachedJobs();

  if (!jobs || error) {
  return (
   <ErrorFallback
      message="Database could not be reached. Please check your network connection and try again later."
    />
  );
}

    
  return (
    <section className="flex flex-col min-h-screen bg-gray-100">

      <SearchForm jobs={jobs} />

      {/* Footer */}
      <Footer/>
    </section>
  );
}
