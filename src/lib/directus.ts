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

const CACHE_TTL_MS = 60_000;
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

function getTranslationCode(
  translation:
    | HeroSlideTranslation
    | NavbarContentTranslation
    | LandingProfileTranslation
    | FooterContentTranslation
): string {
  const raw = translation.languages_code;
  if (!raw) return '';
  return typeof raw === 'string' ? raw : (raw.code ?? '');
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
