import { countryFromPath, countryPath, isCountryPage, stripCountryPrefix } from "@/data/countries";

export type AppLanguage = "ar" | "en";

export const ENGLISH_PREFIX = "/en";

export function isEnglishPath(pathname: string) {
  return pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`);
}

export function languageFromPath(pathname: string): AppLanguage {
  return isEnglishPath(pathname) ? "en" : "ar";
}

export function stripLanguagePrefix(pathname: string) {
  if (pathname === ENGLISH_PREFIX) {
    return "/";
  }

  if (pathname.startsWith(`${ENGLISH_PREFIX}/`)) {
    return pathname.slice(ENGLISH_PREFIX.length) || "/";
  }

  return pathname || "/";
}

export function localizePath(path: string, language: AppLanguage) {
  const normalized = path === "" ? "/" : path;

  if (language === "ar") {
    return stripLanguagePrefix(normalized);
  }

  const basePath = stripLanguagePrefix(normalized);
  return basePath === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${basePath}`;
}

/**
 * A link target as seen from the page at `pathname`: inside a country version ("/ar-sa/…") the pages
 * that version has stay in it, everything else goes to the main Arabic or English site.
 */
export function localizeFor(path: string, pathname: string) {
  const country = countryFromPath(pathname);
  if (country) return isCountryPage(path) ? countryPath(country, path) : localizePath(path, "ar");
  return localizePath(path, languageFromPath(pathname));
}

export function alternateLanguagePath(pathname: string) {
  const country = countryFromPath(pathname);
  if (country) {
    // Country versions are Arabic; their English switch goes to the matching English page.
    const page = stripCountryPrefix(pathname);
    return page === "/cod" || page === "" ? ENGLISH_PREFIX : localizePath(page, "en");
  }
  const language = languageFromPath(pathname);
  // The learning center is Arabic only, so its English switch lands on the English home page.
  if (language === "ar" && (pathname === "/learn" || pathname.startsWith("/learn/") || pathname === "/answers")) return ENGLISH_PREFIX;
  return localizePath(pathname, language === "en" ? "ar" : "en");
}

export function htmlLangForPath(pathname: string) {
  return isEnglishPath(pathname) ? "en" : "ar";
}

export function htmlDirForPath(pathname: string) {
  return isEnglishPath(pathname) ? "ltr" : "rtl";
}
