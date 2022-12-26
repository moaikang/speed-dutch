import Head from 'next/head';
import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';

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

function KakaoMap({ lat, lon }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(() => {
    if (mapRef.current) {
      const { kakao } = window;
      kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      });
    }
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
        }}
      />
    </>
  );
}

export default KakaoMap;
