export interface ConfigType {
  name: string;
  version: string;
  description: string;
  author: string;
  plugins: Record<string, string>
}
