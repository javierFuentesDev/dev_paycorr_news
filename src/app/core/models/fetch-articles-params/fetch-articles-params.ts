export interface FetchArticlesParams {
  sort: string;
  query?: string;
  page: number;
  begin_date: string | Date;
  end_date: string | Date;
  fl?: string;
}
