export interface Sessions {
  id: number;
  date: Date;
  project_name: string;
  duration_minutes: number;
  topic: string;
  notes: string;
  blockers: string;
  focus_score: number;
  user_id: number;
}

export interface NewSession {
  date: Date;
  project_name: string;
  duration_minutes: number;
  topic: string;
  notes: string;
  blockers: string;
  focus_score: number;
  user_id: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
