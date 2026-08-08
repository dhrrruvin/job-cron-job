import axios from 'axios';

async function fetchAmazonJobs(keyword = 'software engineer') {
  const url = process.env.AMZN_URL;
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  return data.jobs.map(job => ({
    id: "",
    company: 'Amazon',
    title: "",
    location: "",
    url: "",
    postedDate: "",
  }));
}

export default { name: 'amazon', fetch: fetchAmazonJobs };
