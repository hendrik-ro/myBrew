export type Metadata = {
  total?: number;
  by_state?: Record<string, number>;
  by_country?: Record<string, number>;
  by_type?: Record<string, number>;
  page?: number;
  per_page?: number;
};

export type CountryMeta = {
  total: number;
  page: number;
  per_page: number;
};
