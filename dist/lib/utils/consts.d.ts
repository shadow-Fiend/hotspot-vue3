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
export declare const initialSwitchOptions: SwitchOptionsType;
export interface StyleOptionsType {
    zoneBorderColor: string;
    zoneBgColor: string;
    zoneActiveBgColor: string;
}
export declare const initialStyleOptions: StyleOptionsType;
