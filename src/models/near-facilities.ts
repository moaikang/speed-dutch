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

export interface Poi {
  id: string;
  name: string;
  telNo: string;
  frontLat: string;
  frontLon: string;
  noorLat: string;
  noorLon: string;
  upperAddrName: string;
  middleAddrName: string;
  lowerAddrName: string;
  detailAddrName: string;
  mlClass: string;
  firstNo: string;
  roadName: string;
  buildingNo1: string;
  buildingNo2: string;
  rpFlag: string;
  radius: string;
  dataKind: string;
  stId: string;
  highHhSale: string;
  minOilYn: string;
  oilBaseSdt: string;
  pkey: string;
  evChargers: EvChargers;
  secondNo: string;
  parkFlag: string;
  merchantFlag: string;
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

export interface GetNearFacilitiesResponse {
  searchPoiInfo: SearchPoiInfo;
}
