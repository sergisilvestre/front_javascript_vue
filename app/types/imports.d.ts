declare module "#imports" {
  export function useRouter(): {
    push: (path: string) => Promise<void> | void;
  };

  export function useApi(): {
    request: any;
  };
}