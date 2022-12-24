export interface EvCharger {
  operatorId: string;
  stationId: string;
  chargerId: string;
  status: string;
  type: string;
  powerType: string;
  operatorName: string;
  chargingDateTime: string;
  updateDateTime: string;
  isFast: string;
  isAvailable: string;
}

export interface EvChargers {
  evCharger: EvCharger[];
}

export interface GroupSub {
  subPkey: string;
  subSeq: string;
  subName: string;
  subCenterY: string;
  subCenterX: string;
  subNavY: string;
  subNavX: string;
  subRpFlag: string;
  subPoiId: string;
  subNavSeq: string;
  subParkYn: string;
  subClassCd: string;
  subClassNmA: string;
  subClassNmB: string;
  subClassNmC: string;
  subClassNmD: string;
}

export interface GroupSubLists {
  groupSub: GroupSub[];
}

export interface NewAddress {
  centerLat: string;
  centerLon: string;
  frontLat: string;
  frontLon: string;
  roadName: string;
  bldNo1: string;
  bldNo2: string;
  roadId: string;
  fullAddressRoad: string;
}

export interface NewAddressList {
  newAddress: NewAddress[];
}

export interface Poi {
  id: string;
  pkey: string;
  navSeq: string;
  collectionType: string;
  name: string;
  telNo: string;
  frontLat: string;
  frontLon: string;
  noorLat: string;
  noorLon: string;
  upperAddrName: string;
  middleAddrName: string;
  lowerAddrName: string;
  detailAddrname: string;
  mlClass: string;
  firstNo: string;
  secondNo: string;
  roadName: string;
  firstBuildNo: string;
  secondBuildNo: string;
  radius: string;
  upperBizName: string;
  middleBizName: string;
  lowerBizName: string;
  detailBizName: string;
  rpFlag: string;
  parkFlag: string;
  detailInfoFlag: string;
  desc: string;
  dataKind: string;
  zipCode: string;
  evChargers: EvChargers;
  groupSubLists: GroupSubLists;
  newAddressList: NewAddressList;
}

export interface Pois {
  poi: Poi[];
}

export interface SearchPoiInfo {
  totalCount: string;
  count: string;
  page: string;
  pois: Pois;
}

export interface GetPOIListResponse {
  searchPoiInfo: SearchPoiInfo;
}
