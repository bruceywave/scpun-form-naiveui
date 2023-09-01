import { NDateLocale, NLocale, dateZhCN, zhCN } from "naive-ui";
import { LocaleSetting } from "../../types/config";
import { LOCALE } from "../settings/localeSetting";

interface NaiveLocale {
	locale: NLocale;
	dateLocale: NDateLocale;
}

export const LOCALE_CACHE_NAME = "i18n.local";

export function setlocaleInfo(info: Partial<LocaleSetting>) {
	localStorage.setItem(LOCALE_CACHE_NAME, JSON.stringify(info));
}

export function getLocaleInfo(): Partial<LocaleSetting> {
	const localeInfo = localStorage.getItem(LOCALE_CACHE_NAME);
	if (localeInfo) {
		return JSON.parse(localeInfo);
	}
	return {};
}

export function getLocale() {
	const localeInfo = getLocaleInfo();
	return computed(() => localeInfo?.locale ?? LOCALE.ZH_CN);
}

export function getNaiveLocale() {
	const loacle = getLocale();
	return computed<NaiveLocale | null>(() =>
		loacle.value === "zh_CN"
			? {
					locale: zhCN,
					dateLocale: dateZhCN,
			  }
			: null
	);
}
