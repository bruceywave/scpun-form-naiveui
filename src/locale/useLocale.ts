/**
 * Multi-language related operations
 */
import { LocaleType } from "../../types/config";
import { setlocaleInfo } from "../utils/localeUtils";
import { loadLocalePool, setHtmlPageLang } from "./helper";
import { i18n } from "./setupI18n";

interface LangModule {
	message: Recordable;
	// momentLocale: Recordable;
	// momentLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
	if (i18n.mode === "legacy") i18n.global.locale = locale;
	else (i18n.global.locale as any).value = locale;

	setlocaleInfo({ locale });
	setHtmlPageLang(locale);
}

export function useLocale() {
	const getLocale = computed(() => getLocale() as string);

	// const getAntdLocale = computed((): any => {
	//   return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
	// });

	// Switching the language will change the locale of useI18n
	// And submit to configuration modification
	async function changeLocale(locale: LocaleType) {
		const globalI18n = i18n.global;
		const currentLocale = unref(globalI18n.locale);
		if (currentLocale === locale) return locale;

		if (loadLocalePool.includes(locale)) {
			setI18nLanguage(locale);
			return locale;
		}
		const langModule = ((await import(`./lang/${locale}.ts`)) as any)
			.default as LangModule;
		if (!langModule) return;

		const { message } = langModule;

		globalI18n.setLocaleMessage(locale, message);
		// moment.updateLocale(momentLocaleName, momentLocale);
		loadLocalePool.push(locale);

		setI18nLanguage(locale);
		return locale;
	}

	return {
		getLocale,
		changeLocale,
		// getAntdLocale,
	};
}
