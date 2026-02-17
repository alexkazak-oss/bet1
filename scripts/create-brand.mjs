#!/usr/bin/env node

/**
 * create-brand.mjs — Site Factory brand generator
 *
 * Usage:
 *   pnpm create:brand <dir> --name "Brand" --locales en,ja --default ja --country JP --language ja
 *
 * What it does:
 *   1. Copies the template (this repo) into <dir>, skipping node_modules/.next/.git
 *   2. Generates content/site.json from the supplied flags
 *   3. Creates stub content/locales/<locale>.json for each locale (copies en.json keys)
 *   4. Creates .env.example
 */

import {
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
} from 'node:fs'
import {basename, join, resolve} from 'node:path'

// ── Helpers ─────────────────────────────────────────────────
function fatal(msg) {
	console.error(`\x1b[31m✖ ${msg}\x1b[0m`)
	process.exit(1)
}

function info(msg) {
	console.log(`\x1b[36m→ ${msg}\x1b[0m`)
}

function success(msg) {
	console.log(`\x1b[32m✔ ${msg}\x1b[0m`)
}

// ── Parse CLI args ──────────────────────────────────────────
const args = process.argv.slice(2)
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
	console.log(`
  Usage: pnpm create:brand <dir> [options]

  Options:
    --name      <string>   Brand name (required)
    --locales   <csv>      Comma-separated locale codes (default: en)
    --default   <string>   Default locale (default: first in --locales)
    --country   <string>   ISO 3166-1 country code (default: US)
    --language  <string>   ISO 639-1 language code (default: first in --locales)
`)
	process.exit(0)
}

function getFlag(name, fallback) {
	const idx = args.indexOf(`--${name}`)
	if (idx === -1 || idx + 1 >= args.length) return fallback
	return args[idx + 1]
}

const targetDir = resolve(args[0])
const brandName = getFlag('name', null)
if (!brandName) fatal('--name is required')

const localesRaw = getFlag('locales', 'en')
const locales = localesRaw
	.split(',')
	.map((l) => l.trim())
	.filter(Boolean)
if (locales.length === 0) fatal('--locales must contain at least one locale')

const defaultLocale = getFlag('default', locales[0])
if (!locales.includes(defaultLocale)) {
	fatal(
		`Default locale "${defaultLocale}" is not in the locales list: ${locales.join(', ')}`,
	)
}

const countryCode = getFlag('country', 'US')
const language = getFlag('language', locales[0])

// ── 1. Copy template ────────────────────────────────────────
const templateRoot = resolve(import.meta.dirname)
// Go one level up since this script lives in scripts/
const projectRoot = resolve(templateRoot, '..')

if (existsSync(targetDir)) {
	fatal(`Target directory already exists: ${targetDir}`)
}

info(`Copying template to ${targetDir}`)

const SKIP = new Set([
	'node_modules',
	'.next',
	'.git',
	'.env',
	'.env.local',
	'.env.development.local',
	'.env.production.local',
])

cpSync(projectRoot, targetDir, {
	recursive: true,
	filter: (src) => {
		const name = basename(src)
		return !SKIP.has(name)
	},
})

success('Template copied')

// ── 2. Generate content/site.json ───────────────────────────
const siteConfig = {
	brand: {
		name: brandName,
	},
	i18n: {
		defaultLocale,
		locales,
	},
	region: {
		countryCode: countryCode.toUpperCase(),
		language,
	},
	seo: {
		titleTemplate: `%s | ${brandName}`,
		defaultTitle: `${brandName} — Full-stack web studio`,
		description:
			'We design, build, and optimize digital experiences that convert.',
		keywords: ['web development', 'design', 'digital agency'],
		robots: {
			index: true,
			follow: true,
		},
	},
}

const contentDir = join(targetDir, 'content')
mkdirSync(contentDir, {recursive: true})
writeFileSync(
	join(contentDir, 'site.json'),
	JSON.stringify(siteConfig, null, '\t') + '\n',
)
success('Generated content/site.json')

// ── 3. Generate locale JSON stubs ───────────────────────────
const localesDir = join(contentDir, 'locales')
mkdirSync(localesDir, {recursive: true})

// Try to read the master en.json from the template as the key scaffold
const masterLocalePath = join(projectRoot, 'content', 'locales', 'en.json')
let masterKeys = null
if (existsSync(masterLocalePath)) {
	try {
		masterKeys = JSON.parse(readFileSync(masterLocalePath, 'utf-8'))
	} catch {
		// ignore parse errors
	}
}

// Deep clone with placeholder values
function stubify(obj, locale) {
	if (Array.isArray(obj)) {
		return obj.map((item) => stubify(item, locale))
	}
	if (obj !== null && typeof obj === 'object') {
		const out = {}
		for (const [k, v] of Object.entries(obj)) {
			out[k] = stubify(v, locale)
		}
		return out
	}
	if (typeof obj === 'string') {
		return `[${locale}] ${obj}`
	}
	return obj
}

for (const locale of locales) {
	const localeFile = join(localesDir, `${locale}.json`)
	if (existsSync(localeFile)) {
		info(`Skipping existing ${locale}.json`)
		continue
	}

	const data = masterKeys
		? locale === 'en'
			? masterKeys
			: stubify(masterKeys, locale)
		: {nav: {}, footer: {}, pages: {}, seo: {}, features: {}}

	writeFileSync(localeFile, JSON.stringify(data, null, '\t') + '\n')
	success(`Generated content/locales/${locale}.json`)
}

// ── 4. Update shared/content/index.ts imports ───────────────
const contentIndexPath = join(targetDir, 'shared', 'content', 'index.ts')
if (existsSync(contentIndexPath)) {
	const importLines = locales
		.map((l) => `import ${l}Json from '@/content/locales/${l}.json'`)
		.join('\n')

	const mapEntries = locales
		.map(
			(l) => `\t${l}: ${l}Json as unknown as Omit<LocalizedContent, 'locale'>,`,
		)
		.join('\n')

	const contentIndex = readFileSync(contentIndexPath, 'utf-8')

	// Replace import block
	const updatedContent = contentIndex
		.replace(
			/\/\/ -- Locale JSON imports[\s\S]*?import \w+Json from '@\/content\/locales\/\w+\.json'/g,
			`// -- Locale JSON imports --------------------------------------------------\n` +
				`// Auto-generated by create-brand. Edit when adding/removing locales.\n` +
				importLines,
		)
		.replace(
			/const localeJsonMap[\s\S]*?^}/m,
			`const localeJsonMap: Record<string, Omit<LocalizedContent, 'locale'>> = {\n${mapEntries}\n}`,
		)

	writeFileSync(contentIndexPath, updatedContent)
	success('Updated shared/content/index.ts locale imports')
}

// ── 5. Create .env.example ──────────────────────────────────
const envExample = `# Base URL for sitemap, OG images, canonical links
# In production set this to your actual domain
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Redirect target for NeonButton (optional)
NEXT_PUBLIC_REDIRECT_TARGET_URL=
`

writeFileSync(join(targetDir, '.env.example'), envExample)
success('Created .env.example')

// ── Done ────────────────────────────────────────────────────
console.log()
success(`Brand "${brandName}" created at ${targetDir}`)
console.log(`
  Next steps:
    cd ${targetDir}
    pnpm install
    cp .env.example .env.local
    pnpm dev
`)
