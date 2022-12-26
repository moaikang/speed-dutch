import { useRouter } from 'next/router';
import KakaoMap from '../components/TMap';

interface Props {}

function SearchResult({}: Props) {
  const router = useRouter();
  const { lat, lon } = router.query;

  if (lat == null || lon == null) {
    return <div>엥</div>;
  }

  return (
    <>
      <KakaoMap lat={Number(lat)} lon={Number(lon)} />
    </>
  );
}

export default SearchResult;
