import assert from 'assert';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Coordinate } from '../models/coordinate';
import { px } from '../utils/css';
import { calculateWindowHeightExceptBottomSheet } from '../utils/layout/BottomSheet';

const APP_KEY = '2d1322e7d17a2bd761063469d6dd3c97';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  centerCoordinate: Coordinate;
  selectCoordinate?: Coordinate;
}

// TODO(근우): DarkMode 적용
function KakaoMap({ centerCoordinate, selectCoordinate }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any | null>(null);

  const initMap = useCallback(() => {
    if (mapContainerRef.current) {
      const { kakao } = window;
      const kakaoMap = new kakao.maps.Map(mapContainerRef.current, {
        center: new kakao.maps.LatLng(centerCoordinate.lat, centerCoordinate.lon),
        level: 3,
      });

      setMapInstance(kakaoMap);
    }
  }, [centerCoordinate.lat, centerCoordinate.lon]);

  const setCenterMarker = useCallback(() => {
    const { kakao } = window;

    const imageSize = new kakao.maps.Size(66, 86); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(33, 86) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage('/center-marker.svg', imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(centerCoordinate.lat, centerCoordinate.lon),
      image: markerImage,
    });

    marker.setMap(mapInstance);
  }, [centerCoordinate.lat, centerCoordinate.lon, mapInstance]);

  const setSelectMarker = useCallback(() => {
    assert(selectCoordinate != null);
    const { kakao } = window;

    const imageSize = new kakao.maps.Size(36, 44); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(18, 22) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage('/select-marker.svg', imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(selectCoordinate.lat, selectCoordinate.lon),
      image: markerImage,
    });

    marker.setMap(mapInstance);
    return marker;
  }, [selectCoordinate, mapInstance]);

  const panToMarker = useCallback(
    (marker: any) => {
      const moveTargetLatLon = marker.getPosition();
      mapInstance.panTo(moveTargetLatLon);
    },
    [mapInstance],
  );

  useEffect(() => {
    if (window.kakao == null) {
      return;
    }

    if (mapInstance == null) {
      initMap();
    }

    setCenterMarker();
  }, [initMap, setCenterMarker, mapInstance]);

  useEffect(() => {
    if (mapInstance == null) {
      return;
    }

    if (selectCoordinate == null) {
      return;
    }

    const selectMarker = setSelectMarker();
    panToMarker(selectMarker);

    return () => {
      if (selectMarker) {
        selectMarker.setMap(null);
      }
    };
  }, [mapInstance, selectCoordinate, setSelectMarker, panToMarker]);

  const calcualteMapHeight = () => {
    const windowHeightWithoutBottomSheet = calculateWindowHeightExceptBottomSheet();
    return windowHeightWithoutBottomSheet ? px(windowHeightWithoutBottomSheet + 16) : '100vh';
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div
        ref={mapContainerRef}
        style={{
          width: '100vw',
          maxWidth: '768px',
          transform: 'translateX(-16px)',
          height: calcualteMapHeight(),
        }}
      />
    </>
  );
}

export default KakaoMap;
