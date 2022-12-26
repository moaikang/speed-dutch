export interface AdminDongCoord {
  lat: string;
  lon: string;
  latEntr: string;
  lonEntr: string;
}

export interface LegalDongCoord {
  lat: string;
  lon: string;
  latEntr: string;
  lonEntr: string;
}

export interface RoadCoord {
  lat: string;
  lon: string;
  latEntr: string;
  lonEntr: string;
}

export interface AddressInfo {
  fullAddress: string;
  addressKey: string;
  roadAddressKey: string;
  addressType: string;
  city_do: string;
  gu_gun: string;
  eup_myun: string;
  adminDong: string;
  adminDongCode: string;
  legalDong: string;
  legalDongCode: string;
  ri: string;
  roadName: string;
  buildingIndex: string;
  buildingName: string;
  mappingDistance: number;
  roadCode: string;
  bunji: string;
  adminDongCoord: AdminDongCoord;
  legalDongCoord: LegalDongCoord;
  roadCoord: RoadCoord;
}

export interface ReverseGeoCodeResult {
  addressInfo: AddressInfo;
}
