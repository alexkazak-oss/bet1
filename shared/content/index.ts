import type {Locale} from '@/shared/config/i18n'
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/shared/config/i18n'
import type {
	FeaturesContent,
	FooterContent,
	LocalizedContent,
	NavigationContent,
	PageContent,
	PageKey,
	SeoFields,
} from '@/shared/content/types'

const en: LocalizedContent = {
	locale: 'en',
	nav: {
		home: 'Home',
		services: 'Services',
		about: 'About',
		pricing: 'Pricing',
		contacts: 'Contacts',
	},
	footer: {
		copyright: '© 2026 Acme Services. All rights reserved.',
		contact: 'Reach us at contact@example.com',
	},
	pages: {
		home: {
			hero: {
				heading: 'Full-stack web studio for modern businesses',
				lead: 'We design, build, and optimize digital experiences that convert. From strategy to launch and beyond.',
				ctaLabel: 'Book a call',
			},
			sections: [
				{
					title: 'What we do',
					body: 'Product strategy, UX/UI, and performance-focused engineering tailored to your market.',
				},
				{
					title: 'Why choose us',
					body: 'Senior team, transparent process, and measurable outcomes backed by modern tooling.',
				},
				{
					title: 'Delivery model',
					body: 'Iterative sprints with clear milestones, paired with continuous optimization and support.',
				},
			],
		},
		services: {
			hero: {
				heading: 'Services built to ship fast and scale',
				lead: 'Strategy, design, and engineering packages crafted for growth teams.',
			},
			sections: [
				{
					title: 'Discovery & Strategy',
					body: 'Market research, product positioning, user journey mapping, and roadmapping.',
				},
				{
					title: 'Design Systems',
					body: 'Atomic design, accessible components, and documentation your teams can trust.',
				},
				{
					title: 'Engineering',
					body: 'Next.js apps, CMS integrations, performance tuning, QA automation, and DevOps.',
				},
			],
		},
		about: {
			hero: {
				heading: 'A senior team focused on outcomes',
				lead: 'We are a distributed crew of designers, engineers, and strategists shipping production-grade products.',
			},
			sections: [
				{
					title: 'Leadership',
					body: 'Led by staff-level engineers and product designers with global launch experience.',
				},
				{
					title: 'Process',
					body: 'Lean discovery, prototype-first, and data-informed iterations from day one.',
				},
				{
					title: 'Tooling',
					body: 'Modern stack with automated testing, accessibility gates, and observability by default.',
				},
			],
		},
		pricing: {
			hero: {
				heading: 'Transparent pricing for every stage',
				lead: 'Pick a plan or tailor a custom engagement. No lock-in, clear deliverables.',
			},
			sections: [
				{
					title: 'Starter',
					body: '2-week sprint: audit, UX refresh, and performance tuning. Fixed scope, fixed fee.',
				},
				{
					title: 'Growth',
					body: 'Monthly retainer: roadmap delivery, experiments, and design system maintenance.',
				},
				{
					title: 'Dedicated squad',
					body: 'Embedded team with SLAs, on-call support, and continuous delivery pipelines.',
				},
			],
		},
		contacts: {
			hero: {
				heading: 'Let’s talk about your next release',
				lead: 'Tell us about your goals and timeline. We reply within one business day.',
				ctaLabel: 'Send a brief',
			},
			sections: [
				{
					title: 'Email',
					body: 'contact@example.com',
				},
				{
					title: 'Office',
					body: 'Remote-first with hubs in Singapore and Bangkok.',
				},
				{
					title: 'Working hours',
					body: 'Monday to Friday, 09:00–18:00 ICT.',
				},
			],
		},
	},
	seo: {
		home: {
			title: 'Acme Services | Product strategy, design, and engineering',
			description:
				'Senior Next.js team delivering strategy, UX, and engineering for growth-stage products.',
			ogTitle: 'Acme Services — senior web studio',
			ogDescription:
				'Ship faster with a senior crew: strategy, design systems, and high-performance Next.js apps.',
		},
		services: {
			title: 'Services | Acme Services',
			description:
				'Discovery, design systems, and engineering services tailored for modern web products.',
		},
		about: {
			title: 'About | Acme Services',
			description:
				'Meet the senior team shipping production-grade web experiences and design systems.',
		},
		pricing: {
			title: 'Pricing | Acme Services',
			description:
				'Transparent pricing for audits, retainers, and dedicated squads. No lock-in.',
		},
		contacts: {
			title: 'Contacts | Acme Services',
			description:
				'Reach the Acme Services team for project inquiries, partnerships, and support.',
		},
	},
	features: {
		fortuneWheel: {
			triggerLabel: 'Open the wheel',
			title: 'Fortune wheel',
			description: 'Spin the wheel to reveal a prize.',
			loading: 'Loading…',
			closeLabel: 'Close',
			doneLabel: 'Done',
			spinLabel: 'Spin',
			spinningLabel: 'Spinning…',
			idleStatus: 'Tap to try your luck',
			spinningStatus: 'Spinning…',
			resultPrefix: 'Result:',
			emptyPrizes: 'Add at least one prize to spin the wheel.',
			prizes: ['10% off', 'Free audit', 'Priority support', 'Bonus feature'],
		},
	},
}

