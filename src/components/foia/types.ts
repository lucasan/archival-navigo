
export interface FOIARecord {
  id: number;
  foia_number: string | null;
  title: string | null;
  processed_by: string | null;
  scope: string | null;
  created_at: string;
}

export interface FetchFOIAResponse {
  records: FOIARecord[];
  totalCount: number;
}
