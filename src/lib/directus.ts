import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';

export type SiteLanguage = 'id' | 'en';

export interface HeroSlideTranslation {
  languages_code?: string | { code?: string; name?: string };
  number?: string;
  headline?: string;
  quote?: string;
  quote_attr?: string;
}

export interface HeroSlide {
  id: number | string;
  number: string;
  headline: string;
  image: string;
  quote: string;
  quote_attr?: string;
  translations?: HeroSlideTranslation[];
}

export interface NavbarContentTranslation {
  languages_code?: string | { code?: string; name?: string };
  text_icon?: string;
  text_sub_icon?: string;
  item_1?: string;
  item_2?: string;
  item_3?: string;
  item_4?: string;
  subitem2_1?: string;
  subitem2_2?: string;
  subitem2_3?: string;
  subitem3_1?: string;
  subitem3_2?: string;
  subitem3_3?: string;
}

export interface NavbarContent extends NavbarContentTranslation {
  id?: number | string;
  translations?: NavbarContentTranslation[];
}

export interface LandingProfileTranslation {
  languages_code?: string | { code?: string; name?: string };
  subtitle?: string;
  main_title?: string;
  highlight_title?: string;
  description_1?: string;
  description_2?: string;
  image_1_alt?: string;
  image_2_alt?: string;
  stat_label?: string;
  signature_text?: string;
  signature_subtext?: string;
  pillars_eyebrow?: string;
  pillars_title?: string;
  pillars_intro?: string;
  pillar_1_name?: string;
  pillar_1_desc?: string;
  pillar_2_name?: string;
  pillar_2_desc?: string;
  pillar_3_name?: string;
  pillar_3_desc?: string;
  pillar_4_name?: string;
  pillar_4_desc?: string;
}

export interface LandingProfileContent extends LandingProfileTranslation {
  id?: number | string;
  status?: 'published' | 'draft';
  image_1?: string;
  image_2?: string;
  stat_number?: string;
  signature_avatar?: string;
  pillar_1_initial?: string;
  pillar_2_initial?: string;
  pillar_3_initial?: string;
  pillar_4_initial?: string;
  translations?: LandingProfileTranslation[];
}

export interface FooterContentTranslation {
  languages_code?: string | { code?: string; name?: string };
  brand_name?: string;
  brand_subtitle?: string;
  tagline?: string;
  about_title?: string;
  about_link_1_label?: string;
  about_link_2_label?: string;
  about_link_3_label?: string;
  program_title?: string;
  program_link_1_label?: string;
  program_link_2_label?: string;
  program_link_3_label?: string;
  contact_title?: string;
  address_text?: string;
  phone_label?: string;
  email_label?: string;
  office_hours_text?: string;
  social_label?: string;
  facebook_label?: string;
  instagram_label?: string;
  twitter_label?: string;
  youtube_label?: string;
  copyright_text?: string;
  privacy_label?: string;
  terms_label?: string;
}

export interface FooterContent extends FooterContentTranslation {
  id?: number | string;
  about_link_1_href?: string;
  about_link_2_href?: string;
  about_link_3_href?: string;
  program_link_1_href?: string;
  program_link_2_href?: string;
  program_link_3_href?: string;
  address_href?: string;
  phone_href?: string;
  email_href?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  privacy_href?: string;
  terms_href?: string;
  translations?: FooterContentTranslation[];
}

export interface AnnouncementContentTranslation {
  languages_code?: string | { code?: string; name?: string };
  title?: string;
  Title?: string;
  subtitle?: string;
  Subtitle?: string;
  quote?: string;
  Quote?: string;
  view_all?: string;
  viewAll?: string;
  View_All?: string;
}

export interface AnnouncementContent extends AnnouncementContentTranslation {
  id?: number | string;
  translations?: AnnouncementContentTranslation[];
  [key: string]: unknown;
}

export interface PreloaderContentTranslation {
  languages_code?: string | { code?: string; name?: string };
  eyebrow?: string;
  title?: string;
  description?: string;
  footer_label?: string;
  loading_label?: string;
  aria_label?: string;
}

export interface PreloaderContent extends PreloaderContentTranslation {
  id?: number | string;
  code_label?: string;
  coordinate_label?: string;
  translations?: PreloaderContentTranslation[];
}

export interface AboutHeaderContent {
  id?: number | string;
  eyebrow?: string;
  Eyebrow?: string;
  title?: string;
  Title?: string;
  subtitle?: string;
  Subtitle?: string;
  desc?: string;
  Desc?: string;
  image?: string | null;
  Image?: string | null;
  image_alt?: string;
  Image_Alt?: string;
  'Image Alt'?: string;
  [key: string]: unknown;
}

export interface AboutProfileTranslation {
  languages_code?: string | { code?: string; name?: string };
  eyebrow?: string;
  Eyebrow?: string;
  title?: string;
  Title?: string;
  stroked?: string;
  Stroked?: string;
  desc_1?: string;
  Desc_1?: string;
  'Desc 1'?: string;
  desc_2?: string;
  Desc_2?: string;
  'Desc 2'?: string;
  image_alt_1?: string;
  Image_Alt_1?: string;
  'Image Alt 1'?: string;
  image_alt_2?: string;
  Image_Alt_2?: string;
  'Image Alt 2'?: string;
  signature_title?: string;
  Signature_Title?: string;
  'Signature Title'?: string;
  signature_subtitle?: string;
  Signature_Subtitle?: string;
  'Signature Subtitle'?: string;
  stat_label?: string;
  Stat_Label?: string;
  'Stat Label'?: string;
  [key: string]: unknown;
}

export interface AboutProfileContent extends AboutProfileTranslation {
  id?: number | string;
  image_1?: string | null;
  Image_1?: string | null;
  'Image 1'?: string | null;
  image_2?: string | null;
  Image_2?: string | null;
  'Image 2'?: string | null;
  signature_initial?: string;
  Signature_Initial?: string;
  'Signature Initial'?: string;
  stat?: string;
  Stat?: string;
  translations?: AboutProfileTranslation[];
}

export interface AboutPillarsTranslation {
  languages_code?: string | { code?: string; name?: string };
  eyebrow?: string;
  Eyebrow?: string;
  title?: string;
  Title?: string;
  intro?: string;
  Intro?: string;
  [key: string]: unknown;
}

export interface AboutPillarsContent extends AboutPillarsTranslation {
  id?: number | string;
  translations?: AboutPillarsTranslation[];
}

export interface AboutVisionTranslation {
  languages_code?: string | { code?: string; name?: string };
  eyebrow?: string;
  title?: string;
  vision_eyebrow?: string;
  vision_quote?: string;
  mission_eyebrow?: string;
  [key: string]: unknown;
}

export interface AboutVisionContent extends AboutVisionTranslation {
  id?: number | string;
  vision_attr?: string;
  translations?: AboutVisionTranslation[];
}

export interface AboutMissionItemTranslation {
  languages_code?: string | { code?: string; name?: string };
  title?: string;
  Title?: string;
  desc?: string;
  Desc?: string;
  [key: string]: unknown;
}

export interface AboutMissionItem extends AboutMissionItemTranslation {
  id?: number | string;
  sort?: number | null;
  translations?: AboutMissionItemTranslation[];
}

export interface OrganizationStructureTranslation {
  languages_code?: string | { code?: string; name?: string };
  eyebrow?: string;
  Eyebrow?: string;
  subeyebrow?: string;
  Subeyebrow?: string;
  title?: string;
  Title?: string;
  subtitle?: string;
  Subtitle?: string;
  label?: string;
  Label?: string;
  [key: string]: unknown;
}

export interface OrganizationStructureContent extends OrganizationStructureTranslation {
  id?: number | string;
  translations?: OrganizationStructureTranslation[];
}

export interface OrganizationStructureItemTranslation {
  languages_code?: string | { code?: string; name?: string };
  code?: string;
  Code?: string;
  name?: string;
  Name?: string;
  desc?: string;
  Desc?: string;
  [key: string]: unknown;
}

export interface OrganizationStructureItem extends OrganizationStructureItemTranslation {
  id?: number | string;
  sort?: number | null;
  icon?: string | null;
  Icon?: string | null;
  initial?: string;
  Initial?: string;
  translations?: OrganizationStructureItemTranslation[];
}

export interface SocialProgramTranslation {
  languages_code?: string | { code?: string; name?: string };
  title?: string;
  Title?: string;
  subtitle?: string;
  Subtitle?: string;
  image_alt?: string;
  Image_Alt?: string;
  category?: string;
  Category?: string;
  program_eyebrow?: string;
  Program_Eyebrow?: string;
  program_title?: string;
  Program_Title?: string;
  program_desc?: string;
  Program_Desc?: string;
  stat_label?: string;
  Stat_Label?: string;
  [key: string]: unknown;
}

export interface SocialProgramBulletTranslation {
  languages_code?: string | { code?: string; name?: string };
  text?: string;
  Text?: string;
  [key: string]: unknown;
}

