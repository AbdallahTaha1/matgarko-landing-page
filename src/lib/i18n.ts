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

export function alternateLanguagePath(pathname: string) {
  const language = languageFromPath(pathname);
  return localizePath(pathname, language === "en" ? "ar" : "en");
}

export function htmlLangForPath(pathname: string) {
  return isEnglishPath(pathname) ? "en" : "ar";
}

export function htmlDirForPath(pathname: string) {
  return isEnglishPath(pathname) ? "ltr" : "rtl";
}
