const CMS_URL = "https://cms.amartuvshin.com";

type FetchOptions = {
  cache?: RequestCache;
  next?: { revalidate?: number };
};

async function fetchCMS<T>(path: string, options?: FetchOptions): Promise<T> {
  const res = await fetch(`${CMS_URL}${path}`, {
    next: { revalidate: 60 },
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

export type ProjectState = "ongoing" | "done" | "planning";

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
  state: ProjectState;
};

export type Project = CMSProject & { image_url: string };

export function enrichProject(p: CMSProject): Project {
  return { ...p, image_url: p.image ? assetUrl(p.image) : "" };
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchCMS<CMSProject[]>(
    "/items/projects?filter[status][_eq]=published&sort=sort"
  );
  return data.map(enrichProject);
}

export type CMSSkill = {
  id: string;
  sort: number;
  name: string;
  category: string;
};

export async function getSkills(): Promise<CMSSkill[]> {
  return fetchCMS<CMSSkill[]>("/items/skills?sort=sort");
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
  return fetchCMS<CMSWorkExperience[]>("/items/work_experiences?sort=sort");
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
  return fetchCMS<CMSEducation[]>("/items/educations?sort=sort");
}

export type CMSActivity = {
  id: string;
  sort: number;
  label: string;
  value: string;
};

export async function getCurrentActivities(): Promise<CMSActivity[]> {
  return fetchCMS<CMSActivity[]>("/items/current_activities?sort=sort");
}

export type CMSSocialLink = {
  id: string;
  sort: number;
  platform: string;
  url: string;
  icon: string;
};

export async function getSocialLinks(): Promise<CMSSocialLink[]> {
  return fetchCMS<CMSSocialLink[]>("/items/social_links?sort=sort");
}

export type CMSNavLink = {
  id: string;
  sort: number;
  label: string;
  href: string;
  external: boolean;
};

export async function getNavigationLinks(): Promise<CMSNavLink[]> {
  return fetchCMS<CMSNavLink[]>("/items/navigation_links?sort=sort");
}

export type CMSStat = {
  id: string;
  sort: number;
  label: string;
  value: string;
};

export async function getStats(): Promise<CMSStat[]> {
  return fetchCMS<CMSStat[]>("/items/stats?sort=sort");
}

export type CMSQA = {
  id: string;
  sort: number;
  question: string;
  answer: string;
  category: string;
};

export async function getChatbotQA(): Promise<CMSQA[]> {
  return fetchCMS<CMSQA[]>("/items/chatbot_qa?sort=sort");
}

export type CMSSiteSettings = {
  site_name: string;
  site_url: string;
  site_title: string;
  site_description: string;
  meta_keywords: string[];
  tagline: string;
  subtitle: string;
  hero_primary_cta: string;
  hero_secondary_cta: string;
  hero_profile_eyebrow: string;
  hero_current_role_label: string;
  projects_eyebrow: string;
  projects_title: string;
  projects_description: string;
  projects_filter_label: string;
  projects_ongoing_label: string;
  projects_ongoing_card_label: string;
  projects_ongoing_empty_label: string;
  projects_done_label: string;
  projects_done_card_label: string;
  projects_done_empty_label: string;
  projects_planning_label: string;
  projects_planning_card_label: string;
  projects_planning_empty_label: string;
  projects_view_cta: string;
  about_eyebrow: string;
  about_title: string;
  about_freelance_label: string;
  about_work_label: string;
  about_education_label: string;
  about_currently_label: string;
  about_github_label: string;
  about_github_repo_label: string;
  about_github_description: string;
  about_tech_stack_label: string;
  contact_availability_label: string;
  contact_title: string;
  contact_description: string;
  contact_email_label: string;
  contact_phone_label: string;
  contact_cta: string;
  footer_note: string;
};

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  return fetchCMS<CMSSiteSettings>("/items/site_settings");
}