export interface SocialProgramBullet extends SocialProgramBulletTranslation {
  id?: number | string;
  sort?: number | null;
  translations?: SocialProgramBulletTranslation[];
}

export interface SocialProgramItemTranslation {
  languages_code?: string | { code?: string; name?: string };
  icon?: string;
  Icon?: string;
  title?: string;
  Title?: string;
  desc?: string;
  Desc?: string;
  image_alt?: string;
  Image_Alt?: string;
  [key: string]: unknown;
}

export interface SocialProgramItem extends SocialProgramItemTranslation {
  id?: number | string;
  sort?: number | null;
  image?: string | null;
  Image?: string | null;
  translations?: SocialProgramItemTranslation[];
}

export interface SocialProgramContent extends SocialProgramTranslation {
  id?: number | string;
  image?: string | null;
  Image?: string | null;
  stat_num?: string;
  Stat_Num?: string;
  program_bullets?: SocialProgramBullet[];
  list_program?: SocialProgramItem[];
  translations?: SocialProgramTranslation[];
}

export interface AboutPillarItemTranslation {
  languages_code?: string | { code?: string; name?: string };
  name?: string;
  Name?: string;
  desc?: string;
  Desc?: string;
  [key: string]: unknown;
}

export interface AboutPillarItem extends AboutPillarItemTranslation {
  id?: number | string;
  sort?: number | null;
  initial?: string;
  Initial?: string;
  translations?: AboutPillarItemTranslation[];
}

