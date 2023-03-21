export {};

declare global {
  interface Provider {
    title: string;
    description: string;
    flags: string[];
  }
}