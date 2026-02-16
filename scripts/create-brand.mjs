#!/usr/bin/env node

import {
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
} from 'node:fs'
import {basename, join, resolve} from 'node:path'

// ─── CLI parsing

/** @param {string[]} argv */
function parseArgs(argv) {
	const args = argv.slice(2)
	/** @type {Record<string, string>} */
	const flags = {}
	/** @type {string | undefined} */
	let positional

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		if (arg.startsWith('--')) {
			const key = arg.slice(2)
			const next = args[i + 1]
			if (next && !next.startsWith('--')) {
				flags[key] = next
				i++
			} else {
				flags[key] = 'true'
			}
		} else if (!positional) {
			positional = arg
		}
	}

	return {positional, flags}
}

// ─── Main ───────────────────────────────────────────────

const TEMPLATE_DIR = resolve(import.meta.dirname, '..')
const {positional: targetName, flags} = parseArgs(process.argv)

if (!targetName) {
	console.error(
		'Usage: node scripts/create-brand.mjs <dir> --name "Brand" --locales en,ja --default ja --country JP --language ja',
	)
	process.exit(1)
}

const brandName = flags.name || targetName
const localesRaw = flags.locales || 'en'
const locales = localesRaw
	.split(',')
	.map((l) => l.trim())
	.filter(Boolean)
const defaultLocale = flags.default || locales[0]
const countryCode = flags.country || 'US'
const language = flags.language || defaultLocale

if (!locales.includes(defaultLocale)) {
	console.error(
		`Error: default locale "${defaultLocale}" must be in locales list [${locales.join(', ')}]`,
	)
	process.exit(1)
}

const targetDir = resolve(TEMPLATE_DIR, '..', targetName)

if (existsSync(targetDir)) {
	console.error(`Error: directory "${targetDir}" already exists`)
	process.exit(1)
}

// ─── Copy template ──────────────────────────────────────

const EXCLUDE = new Set(['node_modules', '.next', '.git', '.turbo', 'scripts'])

console.log(`\n📁 Copying template to ${targetDir}…`)

cpSync(TEMPLATE_DIR, targetDir, {
	recursive: true,
	filter: (src) => {
		const name = basename(src)
		return !EXCLUDE.has(name)
	},
})

// Copy the scripts directory too
cpSync(join(TEMPLATE_DIR, 'scripts'), join(targetDir, 'scripts'), {
	recursive: true,
})

console.log('✅ Template copied')

// ─── Generate content/site.json ─────────────────────────

/** @type {import('../shared/config/site-config.types.ts').SiteConfig} */
const siteConfig = {
	brand: {
		name: brandName,
	},
	i18n: {
		defaultLocale,
		locales,
	},
	region: {
		countryCode,
		language,
	},
	seo: {
		titleTemplate: `%s | ${brandName}`,
		defaultTitle: `${brandName}`,
		description: `${brandName} — official website`,
		keywords: [brandName.toLowerCase(), 'website'],
		robots: {
			index: true,
			follow: true,
		},
	},
}

const siteJsonPath = join(targetDir, 'content', 'site.json')
writeFileSync(siteJsonPath, JSON.stringify(siteConfig, null, '\t') + '\n')
console.log('✅ content/site.json generated')

// ─── Generate locale JSON files ─────────────────────────

const masterKeysPath = join(TEMPLATE_DIR, 'content', 'locales', 'en.json')
const masterKeys = JSON.parse(readFileSync(masterKeysPath, 'utf-8'))

const localesDir = join(targetDir, 'content', 'locales')
mkdirSync(localesDir, {recursive: true})

// Remove existing locale files that came from template copy
const templateLocaleFiles = ['en.json', 'th.json']
for (const f of templateLocaleFiles) {
	const p = join(localesDir, f)
	if (existsSync(p)) {
		const {unlinkSync} = await import('node:fs')
		unlinkSync(p)
	}
}

for (const locale of locales) {
	const existingPath = join(
		TEMPLATE_DIR,
		'content',
		'locales',
		`${locale}.json`,
	)
	let content

	if (existsSync(existingPath)) {
		// Use existing translation if available
		content = JSON.parse(readFileSync(existingPath, 'utf-8'))
	} else {
		// Generate skeleton from master keys (en)
		content = generateSkeleton(masterKeys, locale)
	}

	// Update brand-specific SEO fields
	if (content.seo) {
		for (const page of Object.keys(content.seo)) {
			const seo = content.seo[page]
			if (seo.title) {
				seo.title = seo.title.replace(/Acme Services/g, brandName)
			}
			if (seo.description) {
				seo.description = seo.description.replace(/Acme Services/g, brandName)
			}
			if (seo.ogTitle) {
				seo.ogTitle = seo.ogTitle.replace(/Acme Services/g, brandName)
			}
			if (seo.ogDescription) {
				seo.ogDescription = seo.ogDescription.replace(
					/Acme Services/g,
					brandName,
				)
			}
		}
	}

	const outPath = join(localesDir, `${locale}.json`)
	writeFileSync(outPath, JSON.stringify(content, null, '\t') + '\n')
	console.log(`✅ content/locales/${locale}.json generated`)
}

// ─── Generate .env.example ──────────────────────────────

const envContent = `NEXT_PUBLIC_SITE_URL=https://${targetName}.example.com
NEXT_PUBLIC_REDIRECT_TARGET_URL=https://external.example.com
`

writeFileSync(join(targetDir, '.env.example'), envContent)
writeFileSync(join(targetDir, '.env.local'), envContent)
console.log('✅ .env.example generated')

// ─── Update package.json name 

const pkgPath = join(targetDir, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
pkg.name = targetName
writeFileSync(pkgPath, JSON.stringify(pkg, null, '  ') + '\n')
console.log('✅ package.json name updated')

console.log(`\n🎉 Brand "${brandName}" created at ${targetDir}`)
console.log(`\nNext steps:`)
console.log(`  cd ../${targetName}`)
console.log(`  pnpm install`)
console.log(`  pnpm dev`)

// ─── Helpers ────────────────────────────────────────────

/**
 * Recursively creates a skeleton from master keys,
 * preserving structure but marking strings with TODO prefix.
 * @param {unknown} obj
 * @param {string} locale
 * @returns {unknown}
 */
function generateSkeleton(obj, locale) {
	if (obj === null || obj === undefined) return obj
	if (typeof obj === 'string') return `[${locale.toUpperCase()}] ${obj}`
	if (typeof obj === 'number' || typeof obj === 'boolean') return obj

	if (Array.isArray(obj)) {
		return obj.map((item) => generateSkeleton(item, locale))
	}

	/** @type {Record<string, unknown>} */
	const result = {}
	for (const [key, value] of Object.entries(
		/** @type {Record<string, unknown>} */ (obj),
	)) {
		result[key] = generateSkeleton(value, locale)
	}
	return result
}