export interface NewsItemTranslation {
  languages_code?: string | { code?: string; name?: string };
  category?: string;
  judul?: string;
  excerpt?: string;
  isi?: string;
  image_alt?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface NewsItem extends NewsItemTranslation {
  id?: number | string;
  status?: 'draft' | 'published' | 'archived' | string;
  sort?: number | null;
  slug?: string;
  category: string;
  judul: string;
  excerpt: string;
  isi?: string;
  thumbnail?: string | null;
  url_thumbnail?: string;
  image_alt?: string;
  author?: string;
  published_at?: string;
  date_created?: string;
  is_featured?: boolean;
  show_on_home?: boolean;
  home_sort?: number | null;
  reading_time?: number | null;
  meta_title?: string;
  meta_description?: string;
  translations?: NewsItemTranslation[];
}

function normalizeEnvValue(value: unknown): string {
  let normalized = (value ?? '').toString().trim();

  for (let i = 0; i < 3; i += 1) {
    normalized = normalized
      .trim()
      .replace(/^\\+(['"])/, '$1')
      .replace(/\\+(['"])$/, '$1');

    if (
      (normalized.startsWith("'") && normalized.endsWith("'")) ||
      (normalized.startsWith('"') && normalized.endsWith('"'))
    ) {
      normalized = normalized.slice(1, -1);
      continue;
    }

    break;
  }

  return normalized.trim();
}

const DIRECTUS_URL = normalizeEnvValue(import.meta.env.DIRECTUS_URL).replace(
  /\/+$/,
  ''
);
const DIRECTUS_TOKEN = normalizeEnvValue(import.meta.env.DIRECTUS_TOKEN);

export const isDirectusConfigured = DIRECTUS_URL.length > 0;

let _client: any = null;

function getClient(): any {
  if (!isDirectusConfigured) return null;
  if (!_client) {
    let c: any = createDirectus(DIRECTUS_URL).with(rest());
    if (DIRECTUS_TOKEN) c = c.with(staticToken(DIRECTUS_TOKEN));
    _client = c;
  }
  return _client;
}

export function directusAssetUrl(asset: string | null | undefined): string {
  if (!asset) return '';
  if (/^(https?:|data:)/i.test(asset)) return asset;
  if (!isDirectusConfigured) return asset;
  return `${DIRECTUS_URL}/assets/${asset}`;
}

export function directusAdminUrl(
  collection: string,
  id: number | string
): string {
  if (!isDirectusConfigured) return '';
  return `${DIRECTUS_URL}/admin/content/${collection}/${id}`;
}

let _healthCache: { value: boolean; expires: number } | null = null;
export async function isDirectusHealthy(): Promise<boolean> {
  if (!isDirectusConfigured) return false;
  if (_healthCache && Date.now() < _healthCache.expires)
    return _healthCache.value;

  try {
    const res = await fetch(`${DIRECTUS_URL}/server/health`, {
      signal: AbortSignal.timeout(5000),
    });
    const ok = res.ok;
    _healthCache = { value: ok, expires: Date.now() + 30_000 };
    return ok;
  } catch {
    _healthCache = { value: false, expires: Date.now() + 30_000 };
    return false;
  }
}

const CACHE_TTL_MS = 30_000;
const _cache = new Map<string, { value: unknown; expires: number }>();

function cacheGet<T>(key: string): T | null {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    _cache.delete(key);
    return null;
  }
  return entry.value as T;
}

function cacheSet(key: string, value: unknown, ttlMs = CACHE_TTL_MS) {
  _cache.set(key, { value, expires: Date.now() + ttlMs });
}

export function normalizeSiteLanguage(language?: string | null): SiteLanguage {
  return language === 'en' ? 'en' : 'id';
}

function getTranslationLanguageCodes(language: SiteLanguage): string[] {
  return language === 'en'
    ? ['en', 'en-US', 'en_US']
    : ['id', 'id-ID', 'id_ID'];
}

function getTranslationCode(translation: {
  languages_code?: string | { code?: string; name?: string };
}): string {
  const raw = translation.languages_code;
  if (!raw) return '';
  return typeof raw === 'string' ? raw : (raw.code ?? '');
}

export function getCategoryLabel(
  category: string | null | undefined,
  language: SiteLanguage = 'id'
): string {
  const normalizedCategory = (category ?? '').toLowerCase();
  const labels: Record<string, Record<SiteLanguage, string>> = {
    berita: { id: 'Berita', en: 'News' },
    pengumuman: { id: 'Pengumuman', en: 'Announcement' },
    kegiatan: { id: 'Kegiatan', en: 'Activity' },
  };

  return (
    labels[normalizedCategory]?.[normalizeSiteLanguage(language)] ??
    category ??
    ''
  );
}

function applyHeroSlideTranslation(
  slide: HeroSlide,
  language: SiteLanguage
): HeroSlide {
  if (language === 'id' || !Array.isArray(slide.translations)) return slide;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = slide.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return slide;

  return {
    ...slide,
    number: translation.number || slide.number,
    headline: translation.headline || slide.headline,
    quote: translation.quote || slide.quote,
    quote_attr: translation.quote_attr || slide.quote_attr,
  };
}

function applyNavbarTranslation(
  content: NavbarContent,
  language: SiteLanguage
): NavbarContent {
  if (language === 'id' || !Array.isArray(content.translations)) return content;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return content;

  return {
    ...content,
    text_icon: translation.text_icon || content.text_icon,
    text_sub_icon: translation.text_sub_icon || content.text_sub_icon,
    item_1: translation.item_1 || content.item_1,
    item_2: translation.item_2 || content.item_2,
    item_3: translation.item_3 || content.item_3,
    item_4: translation.item_4 || content.item_4,
    subitem2_1: translation.subitem2_1 || content.subitem2_1,
    subitem2_2: translation.subitem2_2 || content.subitem2_2,
    subitem2_3: translation.subitem2_3 || content.subitem2_3,
    subitem3_1: translation.subitem3_1 || content.subitem3_1,
    subitem3_2: translation.subitem3_2 || content.subitem3_2,
    subitem3_3: translation.subitem3_3 || content.subitem3_3,
  };
}

export const FALLBACK_NAVBAR_CONTENT: NavbarContent & {
  translations: NavbarContentTranslation[];
} = {
  id: 1,
  text_icon: 'Journal Ocean',
  text_sub_icon: 'Jurnal',
  item_1: 'Home',
  item_2: 'Tentang Kami',
  item_3: 'Program',
  item_4: 'Berita',
  subitem2_1: 'Profil',
  subitem2_2: 'Visi & Misi',
  subitem2_3: 'Struktur Organisasi',
  subitem3_1: 'Program Sosial',
  subitem3_2: 'Program Kemanusiaan',
  subitem3_3: 'Program Keagamaan',
  translations: [
    {
      languages_code: 'en-US',
      text_icon: 'Journal Ocean',
      text_sub_icon: 'Journal',
      item_1: 'Home',
      item_2: 'About Us',
      item_3: 'Programs',
      item_4: 'News',
      subitem2_1: 'Profile',
      subitem2_2: 'Vision & Missions',
      subitem2_3: 'Organization Structure',
      subitem3_1: 'Social Program',
      subitem3_2: 'Humanitarian Program',
      subitem3_3: 'Religious Program',
    },
  ],
};

export async function getNavbarContent(
  language: SiteLanguage = 'id'
): Promise<NavbarContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `navbar:v1:${normalizedLanguage}`;
  const cached = cacheGet<NavbarContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty navbar');
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('navbar', {
        fields: ['*', 'translations.*'],
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyNavbarTranslation(
      content as NavbarContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getNavbarContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getNavbarContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<NavbarContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getNavbarContent(normalizedLanguage);
  if (fromCms) return fromCms;
  return applyNavbarTranslation(FALLBACK_NAVBAR_CONTENT, normalizedLanguage);
}

function getAnnouncementField(
  content: AnnouncementContent | AnnouncementContentTranslation,
  keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = content[key as keyof typeof content];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return undefined;
}

function applyAnnouncementTranslation(
  content: AnnouncementContent,
  language: SiteLanguage
): AnnouncementContent {
  const base: AnnouncementContent = {
    ...content,
    title: getAnnouncementField(content, ['title', 'Title']),
    subtitle: getAnnouncementField(content, ['subtitle', 'Subtitle']),
    quote: getAnnouncementField(content, ['quote', 'Quote']),
    view_all: getAnnouncementField(content, [
      'view_all',
      'viewAll',
      'View_All',
      'View All',
    ]),
  };

  if (language === 'id' || !Array.isArray(content.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return base;

  return {
    ...base,
    title: getAnnouncementField(translation, ['title', 'Title']) || base.title,
    subtitle:
      getAnnouncementField(translation, ['subtitle', 'Subtitle']) ||
      base.subtitle,
    quote: getAnnouncementField(translation, ['quote', 'Quote']) || base.quote,
    view_all:
      getAnnouncementField(translation, [
        'view_all',
        'viewAll',
        'View_All',
        'View All',
      ]) || base.view_all,
  };
}

export const FALLBACK_ANNOUNCEMENT_CONTENT: AnnouncementContent = {
  id: 1,
  title: 'Berita & Pengumuman',
  subtitle: 'Kabar terbaru dari Journal Ocean.',
  quote: '"Cerita-cerita kecil yang membentuk dampak yang lebih besar."',
  view_all: 'Lihat Semua Berita',
};

export async function getAnnouncementContent(
  language: SiteLanguage = 'id'
): Promise<AnnouncementContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `announcement:v1:${normalizedLanguage}`;
  const cached = cacheGet<AnnouncementContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn(
      '[directus] DIRECTUS_URL not set, returning empty announcement'
    );
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('announcement', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyAnnouncementTranslation(
      content as AnnouncementContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAnnouncementContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getAnnouncementContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<AnnouncementContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getAnnouncementContent(normalizedLanguage);
  if (fromCms) return fromCms;
  return FALLBACK_ANNOUNCEMENT_CONTENT;
}

function applyPreloaderTranslation(
  content: PreloaderContent,
  language: SiteLanguage
): PreloaderContent {
  if (language === 'id' || !Array.isArray(content.translations)) return content;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return content;

  return {
    ...content,
    eyebrow: translation.eyebrow || content.eyebrow,
    title: translation.title || content.title,
    description: translation.description || content.description,
    footer_label: translation.footer_label || content.footer_label,
    loading_label: translation.loading_label || content.loading_label,
    aria_label: translation.aria_label || content.aria_label,
  };
}

export const FALLBACK_PRELOADER_CONTENT: PreloaderContent = {
  id: 1,
  code_label: 'JOC',
  coordinate_label: '06°N · 95°E',
  eyebrow: 'Journal Ocean Dispatch',
  title: 'Menyiapkan jurnal kebaikan.',
  description:
    'Merapikan kabar, program, dan cerita komunitas sebelum halaman dibuka.',
  footer_label: 'Warm Sage & Sand',
  loading_label: 'Loading',
  aria_label: 'Memuat halaman Journal Ocean',
};

export async function getPreloaderContent(
  language: SiteLanguage = 'id'
): Promise<PreloaderContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `preloader:v1:${normalizedLanguage}`;
  const cached = cacheGet<PreloaderContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty preloader');
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('preloader', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyPreloaderTranslation(
      content as PreloaderContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getPreloaderContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getPreloaderContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<PreloaderContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getPreloaderContent(normalizedLanguage);
  return {
    ...FALLBACK_PRELOADER_CONTENT,
    ...fromCms,
  };
}

function getStringField(
  content: Record<string, unknown>,
  keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = content[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return undefined;
}

function normalizeAboutHeaderContent(
  content: AboutHeaderContent
): AboutHeaderContent {
  return {
    ...content,
    eyebrow: getStringField(content, ['eyebrow', 'Eyebrow']),
    title: getStringField(content, ['title', 'Title']),
    subtitle: getStringField(content, ['subtitle', 'Subtitle']),
    desc: getStringField(content, ['desc', 'Desc']),
    image: (content.image ?? content.Image ?? null) as string | null,
    image_alt: getStringField(content, ['image_alt', 'Image_Alt', 'Image Alt']),
  };
}

export const FALLBACK_ABOUT_HEADER_CONTENT: AboutHeaderContent = {
  id: 1,
  eyebrow: 'Tentang Journal Ocean',
  title: 'Journal Ocean',
  subtitle: 'Membangun Peradaban Melalui Integrasi Ilmu dan Wahyu',
  desc: 'Lembaga sosial-keagamaan dan pendidikan yang berkomitmen untuk berperan aktif dalam pengembangan peradaban melalui penguatan pendidikan, penelitian, dan pengabdian kepada masyarakat.',
  image:
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop',
  image_alt: 'Journal Ocean',
};

export async function getAboutHeaderContent(): Promise<AboutHeaderContent | null> {
  const cacheKey = 'about-header:v1';
  const cached = cacheGet<AboutHeaderContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn(
      '[directus] DIRECTUS_URL not set, returning empty about header'
    );
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('about_header', {
        fields: ['*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = normalizeAboutHeaderContent(content as AboutHeaderContent);
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      '[directus] getAboutHeaderContent failed:',
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getAboutHeaderContentWithFallback(): Promise<AboutHeaderContent> {
  const fromCms = await getAboutHeaderContent();
  return {
    ...FALLBACK_ABOUT_HEADER_CONTENT,
    ...fromCms,
    image: directusAssetUrl(
      fromCms?.image ?? FALLBACK_ABOUT_HEADER_CONTENT.image
    ),
  };
}

function normalizeAboutProfileContent(
  content: AboutProfileContent
): AboutProfileContent {
  return {
    ...content,
    eyebrow: getStringField(content, ['eyebrow', 'Eyebrow']),
    title: getStringField(content, ['title', 'Title']),
    stroked: getStringField(content, ['stroked', 'Stroked']),
    desc_1: getStringField(content, ['desc_1', 'Desc_1', 'Desc 1']),
    desc_2: getStringField(content, ['desc_2', 'Desc_2', 'Desc 2']),
    image_1: (content.image_1 ??
      content.Image_1 ??
      content['Image 1'] ??
      null) as string | null,
    image_alt_1: getStringField(content, [
      'image_alt_1',
      'Image_Alt_1',
      'Image Alt 1',
    ]),
    image_2: (content.image_2 ??
      content.Image_2 ??
      content['Image 2'] ??
      null) as string | null,
    image_alt_2: getStringField(content, [
      'image_alt_2',
      'Image_Alt_2',
      'Image Alt 2',
    ]),
    signature_initial: getStringField(content, [
      'signature_initial',
      'Signature_Initial',
      'Signature Initial',
    ]),
    signature_title: getStringField(content, [
      'signature_title',
      'Signature_Title',
      'Signature Title',
    ]),
    signature_subtitle: getStringField(content, [
      'signature_subtitle',
      'Signature_Subtitle',
      'Signature Subtitle',
    ]),
    stat: getStringField(content, ['stat', 'Stat']),
    stat_label: getStringField(content, [
      'stat_label',
      'Stat_Label',
      'Stat Label',
    ]),
  };
}

function applyAboutProfileTranslation(
  content: AboutProfileContent,
  language: SiteLanguage
): AboutProfileContent {
  const base = normalizeAboutProfileContent(content);
  if (language === 'id' || !Array.isArray(content.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );
  if (!translation) return base;

  const translated = normalizeAboutProfileContent(
    translation as AboutProfileContent
  );
  return {
    ...base,
    eyebrow: translated.eyebrow || base.eyebrow,
    title: translated.title || base.title,
    stroked: translated.stroked || base.stroked,
    desc_1: translated.desc_1 || base.desc_1,
    desc_2: translated.desc_2 || base.desc_2,
    image_alt_1: translated.image_alt_1 || base.image_alt_1,
    image_alt_2: translated.image_alt_2 || base.image_alt_2,
    signature_title: translated.signature_title || base.signature_title,
    signature_subtitle:
      translated.signature_subtitle || base.signature_subtitle,
    stat_label: translated.stat_label || base.stat_label,
  };
}

export const FALLBACK_ABOUT_PROFILE_CONTENT: AboutProfileContent = {
  id: 1,
  eyebrow: 'Profil Lengkap',
  title: 'Selamat datang di',
  stroked: 'Journal Ocean',
  desc_1:
    "Journal Ocean didirikan atas kesadaran bahwa kemajuan umat dan bangsa harus dibangun di atas fondasi ilmu pengetahuan yang kokoh, berlandaskan nilai-nilai ilahiah yang bersumber dari Al-Qur'an dan Hadis Nabi Muhammad.",
  desc_2:
    'Dalam menjalankan kiprahnya, organisasi mengintegrasikan ilmu pengetahuan kontemporer dengan khazanah keilmuan Islam secara harmonis dan berkelanjutan. Pendekatan integratif ini diarahkan untuk melahirkan insan berilmu, berakhlak mulia, serta memiliki kemampuan adaptif terhadap dinamika perkembangan zaman, tanpa kehilangan jati diri keislamannya.',
  image_1:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop',
  image_alt_1: 'image_profile_1',
  image_2:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
  image_alt_2: 'image_profile_2',
  signature_initial: 'J',
  signature_title: 'Para pendiri Journal Ocean',
  signature_subtitle: 'Bersama Membangun Kebaikan',
  stat: '12+',
  stat_label: 'Tahun Pengabdian',
};

export async function getAboutProfileContent(
  language: SiteLanguage = 'id'
): Promise<AboutProfileContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `about-profile:v1:${normalizedLanguage}`;
  const cached = cacheGet<AboutProfileContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn(
      '[directus] DIRECTUS_URL not set, returning empty about profile'
    );
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('about_profile', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyAboutProfileTranslation(
      content as AboutProfileContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAboutProfileContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getAboutProfileContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<AboutProfileContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getAboutProfileContent(normalizedLanguage);
  return {
    ...FALLBACK_ABOUT_PROFILE_CONTENT,
    ...fromCms,
    image_1: directusAssetUrl(
      fromCms?.image_1 ?? FALLBACK_ABOUT_PROFILE_CONTENT.image_1
    ),
    image_2: directusAssetUrl(
      fromCms?.image_2 ?? FALLBACK_ABOUT_PROFILE_CONTENT.image_2
    ),
  };
}

function normalizeSocialProgramContent(
  content: SocialProgramContent
): SocialProgramContent {
  return {
    ...content,
    title: getStringField(content, ['title', 'Title']),
    subtitle: getStringField(content, ['subtitle', 'Subtitle']),
    image: (content.image ?? content.Image ?? null) as string | null,
    image_alt: getStringField(content, ['image_alt', 'Image_Alt']),
    category: getStringField(content, ['category', 'Category']),
    program_eyebrow: getStringField(content, [
      'program_eyebrow',
      'Program_Eyebrow',
    ]),
    program_title: getStringField(content, ['program_title', 'Program_Title']),
    program_desc: getStringField(content, ['program_desc', 'Program_Desc']),
    stat_num: getStringField(content, ['stat_num', 'Stat_Num']),
    stat_label: getStringField(content, ['stat_label', 'Stat_Label']),
    program_bullets: Array.isArray(content.program_bullets)
      ? content.program_bullets
      : [],
    list_program: Array.isArray(content.list_program)
      ? content.list_program
      : [],
  };
}

function normalizeSocialProgramBullet(
  item: SocialProgramBullet
): SocialProgramBullet {
  return {
    ...item,
    text: getStringField(item, ['text', 'Text']),
  };
}

function normalizeSocialProgramItem(
  item: SocialProgramItem
): SocialProgramItem {
  return {
    ...item,
    icon: getStringField(item, ['icon', 'Icon']),
    title: getStringField(item, ['title', 'Title']),
    desc: getStringField(item, ['desc', 'Desc']),
    image: (item.image ?? item.Image ?? null) as string | null,
    image_alt: getStringField(item, ['image_alt', 'Image_Alt']),
  };
}

function applySocialProgramBulletTranslation(
  item: SocialProgramBullet,
  language: SiteLanguage
): SocialProgramBullet {
  const base = normalizeSocialProgramBullet(item);
  if (language === 'id' || !Array.isArray(item.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeSocialProgramBullet(
    translation as SocialProgramBullet
  );
  return {
    ...base,
    text: translated.text || base.text,
  };
}

function applySocialProgramItemTranslation(
  item: SocialProgramItem,
  language: SiteLanguage
): SocialProgramItem {
  const base = normalizeSocialProgramItem(item);
  if (language === 'id' || !Array.isArray(item.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeSocialProgramItem(
    translation as SocialProgramItem
  );
  return {
    ...base,
    icon: translated.icon || base.icon,
    title: translated.title || base.title,
    desc: translated.desc || base.desc,
    image_alt: translated.image_alt || base.image_alt,
  };
}

function applySocialProgramTranslation(
  content: SocialProgramContent,
  language: SiteLanguage
): SocialProgramContent {
  const base = normalizeSocialProgramContent(content);
  if (language === 'id' || !Array.isArray(content.translations)) {
    return {
      ...base,
      program_bullets: (base.program_bullets ?? []).map((item) =>
        normalizeSocialProgramBullet(item)
      ),
      list_program: (base.list_program ?? []).map((item) =>
        normalizeSocialProgramItem(item)
      ),
    };
  }

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );

  const translated = translation
    ? normalizeSocialProgramContent(translation as SocialProgramContent)
    : null;

  return {
    ...base,
    title: translated?.title || base.title,
    subtitle: translated?.subtitle || base.subtitle,
    image_alt: translated?.image_alt || base.image_alt,
    category: translated?.category || base.category,
    program_eyebrow: translated?.program_eyebrow || base.program_eyebrow,
    program_title: translated?.program_title || base.program_title,
    program_desc: translated?.program_desc || base.program_desc,
    stat_label: translated?.stat_label || base.stat_label,
    program_bullets: (base.program_bullets ?? [])
      .map((item) => applySocialProgramBulletTranslation(item, language))
      .filter((item) => item.text),
    list_program: (base.list_program ?? [])
      .map((item) => applySocialProgramItemTranslation(item, language))
      .filter((item) => item.title && item.desc),
  };
}

export const FALLBACK_SOCIAL_PROGRAM_CONTENT: SocialProgramContent = {
  id: 1,
  title: 'Program Sosial <em>Journal Ocean</em>.',
  subtitle:
    'Program-program sosial yang bertujuan untuk membantu dan memberdayakan masyarakat yang membutuhkan.',
  image:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
  image_alt: 'Program Beasiswa Journal Ocean',
  category: 'Program Sosial',
  program_eyebrow: 'Program Unggulan',
  program_title: 'Program Beasiswa',
  program_desc:
    'Memberikan beasiswa untuk siswa berprestasi dan keluarga kurang mampu untuk melanjutkan pendidikan ke jenjang yang lebih tinggi. Program ini bertujuan untuk memberikan kesempatan pendidikan yang lebih baik bagi generasi penerus bangsa.',
  stat_num: '150+',
  stat_label: 'Penerima Beasiswa',
  program_bullets: [
    {
      id: 1,
      sort: 1,
      text: 'Beasiswa untuk SD, SMP, SMA, dan Perguruan Tinggi',
    },
    {
      id: 2,
      sort: 2,
      text: 'Bantuan biaya pendidikan dan kebutuhan sekolah',
    },
    {
      id: 3,
      sort: 3,
      text: 'Pendampingan dan mentoring untuk penerima beasiswa',
    },
  ],
  list_program: [
    {
      id: 1,
      sort: 1,
      icon: 'H',
      title: 'Bantuan Sosial',
      desc: 'Penyaluran bantuan sosial berupa sembako, pakaian, dan kebutuhan pokok lainnya untuk keluarga yang membutuhkan.',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      image_alt: 'Bantuan Sosial',
    },
    {
      id: 2,
      sort: 2,
      icon: 'P',
      title: 'Pelatihan Keterampilan',
      desc: 'Program pelatihan keterampilan untuk meningkatkan kemampuan dan peluang ekonomi masyarakat, termasuk kerajinan, pertanian, dan wirausaha.',
      image:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
      image_alt: 'Pelatihan Keterampilan',
    },
    {
      id: 3,
      sort: 3,
      icon: 'K',
      title: 'Bantuan Kesehatan',
      desc: 'Program bantuan kesehatan gratis berupa pemeriksaan kesehatan, pengobatan, dan penyuluhan kesehatan untuk masyarakat.',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      image_alt: 'Bantuan Kesehatan',
    },
    {
      id: 4,
      sort: 4,
      icon: 'E',
      title: 'Pemberdayaan Perempuan',
      desc: 'Program khusus untuk memberdayakan perempuan melalui pelatihan, pendampingan, dan dukungan untuk meningkatkan kualitas hidup.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
      image_alt: 'Pemberdayaan Perempuan',
    },
    {
      id: 5,
      sort: 5,
      icon: 'L',
      title: 'Bantuan Lansia',
      desc: 'Program bantuan khusus untuk lansia berupa kebutuhan pokok, kesehatan, dan kegiatan sosial untuk meningkatkan kesejahteraan mereka.',
      image:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop',
      image_alt: 'Bantuan Lansia',
    },
    {
      id: 6,
      sort: 6,
      icon: 'M',
      title: 'Pemberdayaan Masyarakat',
      desc: 'Program komprehensif untuk memberdayakan masyarakat melalui berbagai kegiatan sosial, ekonomi, dan pendidikan yang terintegrasi.',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      image_alt: 'Pemberdayaan Masyarakat',
    },
  ],
};

export async function getSocialProgramContent(
  language: SiteLanguage = 'id'
): Promise<SocialProgramContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `social-program:v1:${normalizedLanguage}`;
  const cached = cacheGet<SocialProgramContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) return null;

  try {
    const item = await client.request(
      (readItems as any)('social_program', {
        fields: [
          '*',
          'translations.*',
          'program_bullets.*',
          'program_bullets.translations.*',
          'list_program.*',
          'list_program.translations.*',
        ],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applySocialProgramTranslation(
      content as SocialProgramContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getSocialProgramContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getSocialProgramContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<SocialProgramContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getSocialProgramContent(normalizedLanguage);
  const merged = {
    ...FALLBACK_SOCIAL_PROGRAM_CONTENT,
    ...fromCms,
  } as SocialProgramContent;

  return {
    ...merged,
    image: directusAssetUrl(
      merged.image ?? FALLBACK_SOCIAL_PROGRAM_CONTENT.image
    ),
    program_bullets:
      merged.program_bullets && merged.program_bullets.length > 0
        ? merged.program_bullets
        : FALLBACK_SOCIAL_PROGRAM_CONTENT.program_bullets,
    list_program:
      merged.list_program && merged.list_program.length > 0
        ? merged.list_program.map((item) => ({
            ...item,
            image: directusAssetUrl(item.image),
          }))
        : (FALLBACK_SOCIAL_PROGRAM_CONTENT.list_program ?? []).map((item) => ({
            ...item,
            image: directusAssetUrl(item.image),
          })),
  };
}

function normalizeAboutPillarsContent(
  content: AboutPillarsContent
): AboutPillarsContent {
  return {
    ...content,
    eyebrow: getStringField(content, ['eyebrow', 'Eyebrow']),
    title: getStringField(content, ['title', 'Title']),
    intro: getStringField(content, ['intro', 'Intro']),
  };
}

function applyAboutPillarsTranslation(
  content: AboutPillarsContent,
  language: SiteLanguage
): AboutPillarsContent {
  const base = normalizeAboutPillarsContent(content);
  if (language === 'id' || !Array.isArray(content.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );
  if (!translation) return base;

  const translated = normalizeAboutPillarsContent(
    translation as AboutPillarsContent
  );
  return {
    ...base,
    eyebrow: translated.eyebrow || base.eyebrow,
    title: translated.title || base.title,
    intro: translated.intro || base.intro,
  };
}

function normalizeAboutPillarItem(item: AboutPillarItem): AboutPillarItem {
  return {
    ...item,
    initial: getStringField(item, ['initial', 'Initial']),
    name: getStringField(item, ['name', 'Name']),
    desc: getStringField(item, ['desc', 'Desc']),
  };
}

function applyAboutPillarItemTranslation(
  item: AboutPillarItem,
  language: SiteLanguage
): AboutPillarItem {
  const base = normalizeAboutPillarItem(item);
  if (language === 'id' || !Array.isArray(item.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((translationItem) =>
    languageCodes.includes(getTranslationCode(translationItem))
  );
  if (!translation) return base;

  const translated = normalizeAboutPillarItem(translation as AboutPillarItem);
  return {
    ...base,
    name: translated.name || base.name,
    desc: translated.desc || base.desc,
  };
}

export const FALLBACK_ABOUT_PILLARS_CONTENT: AboutPillarsContent = {
  id: 1,
  eyebrow: 'Arah Pengembangan',
  title: 'Tiga pilar <em>utama</em> pengembangan.',
  intro:
    'Komitmen kami dalam membangun peradaban yang unggul melalui tiga pilar utama yang saling terintegrasi.',
};

export const FALLBACK_ABOUT_PILLAR_ITEMS: AboutPillarItem[] = [
  {
    id: 1,
    initial: 'P',
    name: 'Pendidikan',
    desc: 'Menyelenggarakan pendidikan yang menekankan keseimbangan antara kecerdasan intelektual, spiritual, emosional, dan sosial dengan budaya berpikir kritis dan inovatif.',
  },
  {
    id: 2,
    initial: 'R',
    name: 'Penelitian',
    desc: 'Mendorong riset yang berorientasi pada pemecahan masalah umat dengan memadukan pendekatan ilmiah modern dan perspektif keislaman untuk pembangunan berkelanjutan.',
  },
  {
    id: 3,
    initial: 'M',
    name: 'Pengabdian',
    desc: "Menghadirkan solusi dan pemberdayaan berbasis nilai-nilai Islam melalui pendidikan, pendampingan, dan penguatan nilai keagamaan yang rahmatan lil 'alamin.",
  },
];

export async function getAboutPillarsContent(
  language: SiteLanguage = 'id'
): Promise<AboutPillarsContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `about-pillars:v1:${normalizedLanguage}`;
  const cached = cacheGet<AboutPillarsContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn(
      '[directus] DIRECTUS_URL not set, returning empty about pillars'
    );
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('about_pillars', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyAboutPillarsTranslation(
      content as AboutPillarsContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAboutPillarsContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getAboutPillarsContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<AboutPillarsContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getAboutPillarsContent(normalizedLanguage);
  return {
    ...FALLBACK_ABOUT_PILLARS_CONTENT,
    ...fromCms,
  };
}

function normalizeAboutVisionContent(
  content: AboutVisionContent
): AboutVisionContent {
  return {
    ...content,
    eyebrow: getStringField(content, ['eyebrow', 'Eyebrow']),
    title: getStringField(content, ['title', 'Title']),
    vision_eyebrow: getStringField(content, [
      'vision_eyebrow',
      'Vision_Eyebrow',
      'Vision Eyebrow',
    ]),
    vision_quote: getStringField(content, [
      'vision_quote',
      'Vision_Quote',
      'Vision Quote',
    ]),
    vision_attr: getStringField(content, [
      'vision_attr',
      'Vision_Attr',
      'Vision Attr',
    ]),
    mission_eyebrow: getStringField(content, [
      'mission_eyebrow',
      'Mission_Eyebrow',
      'Mission Eyebrow',
      'mision_eyebrow',
      'Mision_Eyebrow',
      'Mision Eyebrow',
    ]),
  };
}

function applyAboutVisionTranslation(
  content: AboutVisionContent,
  language: SiteLanguage
): AboutVisionContent {
  const base = normalizeAboutVisionContent(content);
  if (language === 'id' || !Array.isArray(content.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeAboutVisionContent(
    translation as AboutVisionContent
  );
  return {
    ...base,
    eyebrow: translated.eyebrow || base.eyebrow,
    title: translated.title || base.title,
    vision_eyebrow: translated.vision_eyebrow || base.vision_eyebrow,
    vision_quote: translated.vision_quote || base.vision_quote,
    mission_eyebrow: translated.mission_eyebrow || base.mission_eyebrow,
  };
}

export const FALLBACK_ABOUT_VISION_CONTENT: AboutVisionContent = {
  id: 1,
  eyebrow: 'Visi & Misi',
  title: 'Arah dan <em>tujuan</em> pengembangan peradaban.',
  vision_eyebrow: 'Visi',
  vision_quote:
    "Menjadi organisasi unggulan dalam pengembangan pendidikan, penelitian, dan pengabdian kepada masyarakat yang berlandaskan integrasi ilmu pengetahuan kontemporer dengan Al-Qur'an dan Hadis untuk membangun peradaban yang beriman, berilmu, dan berakhlak mulia.",
  vision_attr: 'Journal Ocean',
  mission_eyebrow: 'Misi',
};

export async function getAboutVisionContent(
  language: SiteLanguage = 'id'
): Promise<AboutVisionContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `about-vision:v1:${normalizedLanguage}`;
  const cached = cacheGet<AboutVisionContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) return null;

  try {
    const item = await client.request(
      (readItems as any)('about_vision', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyAboutVisionTranslation(
      content as AboutVisionContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAboutVisionContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getAboutVisionContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<AboutVisionContent> {
  const fromCms = await getAboutVisionContent(language);
  return {
    ...FALLBACK_ABOUT_VISION_CONTENT,
    ...fromCms,
  };
}

function normalizeOrganizationStructureContent(
  content: OrganizationStructureContent
): OrganizationStructureContent {
  return {
    ...content,
    eyebrow: getStringField(content, ['eyebrow', 'Eyebrow']),
    subeyebrow: getStringField(content, ['subeyebrow', 'Subeyebrow']),
    title: getStringField(content, ['title', 'Title']),
    subtitle: getStringField(content, ['subtitle', 'Subtitle']),
    label: getStringField(content, ['label', 'Label']),
  };
}

function applyOrganizationStructureTranslation(
  content: OrganizationStructureContent,
  language: SiteLanguage
): OrganizationStructureContent {
  const base = normalizeOrganizationStructureContent(content);
  if (language === 'id' || !Array.isArray(content.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeOrganizationStructureContent(
    translation as OrganizationStructureContent
  );
  return {
    ...base,
    eyebrow: translated.eyebrow || base.eyebrow,
    subeyebrow: translated.subeyebrow || base.subeyebrow,
    title: translated.title || base.title,
    subtitle: translated.subtitle || base.subtitle,
    label: translated.label || base.label,
  };
}

function normalizeOrganizationStructureItem(
  item: OrganizationStructureItem
): OrganizationStructureItem {
  return {
    ...item,
    icon: (item.icon ?? item.Icon ?? null) as string | null,
    initial: getStringField(item, ['initial', 'Initial']),
    code: getStringField(item, ['code', 'Code']),
    name: getStringField(item, ['name', 'Name']),
    desc: getStringField(item, ['desc', 'Desc']),
  };
}

function applyOrganizationStructureItemTranslation(
  item: OrganizationStructureItem,
  language: SiteLanguage
): OrganizationStructureItem {
  const base = normalizeOrganizationStructureItem(item);
  if (language === 'id' || !Array.isArray(item.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeOrganizationStructureItem(
    translation as OrganizationStructureItem
  );
  return {
    ...base,
    code: translated.code || base.code,
    name: translated.name || base.name,
    desc: translated.desc || base.desc,
  };
}

export const FALLBACK_ORGANIZATION_STRUCTURE_CONTENT: OrganizationStructureContent =
  {
    id: 1,
    eyebrow: 'Struktur Organisasi',
    subeyebrow: 'Tata kelola yang rapi, hirarkis, dan akuntabel.',
    title: 'Peta kerja yang <em>tertata</em> dari arah hingga eksekusi.',
    subtitle:
      'Struktur ini menempatkan arah strategis, pengawasan, dan operasional dalam relasi yang jelas, sehingga setiap program Journal Ocean berjalan dengan disiplin, integritas, dan kesinambungan.',
    label: 'Pelaksana',
  };

export const FALLBACK_ORGANIZATION_STRUCTURE_ITEMS: OrganizationStructureItem[] =
  [
    {
      id: 1,
      sort: 1,
      initial: 'J',
      code: 'JOC',
      name: 'Journal Ocean',
      desc: 'Badan pengelola tertinggi organisasi',
      icon: null,
    },
    {
      id: 2,
      sort: 2,
      initial: 'P',
      code: 'PEMBINA',
      name: 'Pembina Journal Ocean',
      desc: 'Memberikan arahan strategis',
      icon: null,
    },
    {
      id: 3,
      sort: 3,
      initial: 'P',
      code: 'PENGAWAS',
      name: 'Pengawas Journal Ocean',
      desc: 'Mengawasi jalannya organisasi',
      icon: null,
    },
    {
      id: 4,
      sort: 4,
      initial: 'K',
      code: 'KETUA',
      name: 'Ketua Journal Ocean',
      desc: 'Memimpin operasional harian',
      icon: null,
    },
    {
      id: 5,
      sort: 5,
      initial: 'S',
      code: 'SEKRETARIS',
      name: 'Sekretaris Journal Ocean',
      desc: 'Mengelola administrasi',
      icon: null,
    },
    {
      id: 6,
      sort: 6,
      initial: 'B',
      code: 'BENDAHARA',
      name: 'Bendahara Journal Ocean',
      desc: 'Mengelola keuangan organisasi',
      icon: null,
    },
  ];

export async function getOrganizationStructureContent(
  language: SiteLanguage = 'id'
): Promise<OrganizationStructureContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `organization-structure:v1:${normalizedLanguage}`;
  const cached = cacheGet<OrganizationStructureContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) return null;

  try {
    const item = await client.request(
      (readItems as any)('organization_structure', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyOrganizationStructureTranslation(
      content as OrganizationStructureContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getOrganizationStructureContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getOrganizationStructureContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<OrganizationStructureContent> {
  const fromCms = await getOrganizationStructureContent(language);
  return {
    ...FALLBACK_ORGANIZATION_STRUCTURE_CONTENT,
    ...fromCms,
  };
}

export async function getOrganizationStructureItems(
  language: SiteLanguage = 'id'
): Promise<OrganizationStructureItem[]> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `organization-structure-items:v1:${normalizedLanguage}`;
  const cached = cacheGet<OrganizationStructureItem[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) return [];

  try {
    const items = await client.request(
      (readItems as any)('organization_structure_list', {
        fields: ['*', 'translations.*'],
        sort: ['sort', 'id'],
      })
    );

    const result = (Array.isArray(items) ? items : [])
      .map((item) =>
        applyOrganizationStructureItemTranslation(
          item as OrganizationStructureItem,
          normalizedLanguage
        )
      )
      .filter((item) => item.code && item.name && item.desc);

    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getOrganizationStructureItems failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return [];
  }
}

export async function getOrganizationStructureItemsWithFallback(
  language: SiteLanguage = 'id'
): Promise<OrganizationStructureItem[]> {
  const items = await getOrganizationStructureItems(language);
  return items.length > 0 ? items : FALLBACK_ORGANIZATION_STRUCTURE_ITEMS;
}

function normalizeAboutMissionItem(item: AboutMissionItem): AboutMissionItem {
  return {
    ...item,
    title: getStringField(item, ['title', 'Title']),
    desc: getStringField(item, ['desc', 'Desc']),
  };
}

function applyAboutMissionItemTranslation(
  item: AboutMissionItem,
  language: SiteLanguage
): AboutMissionItem {
  const base = normalizeAboutMissionItem(item);
  if (language === 'id' || !Array.isArray(item.translations)) return base;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((t) =>
    languageCodes.includes(getTranslationCode(t))
  );
  if (!translation) return base;

  const translated = normalizeAboutMissionItem(translation as AboutMissionItem);
  return {
    ...base,
    title: translated.title || base.title,
    desc: translated.desc || base.desc,
  };
}

export const FALLBACK_ABOUT_MISSION_ITEMS: AboutMissionItem[] = [
  {
    id: 1,
    sort: 1,
    title: 'Pendidikan Berkualitas',
    desc: 'Menyelenggarakan dan mengembangkan pendidikan yang berkualitas dengan mengintegrasikan ilmu pengetahuan modern dan nilai-nilai Islam.',
  },
  {
    id: 2,
    sort: 2,
    title: 'Penelitian Integratif',
    desc: 'Mendorong dan mengembangkan penelitian integratif yang berorientasi pada pengembangan keilmuan dan pemecahan masalah umat.',
  },
  {
    id: 3,
    sort: 3,
    title: 'Pengabdian Masyarakat',
    desc: "Melaksanakan pengabdian kepada masyarakat berbasis pemberdayaan, edukasi, dan nilai-nilai keislaman yang rahmatan lil 'alamin.",
  },
  {
    id: 4,
    sort: 4,
    title: 'Budaya Inovasi',
    desc: 'Menumbuhkan budaya keilmuan, inovasi, dan kolaborasi dalam rangka menjawab tantangan global dan lokal.',
  },
  {
    id: 5,
    sort: 5,
    title: 'Karakter Unggul',
    desc: 'Menguatkan karakter insan yang beriman, berakhlak mulia, bertanggung jawab, dan berkontribusi aktif bagi kemajuan bangsa.',
  },
];

export async function getAboutMissionItems(
  language: SiteLanguage = 'id'
): Promise<AboutMissionItem[]> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `about-mission-items:v1:${normalizedLanguage}`;
  const cached = cacheGet<AboutMissionItem[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) return [];

  try {
    const items = await client.request(
      (readItems as any)('about_mission', {
        fields: ['*', 'translations.*'],
        sort: ['sort', 'id'],
      })
    );

    const result = (Array.isArray(items) ? items : [])
      .map((item) =>
        applyAboutMissionItemTranslation(
          item as AboutMissionItem,
          normalizedLanguage
        )
      )
      .filter((item) => item.title && item.desc);

    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAboutMissionItems failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return [];
  }
}

export async function getAboutMissionItemsWithFallback(
  language: SiteLanguage = 'id'
): Promise<AboutMissionItem[]> {
  const items = await getAboutMissionItems(language);
  return items.length > 0 ? items : FALLBACK_ABOUT_MISSION_ITEMS;
}

export async function getAboutPillarItems(
  language: SiteLanguage = 'id'
): Promise<AboutPillarItem[]> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `about-pillar-items:v1:${normalizedLanguage}`;
  const cached = cacheGet<AboutPillarItem[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn(
      '[directus] DIRECTUS_URL not set, returning empty about pillar items'
    );
    return [];
  }

  try {
    const items = await client.request(
      (readItems as any)('about_pillar_items', {
        fields: ['*', 'translations.*'],
        sort: ['sort', 'id'],
      })
    );

    const result = (Array.isArray(items) ? items : [])
      .map((item) =>
        applyAboutPillarItemTranslation(
          item as AboutPillarItem,
          normalizedLanguage
        )
      )
      .filter((item) => item.name && item.desc);

    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getAboutPillarItems failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return [];
  }
}

export async function getAboutPillarItemsWithFallback(
  language: SiteLanguage = 'id'
): Promise<AboutPillarItem[]> {
  const items = await getAboutPillarItems(language);
  return items.length > 0 ? items : FALLBACK_ABOUT_PILLAR_ITEMS;
}

function applyFooterTranslation(
  content: FooterContent,
  language: SiteLanguage
): FooterContent {
  if (language === 'id' || !Array.isArray(content.translations)) return content;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return content;

  return {
    ...content,
    brand_name: translation.brand_name || content.brand_name,
    brand_subtitle: translation.brand_subtitle || content.brand_subtitle,
    tagline: translation.tagline || content.tagline,
    about_title: translation.about_title || content.about_title,
    about_link_1_label:
      translation.about_link_1_label || content.about_link_1_label,
    about_link_2_label:
      translation.about_link_2_label || content.about_link_2_label,
    about_link_3_label:
      translation.about_link_3_label || content.about_link_3_label,
    program_title: translation.program_title || content.program_title,
    program_link_1_label:
      translation.program_link_1_label || content.program_link_1_label,
    program_link_2_label:
      translation.program_link_2_label || content.program_link_2_label,
    program_link_3_label:
      translation.program_link_3_label || content.program_link_3_label,
    contact_title: translation.contact_title || content.contact_title,
    address_text: translation.address_text || content.address_text,
    phone_label: translation.phone_label || content.phone_label,
    email_label: translation.email_label || content.email_label,
    office_hours_text:
      translation.office_hours_text || content.office_hours_text,
    social_label: translation.social_label || content.social_label,
    facebook_label: translation.facebook_label || content.facebook_label,
    instagram_label: translation.instagram_label || content.instagram_label,
    twitter_label: translation.twitter_label || content.twitter_label,
    youtube_label: translation.youtube_label || content.youtube_label,
    copyright_text: translation.copyright_text || content.copyright_text,
    privacy_label: translation.privacy_label || content.privacy_label,
    terms_label: translation.terms_label || content.terms_label,
  };
}

export const FALLBACK_FOOTER_CONTENT: FooterContent & {
  translations: FooterContentTranslation[];
} = {
  id: 1,
  brand_name: 'Journal Ocean',
  brand_subtitle: 'Jurnal · Sejak 2014',
  tagline:
    'Journal Ocean bergerak di bidang sosial, kemanusiaan, dan keagamaan — bersama membangun kebaikan untuk sesama.',
  about_title: 'Tentang',
  about_link_1_label: 'Profil Journal Ocean',
  about_link_1_href: '/profil',
  about_link_2_label: 'Visi & Misi',
  about_link_2_href: '/profil#visi-misi',
  about_link_3_label: 'Struktur',
  about_link_3_href: '/profil#struktur',
  program_title: 'Program',
  program_link_1_label: 'Sosial',
  program_link_1_href: '/program#sosial',
  program_link_2_label: 'Kemanusiaan',
  program_link_2_href: '/program#kemanusiaan',
  program_link_3_label: 'Keagamaan',
  program_link_3_href: '/program#keagamaan',
  contact_title: 'Hubungi',
  address_text: 'Jl. Contoh No. 123\nKota Anda, Provinsi',
  address_href: '#',
  phone_label: '(0511) 1234 5678',
  phone_href: 'tel:+6251112345678',
  email_label: 'info@journalocean.org',
  email_href: 'mailto:info@journalocean.org',
  office_hours_text: 'Senin - Jumat\n08:00 - 16:00 WITA',
  social_label: 'Ikuti Kami:',
  facebook_label: 'Facebook',
  facebook_url: '#',
  instagram_label: 'Instagram',
  instagram_url: '#',
  twitter_label: 'Twitter',
  twitter_url: '#',
  youtube_label: 'YouTube',
  youtube_url: '#',
  copyright_text: 'Journal Ocean ©{year}. All rights reserved.',
  privacy_label: 'Kebijakan Privasi',
  privacy_href: '#',
  terms_label: 'Syarat & Ketentuan',
  terms_href: '#',
  translations: [
    {
      languages_code: 'en-US',
      brand_name: 'Journal Ocean',
      brand_subtitle: 'Journal · Since 2014',
      tagline:
        'Journal Ocean works in social, humanitarian, and religious fields — building goodness together for others.',
      about_title: 'About',
      about_link_1_label: 'Journal Ocean Profile',
      about_link_2_label: 'Vision & Mission',
      about_link_3_label: 'Structure',
      program_title: 'Programs',
      program_link_1_label: 'Social',
      program_link_2_label: 'Humanitarian',
      program_link_3_label: 'Religious',
      contact_title: 'Contact',
      address_text: 'Example St. No. 123\nYour City, Province',
      phone_label: '(0511) 1234 5678',
      email_label: 'info@journalocean.org',
      office_hours_text: 'Monday - Friday\n08:00 - 16:00 WITA',
      social_label: 'Follow Us:',
      facebook_label: 'Facebook',
      instagram_label: 'Instagram',
      twitter_label: 'Twitter',
      youtube_label: 'YouTube',
      copyright_text: 'Journal Ocean ©{year}. All rights reserved.',
      privacy_label: 'Privacy Policy',
      terms_label: 'Terms & Conditions',
    },
  ],
};

export async function getFooterContent(
  language: SiteLanguage = 'id'
): Promise<FooterContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `footer:v1:${normalizedLanguage}`;
  const cached = cacheGet<FooterContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty footer');
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)('footer', {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyFooterTranslation(
      content as FooterContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getFooterContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getFooterContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<FooterContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getFooterContent(normalizedLanguage);
  if (fromCms) return fromCms;
  return applyFooterTranslation(FALLBACK_FOOTER_CONTENT, normalizedLanguage);
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function stripHtml(value: string | undefined): string {
  return (value ?? '')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'news'
  );
}

function applyNewsItemTranslation(
  item: NewsItem,
  language: SiteLanguage
): NewsItem {
  if (language === 'id' || !Array.isArray(item.translations)) return item;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = item.translations.find((entry) =>
    languageCodes.includes(getTranslationCode(entry))
  );

  if (!translation) return item;

  return {
    ...item,
    category: translation.category || item.category,
    judul: translation.judul || item.judul,
    excerpt: translation.excerpt || item.excerpt,
    isi: translation.isi || item.isi,
    image_alt: translation.image_alt || item.image_alt,
    meta_title: translation.meta_title || item.meta_title,
    meta_description: translation.meta_description || item.meta_description,
  };
}

function normalizeNewsItem(item: NewsItem, language: SiteLanguage): NewsItem {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const translatedItem = applyNewsItemTranslation(item, normalizedLanguage);
  const publishedAt =
    translatedItem.published_at ?? translatedItem.date_created ?? '';
  const thumbnail =
    typeof translatedItem.thumbnail === 'string'
      ? directusAssetUrl(translatedItem.thumbnail)
      : '';
  const excerpt =
    translatedItem.excerpt || stripHtml(translatedItem.isi).slice(0, 180);
  const readingTime = toNumberOrNull(translatedItem.reading_time) ?? 3;
  const slug = translatedItem.slug || slugify(translatedItem.judul);

  return {
    ...translatedItem,
    slug,
    category: getCategoryLabel(translatedItem.category, normalizedLanguage),
    judul: translatedItem.judul,
    excerpt,
    thumbnail,
    url_thumbnail: thumbnail,
    image_alt:
      translatedItem.image_alt || `Thumbnail untuk ${translatedItem.judul}`,
    author: translatedItem.author || 'Admin Journal Ocean',
    published_at: publishedAt,
    date_created: publishedAt,
    is_featured: toBoolean(translatedItem.is_featured),
    show_on_home: toBoolean(translatedItem.show_on_home),
    home_sort: toNumberOrNull(translatedItem.home_sort),
    reading_time: readingTime,
    meta_title: translatedItem.meta_title || translatedItem.judul,
    meta_description: translatedItem.meta_description || excerpt,
  };
}

function applyLandingProfileTranslation(
  content: LandingProfileContent,
  language: SiteLanguage
): LandingProfileContent {
  if (language === 'id' || !Array.isArray(content.translations)) return content;

  const languageCodes = getTranslationLanguageCodes(language);
  const translation = content.translations.find((item) =>
    languageCodes.includes(getTranslationCode(item))
  );

  if (!translation) return content;

  return {
    ...content,
    subtitle: translation.subtitle || content.subtitle,
    main_title: translation.main_title || content.main_title,
    highlight_title: translation.highlight_title || content.highlight_title,
    description_1: translation.description_1 || content.description_1,
    description_2: translation.description_2 || content.description_2,
    image_1_alt: translation.image_1_alt || content.image_1_alt,
    image_2_alt: translation.image_2_alt || content.image_2_alt,
    stat_label: translation.stat_label || content.stat_label,
    signature_text: translation.signature_text || content.signature_text,
    signature_subtext:
      translation.signature_subtext || content.signature_subtext,
    pillars_eyebrow: translation.pillars_eyebrow || content.pillars_eyebrow,
    pillars_title: translation.pillars_title || content.pillars_title,
    pillars_intro: translation.pillars_intro || content.pillars_intro,
    pillar_1_name: translation.pillar_1_name || content.pillar_1_name,
    pillar_1_desc: translation.pillar_1_desc || content.pillar_1_desc,
    pillar_2_name: translation.pillar_2_name || content.pillar_2_name,
    pillar_2_desc: translation.pillar_2_desc || content.pillar_2_desc,
    pillar_3_name: translation.pillar_3_name || content.pillar_3_name,
    pillar_3_desc: translation.pillar_3_desc || content.pillar_3_desc,
    pillar_4_name: translation.pillar_4_name || content.pillar_4_name,
    pillar_4_desc: translation.pillar_4_desc || content.pillar_4_desc,
  };
}

export const FALLBACK_LANDING_PROFILE: LandingProfileContent & {
  translations: LandingProfileTranslation[];
} = {
  id: 1,
  status: 'published',
  subtitle: 'Tentang Journal Ocean',
  main_title: 'Selamat datang di',
  highlight_title: 'Journal Ocean',
  description_1:
    'Journal Ocean merupakan organisasi yang bergerak di bidang sosial, kemanusiaan, dan keagamaan dengan komitmen untuk memberikan kontribusi positif bagi masyarakat dan lingkungan sekitar.',
  description_2:
    'Kami merangkul setiap individu dan komunitas untuk tumbuh bersama — dengan keyakinan bahwa kolaborasi, keikhlasan, dan ilmu adalah tiga pilar utama perubahan.',
  image_1:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop',
  image_1_alt: 'Journal Ocean',
  image_2:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop',
  image_2_alt: 'Program Kemanusiaan',
  stat_number: '12+',
  stat_label: 'Tahun Pengabdian',
  signature_avatar: 'S',
  signature_text: 'Para pendiri Journal Ocean',
  signature_subtext: 'Bersama Membangun Kebaikan',
  pillars_eyebrow: 'Bidang Kegiatan',
  pillars_title: 'Empat pilar <em>utama</em> yang kami jalankan.',
  pillars_intro:
    'Setiap program dirancang untuk menjawab kebutuhan nyata masyarakat, dengan pendekatan kolaboratif yang terukur dan berkelanjutan.',
  pillar_1_initial: 'A',
  pillar_1_name: 'Program Sosial',
  pillar_1_desc:
    'Membangun kebersamaan dan kepedulian yang merata di setiap lapisan masyarakat.',
  pillar_2_initial: 'B',
  pillar_2_name: 'Program Kemanusiaan',
  pillar_2_desc:
    'Menjangkau mereka yang paling membutuhkan dengan aksi cepat dan terarah.',
  pillar_3_initial: 'C',
  pillar_3_name: 'Program Keagamaan',
  pillar_3_desc:
    'Mendalami nilai-nilai Islam dan mengamalkannya dalam keseharian.',
  pillar_4_initial: 'D',
  pillar_4_name: 'Kegiatan Rutin',
  pillar_4_desc:
    'Kajian, pelatihan, dan pertemuan komunitas yang konsisten sepanjang tahun.',
  translations: [
    {
      languages_code: 'en-US',
      subtitle: 'About Journal Ocean',
      main_title: 'Welcome to',
      highlight_title: 'Journal Ocean',
      description_1:
        'Journal Ocean is an organization working in social, humanitarian, and religious fields with a commitment to creating positive contributions for communities and the surrounding environment.',
      description_2:
        'We embrace individuals and communities to grow together — believing that collaboration, sincerity, and knowledge are three essential pillars of change.',
      image_1_alt: 'Journal Ocean',
      image_2_alt: 'Humanitarian Program',
      stat_label: 'Years of Service',
      signature_text: 'The founders of Journal Ocean',
      signature_subtext: 'Building Goodness Together',
      pillars_eyebrow: 'Areas of Work',
      pillars_title: 'Four <em>main</em> pillars we carry forward.',
      pillars_intro:
        'Each program is designed to respond to real community needs through a collaborative, measurable, and sustainable approach.',
      pillar_1_name: 'Social Program',
      pillar_1_desc:
        'Building togetherness and care across every layer of society.',
      pillar_2_name: 'Humanitarian Program',
      pillar_2_desc:
        'Reaching those who need support most through fast and focused action.',
      pillar_3_name: 'Religious Program',
      pillar_3_desc:
        'Deepening Islamic values and practicing them in daily life.',
      pillar_4_name: 'Routine Activities',
      pillar_4_desc:
        'Studies, training, and community gatherings held consistently throughout the year.',
    },
  ],
};

const DIRECTUS_PROFILE_COLLECTION = 'profil';

export async function getLandingProfileContent(
  language: SiteLanguage = 'id'
): Promise<LandingProfileContent | null> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `${DIRECTUS_PROFILE_COLLECTION}:v1:${normalizedLanguage}`;
  const cached = cacheGet<LandingProfileContent>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty profile');
    return null;
  }

  try {
    const item = await client.request(
      (readItems as any)(DIRECTUS_PROFILE_COLLECTION, {
        fields: ['*', 'translations.*'],
        limit: 1,
      })
    );

    const content = Array.isArray(item) ? item[0] : item;
    if (!content) return null;

    const result = applyLandingProfileTranslation(
      content as LandingProfileContent,
      normalizedLanguage
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getLandingProfileContent failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return null;
  }
}

export async function getLandingProfileContentWithFallback(
  language: SiteLanguage = 'id'
): Promise<LandingProfileContent> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const fromCms = await getLandingProfileContent(normalizedLanguage);
  if (fromCms) return fromCms;
  return applyLandingProfileTranslation(
    FALLBACK_LANDING_PROFILE,
    normalizedLanguage
  );
}

interface NewsQueryOptions {
  limit?: number;
  homeOnly?: boolean;
}

export async function getNewsItems(
  language: SiteLanguage = 'id',
  options: NewsQueryOptions = {}
): Promise<NewsItem[]> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const limit = options.limit ?? 20;
  const cacheKey = `news:v1:${normalizedLanguage}:${options.homeOnly ? 'home' : 'all'}:${limit}`;
  const cached = cacheGet<NewsItem[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty news');
    return [];
  }

  try {
    const filter: Record<string, unknown> = {
      status: { _eq: 'published' },
    };

    if (options.homeOnly) {
      filter.show_on_home = { _eq: true };
    }

    const items = await client.request(
      (readItems as any)('news', {
        fields: ['*', 'translations.*'],
        filter,
        sort: options.homeOnly
          ? ['home_sort', '-published_at']
          : ['-published_at'],
        limit,
      })
    );

    const result = ((items as NewsItem[]) ?? []).map((item) =>
      normalizeNewsItem(item, normalizedLanguage)
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getNewsItems failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return [];
  }
}

export async function getHomeNews(
  language: SiteLanguage = 'id',
  limit = 3
): Promise<NewsItem[]> {
  return getNewsItems(language, { homeOnly: true, limit });
}

export async function getPublishedNews(
  language: SiteLanguage = 'id',
  limit = 20
): Promise<NewsItem[]> {
  return getNewsItems(language, { limit });
}

export async function getNewsItemBySlug(
  slug: string,
  language: SiteLanguage = 'id'
): Promise<NewsItem | null> {
  const normalizedSlug = slugify(slug);
  const items = await getNewsItems(language, { limit: 100 });
  return (
    items.find((item) => slugify(item.slug ?? item.judul) === normalizedSlug) ??
    null
  );
}

export async function getHeroSlides(
  language: SiteLanguage = 'id'
): Promise<HeroSlide[]> {
  const normalizedLanguage = normalizeSiteLanguage(language);
  const cacheKey = `hero_slides:v2:${normalizedLanguage}`;
  const cached = cacheGet<HeroSlide[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty array');
    return [];
  }

  try {
    const items = await client.request(
      (readItems as any)('hero_slides', {
        fields: ['*', 'translations.*'],
        sort: ['id'],
        limit: 20,
      })
    );
    const result = ((items as HeroSlide[]) ?? []).map((slide) =>
      applyHeroSlideTranslation(slide, normalizedLanguage)
    );
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      `[directus] getHeroSlides failed (${normalizedLanguage}):`,
      e instanceof Error ? e.message : e
    );
    return [];
  }
}
