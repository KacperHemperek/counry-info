export interface Context {
  theme: string | boolean | (() => void);
  toggleTheme: string | boolean | (() => void);
}
