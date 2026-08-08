import axios from 'axios';

const formURL = (id) => {
  return `https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/jobs/preview/${id}/?lastSelectedFacet=CATEGORIES&selectedCategoriesFacet=300000086152753&selectedPostingDatesFacet=7`
}

export async function fetchJpmcJobs(keyword = 'software engineer') {
  const URL = process.env.JPMC_URL;
  console.log("fetching jpmc job posts...");
  const { data } = await axios.get(URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 10000,
  });

  return data?.items?.[0]?.requisitionList?.map(job => ({
    id: `jpmc-${job?.Id}`,
    company: 'JPMC',
    title: job?.Title,
    location: job?.PrimaryLocationCountry,
    url: job?.Id ? formURL(job?.Id || "") : null,
    postedDate: job?.PostedDate,
  }));
}

export default { name: 'jpmc', fetch: fetchJpmcJobs };
