export const themeConfig = {
  attribute: "class" as const,
  defaultTheme: "system" as const,
  enableSystem: true,
  disableTransitionOnChange: true,
};

export const themeScriptConfig = {
  attribute: themeConfig.attribute,
  defaultTheme: themeConfig.defaultTheme,
  enableSystem: themeConfig.enableSystem,
};
