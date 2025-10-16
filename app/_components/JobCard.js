import JobList from "./JobList";

export default async function JobCard() {

    const jobs = await prisma.job.findMany({
        select: {
            id: true,
            location: true,
            title: true,
            type: true,
            company: true
        }
    })

    return (
        <>
            {!jobs || jobs.length === 0 ? (
                <p>Sorry something went wrong! Jobs couldn&apos;t be loaded</p>
            ) : (

                <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {jobs.map(jobs => (
                        <JobList
                            key={jobs.id}
                            title={jobs.title}
                            company={jobs.company}
                            location={jobs.location}
                            type={jobs.type}
                        />
                    ))}
                </ul>
            )
            }
        </>
    );
}