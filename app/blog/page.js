import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Job Board Insights
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Stay updated with the latest career tips, hiring trends, and resources
            to land your dream job or hire the best talents.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Blog Card */}
          {[
            {
              title: "Top 10 Skills Employers Want in 2025",
              date: "September 10, 2025",
              img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&q=75&fit=crop&w=600",
            },
            {
              title: "How to Write a Winning Resume",
              date: "August 28, 2025",
              img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&q=75&fit=crop&w=600",
            },
            {
              title: "Best Remote Jobs to Apply For",
              date: "July 14, 2025",
              img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&q=75&fit=crop&w=600",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <a
                href="#"
                className="group relative block h-48 w-full overflow-hidden"
              >
                <Image
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </a>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-sm text-gray-400">{post.date}</span>
                <h3 className="mt-2 text-xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="hover:text-amber-600 transition"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="mt-3 text-gray-600 text-sm">
                  Discover strategies, tools, and expert advice to boost your career
                  growth and stay ahead in the competitive job market.
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="font-medium text-amber-600 hover:text-amber-700 transition"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