const th: LocalizedContent = {
	locale: 'th',
	nav: {
		home: 'หน้าแรก',
		services: 'บริการ',
		about: 'เกี่ยวกับเรา',
		pricing: 'ราคา',
		contacts: 'ติดต่อ',
	},
	footer: {
		copyright: '© 2026 Acme Services สงวนลิขสิทธิ์',
		contact: 'อีเมล: contact@example.com',
	},
	pages: {
		home: {
			hero: {
				heading: 'สตูดิโอเว็บครบวงจรสำหรับธุรกิจยุคใหม่',
				lead: 'เราวางกลยุทธ์ ออกแบบ และพัฒนาเว็บที่เน้นประสิทธิภาพและการเติบโตตั้งแต่ต้นจนจบ',
				ctaLabel: 'นัดหมายพูดคุย',
			},
			sections: [
				{
					title: 'เราทำอะไร',
					body: 'กลยุทธ์ผลิตภัณฑ์ UX/UI และวิศวกรรมที่เน้นประสิทธิภาพตามตลาดของคุณ',
				},
				{
					title: 'ทำไมต้องเรา',
					body: 'ทีมอาวุโส โปร่งใส วัดผลได้ และใช้เครื่องมือทันสมัย',
				},
				{
					title: 'วิธีการทำงาน',
					body: 'สปรินต์แบบวนรอบ ระบุเป้าหมายชัด พร้อมปรับปรุงต่อเนื่อง',
				},
			],
		},
		services: {
			hero: {
				heading: 'บริการที่ออกแบบมาเพื่อส่งมอบและขยายผลได้รวดเร็ว',
				lead: 'แพ็กเกจกลยุทธ์ ดีไซน์ และวิศวกรรมสำหรับทีมที่ต้องการเติบโต',
			},
			sections: [
				{
					title: 'ค้นหาและวางกลยุทธ์',
					body: 'วิจัยตลาด วางตำแหน่งผลิตภัณฑ์ ผังเส้นทางผู้ใช้ และแผนการส่งมอบ',
				},
				{
					title: 'ดีไซน์ซิสเท็ม',
					body: 'ออกแบบเชิงอะตอม คอมโพเนนต์เข้าถึงได้ พร้อมคู่มือใช้งาน',
				},
				{
					title: 'วิศวกรรม',
					body: 'พัฒนา Next.js เชื่อมต่อ CMS ปรับปรุงประสิทธิภาพ ทดสอบอัตโนมัติ และ DevOps',
				},
			],
		},
		about: {
			hero: {
				heading: 'ทีมอาวุโสที่โฟกัสผลลัพธ์',
				lead: 'ทีมงานกระจายตัว ประกอบด้วยนักออกแบบ วิศวกร และนักกลยุทธ์ที่ส่งมอบระดับโปรดักชัน',
			},
			sections: [
				{
					title: 'ผู้นำทีม',
					body: 'นำโดยวิศวกรและดีไซเนอร์ระดับสตาฟที่มีประสบการณ์เปิดตัวผลิตภัณฑ์ทั่วโลก',
				},
				{
					title: 'กระบวนการ',
					body: 'ค้นหาอย่างกระชับ สร้างต้นแบบก่อน และปรับด้วยข้อมูลตั้งแต่วันแรก',
				},
				{
					title: 'เครื่องมือ',
					body: 'สแตกทันสมัยพร้อมการทดสอบ การเข้าถึง และการเฝ้าระวังระบบเป็นมาตรฐาน',
				},
			],
		},
		pricing: {
			hero: {
				heading: 'ราคาโปร่งใสสำหรับทุกช่วง',
				lead: 'เลือกแพ็กเกจหรือปรับแต่งตามต้องการ ไม่มีสัญญาผูกมัด ส่งมอบชัดเจน',
			},
			sections: [
				{
					title: 'Starter',
					body: 'สปรินต์ 2 สัปดาห์: ตรวจสอบระบบ รีเฟรช UX และปรับประสิทธิภาพ ค่าบริการคงที่',
				},
				{
					title: 'Growth',
					body: 'ดูแลรายเดือน: ส่งมอบตามโรดแมป ทดลองฟีเจอร์ และดูแลดีไซน์ซิสเท็ม',
				},
				{
					title: 'Dedicated squad',
					body: 'ทีมประจำพร้อม SLA ซัพพอร์ต และส่งมอบต่อเนื่อง',
				},
			],
		},
		contacts: {
			hero: {
				heading: 'พูดคุยเกี่ยวกับโปรเจ็กต์ถัดไปของคุณ',
				lead: 'บอกเป้าหมายและระยะเวลา เราตอบกลับภายใน 1 วันทำการ',
				ctaLabel: 'ส่งบรีฟ',
			},
			sections: [
				{
					title: 'อีเมล',
					body: 'contact@example.com',
				},
				{
					title: 'ที่ตั้ง',
					body: 'ทำงานระยะไกล มีฮับที่สิงคโปร์และกรุงเทพฯ',
				},
				{
					title: 'เวลาทำการ',
					body: 'จันทร์–ศุกร์ 09:00–18:00 น. (ICT)',
				},
			],
		},
	},
	seo: {
		home: {
			title: 'Acme Services | กลยุทธ์ ออกแบบ และวิศวกรรมเว็บ',
			description:
				'ทีม Next.js อาวุโส ดูแลกลยุทธ์ UX และพัฒนาเว็บที่มีประสิทธิภาพ',
			ogTitle: 'Acme Services — สตูดิโอเว็บอาวุโส',
			ogDescription: 'ออกแบบและพัฒนา Next.js ด้วยทีมอาวุโสที่เน้นผลลัพธ์',
		},
		services: {
			title: 'บริการ | Acme Services',
			description:
				'บริการค้นหา กลยุทธ์ ดีไซน์ซิสเท็ม และวิศวกรรมสำหรับเว็บยุคใหม่',
		},
		about: {
			title: 'เกี่ยวกับเรา | Acme Services',
			description:
				'รู้จักทีมอาวุโสที่ส่งมอบประสบการณ์เว็บและดีไซน์ซิสเท็มระดับโปรดักชัน',
		},
		pricing: {
			title: 'ราคา | Acme Services',
			description: 'ราคาโปร่งใสสำหรับการตรวจสอบระบบ แผนรายเดือน และทีมประจำ',
		},
		contacts: {
			title: 'ติดต่อ | Acme Services',
			description:
				'ติดต่อทีม Acme Services สำหรับโปรเจ็กต์ พาร์ทเนอร์ และการซัพพอร์ต',
		},
	},
	features: {
		fortuneWheel: {
			triggerLabel: 'หมุนวงล้อ',
			title: 'วงล้อเสี่ยงโชค',
			description: 'หมุนวงล้อเพื่อดูว่าคุณจะได้รางวัลอะไร',
			loading: 'กำลังโหลด…',
			closeLabel: 'ปิด',
			doneLabel: 'เสร็จสิ้น',
			spinLabel: 'หมุน',
			spinningLabel: 'กำลังหมุน…',
			idleStatus: 'แตะเพื่อเสี่ยงโชค',
			spinningStatus: 'กำลังหมุน…',
			resultPrefix: 'ผลลัพธ์:',
			emptyPrizes: 'เพิ่มรางวัลอย่างน้อยหนึ่งรายการก่อนหมุนวงล้อ',
			prizes: ['ส่วนลด 10%', 'ตรวจสอบระบบฟรี', 'ซัพพอร์ตพิเศษ', 'ฟีเจอร์โบนัส'],
		},
	},
}

