import axios from 'axios';

const formURL = (id) => {
  return `https://jobs.ashbyhq.com/tekion/${id}/application`
}

export async function fetchTekionJobs(keyword = 'software engineer') {
  const URL = process.env.TEKION_URL;
  console.log("fetching tekion job posts...");
  const { data } = await axios.get(URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 10000,
  });

  return data?.jobs?.map(job => ({
    id: `tekion-${job?.id}`,
    company: 'Tekion',
    title: job?.title,
    location: job?.location,
    url: job?.id ? formURL(job?.id || "") : null,
    postedDate: job?.PostedDate,
  }));
}

export default { name: 'tekion', fetch: fetchTekionJobs };
