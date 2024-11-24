// artists.model.ts
export interface Artist {
  id: number;
  artist: string; // Ensure this matches the backend property
  genre?: string;
}
