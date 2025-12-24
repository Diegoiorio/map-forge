export type Database = {
  public: {
    Tables: {
      map_forge_maps: {
        Row: {
          id: number;
          name: string;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          url?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
