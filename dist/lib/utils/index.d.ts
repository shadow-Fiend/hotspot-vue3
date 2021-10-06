import { ZoneType, ZonePositionType } from "./consts";
interface OffsetInfo {
    width: number;
    height: number;
}
interface InitPositionInfo {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}
interface PositionInfo {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface UtilsInfo {
    MIN_LIMIT: number;
    DECIMAL_PLACES: number;
    getMultiple: (decimalPlaces?: number) => number;
    decimalPoint: (num?: number) => number;
    getOffset: (element: HTMLElement) => OffsetInfo;
    getPageX: (e: MouseEvent | TouchEvent) => number;
    getPageY: (e: MouseEvent | TouchEvent) => number;
    getDistanceX: (e: MouseEvent | TouchEvent, container: Element) => number;
    getDistanceY: (e: MouseEvent | TouchEvent, container: Element) => number;
    dealEdgeValue: (itemInfo: PositionInfo, styleInfo: InitPositionInfo, container: OffsetInfo) => PositionInfo;
    dealTL: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealTC: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealTR: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealCL: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealCR: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealBL: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealBC: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    dealBR: (itemInfo: PositionInfo, moveX: number, moveY: number, minLimit?: number) => PositionInfo;
    judgemerge: (targetMin: number, targetMax: number, cMin: number, cMax: number) => boolean;
    determineOverlap: (othersZones: ZoneType[], currentZone: ZonePositionType) => boolean;
}
declare const _: UtilsInfo;
export default _;
declare const deepClone: (obj: any) => any;
export { deepClone };
