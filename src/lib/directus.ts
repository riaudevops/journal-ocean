import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';

export interface HeroSlide {
  id: number | string;
  status?: 'published' | 'draft';
  sort?: number;
  number: string;
  headline: string;
  image: string;
  quote: string;
  quote_attr?: string;
}

// ============================================
// Environment
// ============================================
function normalizeEnvValue(value: unknown): string {
  let normalized = (value ?? '').toString().trim();

  // Some deployment dashboards store copied values with literal escaped quotes,
  // e.g. \'https://cms.sawiyan.or.id/\'. Directus SDK expects a clean URL.
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
); // strip trailing slash
const DIRECTUS_TOKEN = normalizeEnvValue(import.meta.env.DIRECTUS_TOKEN);

/** Public flag so consumers can know whether CMS is configured. */
export const isDirectusConfigured = DIRECTUS_URL.length > 0;

// ============================================
// Client (lazy singleton)
// ============================================
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

// ============================================
// Asset URL helper
// ============================================
/**
 * Convert a Directus asset reference to a full URL.
 * - If the input is already a full URL (http/https/data:), return as-is.
 * - If it looks like a UUID, prefix with DIRECTUS_URL + /assets/.
 * - Otherwise (empty / unknown), return the input unchanged.
 */
export function directusAssetUrl(asset: string | null | undefined): string {
  if (!asset) return '';
  if (/^(https?:|data:)/i.test(asset)) return asset;
  if (!isDirectusConfigured) return asset;
  return `${DIRECTUS_URL}/assets/${asset}`;
}

/**
 * Get the admin URL for editing a specific record in Directus.
 * Returns "" if Directus is unconfigured.
 *
 * @example
 *   directusAdminUrl('hero_slides', 3)  // → "https://cms.sawiyan.or.id/admin/content/hero_slides/3"
 */
export function directusAdminUrl(
  collection: string,
  id: number | string
): string {
  if (!isDirectusConfigured) return '';
  return `${DIRECTUS_URL}/admin/content/${collection}/${id}`;
}

/**
 * Quick health check: returns true if Directus server is reachable.
 * Cached for 30s to avoid hammering the server.
 */
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

// ============================================
// In-memory cache (60s TTL)
// ============================================
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

// ============================================
// Fetchers
// ============================================

/**
 * Fetch published hero slides from Directus, sorted by `sort` asc.
 * Returns [] on any error — never throws.
 * Uses a 60s in-memory cache to avoid hammering CMS on every request.
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const cacheKey = 'hero_slides:v1';
  const cached = cacheGet<HeroSlide[]>(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    console.warn('[directus] DIRECTUS_URL not set, returning empty array');
    return [];
  }

  try {
    const items = await client.request(
      // SDK v22 readItems is strictly typed; we bypass with `as any` so the
      // schema-aware signature doesn't reject the literal collection name
      // and query options. Runtime call matches docs exactly.
      (readItems as any)('hero_slides', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        limit: 20,
      })
    );
    const result = (items as HeroSlide[]) ?? [];
    cacheSet(cacheKey, result);
    return result;
  } catch (e) {
    console.error(
      '[directus] getHeroSlides failed:',
      e instanceof Error ? e.message : e
    );
    return [];
  }
}

// ============================================
// Fallback data
// ============================================

/**
 * Hardcoded fallback used when Directus is unreachable / empty.
 * Mirrors the original Slider.astro data so the page never goes blank.
 */
export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    status: 'published',
    sort: 1,
    number: '01',
    headline:
      'Menjunjung tinggi <em>kejujuran, amanah, dan tanggung jawab</em> dalam setiap langkah.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop',
    quote:
      '“Integritas adalah napas dari setiap pengabdian yang kami lakukan.”',
    quote_attr: 'Journal Ocean',
  },
  {
    id: 2,
    status: 'published',
    sort: 2,
    number: '02',
    headline:
      'Mengembangkan <em>ilmu pengetahuan</em> secara berkelanjutan dan berbasis Islam.',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop',
    quote: '“Ilmu yang bermanfaat adalah cahaya yang tak pernah padam.”',
    quote_attr: 'Journal Ocean',
  },
  {
    id: 3,
    status: 'published',
    sort: 3,
    number: '03',
    headline:
      "Menjadikan <em>Al-Qur'an dan Hadis</em> sebagai landasan berpikir dan bertindak.",
    image:
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=1080&fit=crop',
    quote: "“Al-Qur'an adalah kompas abadi yang menuntun langkah kami.”",
    quote_attr: 'Journal Ocean',
  },
  {
    id: 4,
    status: 'published',
    sort: 4,
    number: '04',
    headline:
      'Mendorong <em>kreativitas dan pembaruan</em> dalam pendidikan dan pengabdian.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop',
    quote: '“Inovasi adalah cara kami menjawab tantangan zaman.”',
    quote_attr: 'Journal Ocean',
  },
  {
    id: 5,
    status: 'published',
    sort: 5,
    number: '05',
    headline:
      'Mengedepankan <em>kebermanfaatan dan keadilan sosial</em> bagi masyarakat luas.',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop',
    quote: '“Kepedulian sosial adalah ibadah yang paling dekat.”',
    quote_attr: 'Journal Ocean',
  },
  {
    id: 6,
    status: 'published',
    sort: 6,
    number: '06',
    headline:
      'Mengembangkan <em>kerja sama</em> untuk dampak yang berkelanjutan.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&h=1080&fit=crop',
    quote: '“Kolaborasi adalah kekuatan yang tak tergantikan.”',
    quote_attr: 'Journal Ocean',
  },
];

/**
 * Fetch slides with automatic fallback. Always returns >= 1 slide.
 * - Tries Directus first (cached 60s).
 * - If Directus is unconfigured OR returns empty, returns FALLBACK_HERO_SLIDES.
 */
export async function getHeroSlidesWithFallback(): Promise<HeroSlide[]> {
  const fromCms = await getHeroSlides();
  if (fromCms.length > 0) return fromCms;
  if (!isDirectusConfigured) {
    console.log('[directus] Using fallback hero slides (DIRECTUS_URL not set)');
  } else {
    console.log(
      '[directus] Using fallback hero slides (CMS returned empty or errored)'
    );
  }
  return FALLBACK_HERO_SLIDES;
}
