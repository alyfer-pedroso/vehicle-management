import type { MarkerData } from "./google";

export enum VehicleIgnition {
  ON = "Ligado",
  OFF = "Desligado",
}

export interface Root {
  statusCode: number;
  message: string;
  content: Content;
}

export interface Content {
  vehicles: Vehicle[];
  locationVehicles?: LocationVehicle[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface Vehicle {
  id: string;
  plate: string;
  fleet?: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}

export interface LocationVehicle extends MarkerData {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: VehicleIgnition;
  createdAt: string;
}