const contentByLocale: Record<Locale, LocalizedContent> = {
	en,
	th,
}

// Возвращает локализованный словарь с запасным значением по умолчанию.
export const getContent = (locale: Locale = DEFAULT_LOCALE): LocalizedContent =>
	contentByLocale[locale] ?? contentByLocale[DEFAULT_LOCALE]

// Возвращает контент конкретной страницы для указанной локали.
export const getPageContent = (locale: Locale, page: PageKey): PageContent =>
	getContent(locale).pages[page]

// Возвращает SEO-поля для указанной страницы и локали.
export const getSeo = (locale: Locale, page: PageKey): SeoFields =>
	getContent(locale).seo[page]

// Возвращает тексты навигации для указанной локали.
export const getNav = (locale: Locale): NavigationContent =>
	getContent(locale).nav

// Возвращает содержимое футера для указанной локали.
export const getFooter = (locale: Locale): FooterContent =>
	getContent(locale).footer

// Возвращает словарь фич для указанной локали.
export const getFeatures = (locale: Locale): FeaturesContent =>
	getContent(locale).features

export const locales: Locale[] = [...SUPPORTED_LOCALES]

export const pagePathMap: Record<PageKey, string> = {
	home: '',
	services: '/services',
	about: '/about',
	pricing: '/pricing',
	contacts: '/contacts',
}
