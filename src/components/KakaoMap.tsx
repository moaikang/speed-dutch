import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

const APP_KEY = '2d1322e7d17a2bd761063469d6dd3c97';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  lat: number;
  lon: number;
}

// TODO(근우): DarkMode 적용
function KakaoMap({ lat, lon }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any | null>(null);

  const initMap = useCallback(() => {
    if (mapContainerRef.current) {
      const { kakao } = window;
      const kakaoMap = new kakao.maps.Map(mapContainerRef.current, {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      });

      setMapInstance(kakaoMap);
    }
  }, [lat, lon]);

  const setMarker = useCallback(() => {
    const { kakao } = window;

    const imageSize = new kakao.maps.Size(66, 86); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(33, 86) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage('/center-marker.svg', imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lon),
      image: markerImage,
    });

    marker.setMap(mapInstance);
  }, [lat, lon, mapInstance]);

  useEffect(() => {
    if (window.kakao == null) {
      return;
    }

    if (mapInstance == null) {
      initMap();
    }

    setMarker();
  }, [initMap, setMarker]);

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
          height: '100vh',
        }}
      />
    </>
  );
}

export default KakaoMap;
