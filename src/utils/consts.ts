export interface ZoneType {
  topPer: number;
  leftPer: number;
  widthPer: number;
  heightPer: number;
  url?: string | any;
  active?: boolean;
  key?: string;
}

export interface ZonePositionType {
  heightPer: number;
  leftPer: number;
  topPer: number;
  widthPer: number;
}

export interface ZonesInfoType {
  info: ZonePositionType;
  index: number;
}

export interface SwitchOptionsType {
  isShowSign: boolean;
  isShowDelete: boolean;
  isOverlap: boolean;
  isShowActive: boolean;
}

export const initialSwitchOptions = {
  isShowSign: true,
  isShowDelete: true,
  isOverlap: false,
  isShowActive: true
} as SwitchOptionsType;

export interface StyleOptionsType {
  zoneBorderColor: string;
  zoneBgColor: string;
  zoneActiveBgColor: string;
}

export const initialStyleOptions = {
  zoneBorderColor: "#507bfb",
  zoneBgColor: "rgba(80, 123, 251, 0.1)",
  zoneActiveBgColor: "rgba(80, 123, 251, 0.4)"
} as StyleOptionsType;
