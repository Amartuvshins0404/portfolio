const CMS_URL = "https://cms.amartuvshin.com";

type FetchOptions = {
  cache?: RequestCache;
  next?: { revalidate?: number };
};

async function fetchCMS<T>(path: string, options?: FetchOptions): Promise<T> {
  const res = await fetch(`${CMS_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status} ${path}`);
  const json = await res.json();
  return json.data;
}

function assetUrl(fileId: string): string {
  return `${CMS_URL}/assets/${fileId}`;
}

export type CMSProfile = {
  name: string;
  alternate_names: string[];
  job_title: string;
  company: string;
  company_url: string;
  email: string;
  phone: string;
  location: string;
  bio_short: string;
  bio_paragraphs: string[];
  github_username: string;
  github_repo_count: number;
  available_for_freelance: boolean;
  profile_image: string;
};

export function enrichProfile(p: CMSProfile) {
  return { ...p, profile_image: p.profile_image ? assetUrl(p.profile_image) : "" };
}

export async function getProfile() {
  return enrichProfile(await fetchCMS<CMSProfile>("/items/profile"));
}

export type CMSProject = {
  id: string;
  sort: number;
  status: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  demo_url: string;
  accent: string;
};

export type Project = CMSProject & { image_url: string };

export function enrichProject(p: CMSProject): Project {
  return { ...p, image_url: p.image ? assetUrl(p.image) : "" };
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchCMS<CMSProject[]>("/items/projects");
  return data.map(enrichProject);
}

export type CMSSkill = {
  id: string;
  sort: number;
  name: string;
  category: string;
};

export async function getSkills(): Promise<CMSSkill[]> {
  return fetchCMS<CMSSkill[]>("/items/skills");
}

export type CMSWorkExperience = {
  id: string;
  sort: number;
  role: string;
  company: string;
  company_url: string;
  period: string;
  description: string;
};

export async function getWorkExperiences(): Promise<CMSWorkExperience[]> {
  return fetchCMS<CMSWorkExperience[]>("/items/work_experiences");
}

export type CMSEducation = {
  id: string;
  sort: number;
  degree: string;
  institution: string;
  school: string;
  status: string;
};

export async function getEducations(): Promise<CMSEducation[]> {
  return fetchCMS<CMSEducation[]>("/items/educations");
}

export type CMSActivity = {
  id: string;
  sort: number;
  label: string;
  value: string;
};

export async function getCurrentActivities(): Promise<CMSActivity[]> {
  return fetchCMS<CMSActivity[]>("/items/current_activities");
}

export type CMSSocialLink = {
  id: string;
  sort: number;
  platform: string;
  url: string;
  icon: string;
};

export async function getSocialLinks(): Promise<CMSSocialLink[]> {
  return fetchCMS<CMSSocialLink[]>("/items/social_links");
}

export type CMSNavLink = {
  id: string;
  sort: number;
  label: string;
  href: string;
  external: boolean;
};

export async function getNavigationLinks(): Promise<CMSNavLink[]> {
  return fetchCMS<CMSNavLink[]>("/items/navigation_links");
}

export type CMSStat = {
  id: string;
  sort: number;
  label: string;
  value: string;
};

export async function getStats(): Promise<CMSStat[]> {
  return fetchCMS<CMSStat[]>("/items/stats");
}

export type CMSQA = {
  id: string;
  sort: number;
  question: string;
  answer: string;
  category: string;
};

export async function getChatbotQA(): Promise<CMSQA[]> {
  return fetchCMS<CMSQA[]>("/items/chatbot_qa");
}

export type CMSSiteSettings = {
  site_name: string;
  site_url: string;
  site_title: string;
  site_description: string;
  meta_keywords: string[];
  tagline: string;
  subtitle: string;
};

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  return fetchCMS<CMSSiteSettings>("/items/site_settings");
}
