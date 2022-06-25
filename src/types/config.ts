export interface ConfigType {
  name: string;
  version: string;
  description: string;
  author: string;
  type: 'server' | 'plugin';
  plugins: Record<string, string>;
}
