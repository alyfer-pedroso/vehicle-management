export type MarkerData = {
  id: string;
  lat: number;
  lng: number;
};

export interface MapProps {
  markers: MarkerData[];
}
