// Types personnalisés pour les routes Next.js

export type RouteContext<T extends Record<string, string> = Record<string, string>> = {
  params: Promise<T>;
}

export type ParamCheck<T> = {
  __tag__: string;
  __param_position__: string;
  __param_type__: {
    params: T;
    request?: Request;
  };
}

// Type utilitaire pour les routes GET
export type GetRouteParams<T extends Record<string, string>> = ParamCheck<RouteContext<T>> & {
  __tag__: 'GET';
  __param_position__: 'second';
}
