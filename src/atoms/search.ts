import { sum } from '@toss/utils';
import { atom, useRecoilState } from 'recoil';
import { Poi } from '../models/poi';

const MAX_POI_LIST_LENGTH = 9;

const poiListAtom = atom<(Poi | null)[]>({
  key: 'poiList',
  default: [null, null],
});

export function usePoiList() {
  const [poiList, setPoiList] = useRecoilState(poiListAtom);

  const changePoiItem = (index: number, poi: Poi) => {
    setPoiList(prevPoiList => prevPoiList.map((poiItem, poiIndex) => (poiIndex === index ? poi : poiItem)));
  };

  const resetPoiItem = (index: number) => {
    setPoiList(prevPoiList => prevPoiList.map((poiItem, poiIndex) => (poiIndex === index ? null : poiItem)));
  };

  const removePoi = (index: number) => {
    setPoiList(prevPoiList => prevPoiList.filter((_, idx) => idx !== index));
  };

  const addEmptyPoi = () => setPoiList(prevPoiList => [...prevPoiList, null]);

  const getPoiByIndex = (index: number) => poiList[index];

  const getNotEmptyPoiList = () => {
    return poiList.filter(poi => poi != null) as Poi[];
  };

  const getNotEmptyPoiLength = () => {
    return getNotEmptyPoiList().length;
  };

  const getCenterOfPoiList = () => {
    const notEmptyPoiList = getNotEmptyPoiList();
    const poiLocations = notEmptyPoiList.map(poi => [poi.frontLat, poi.frontLon]);

    const centerLat = sum(poiLocations.map(([lat]) => lat).map(Number)) / notEmptyPoiList.length;
    const centerLon = sum(poiLocations.map(([, lon]) => lon).map(Number)) / notEmptyPoiList.length;

    return { lat: centerLat, lon: centerLon };
  };

  const isFullPoiList = () => {
    return poiList.length >= MAX_POI_LIST_LENGTH;
  };

  return {
    poiList,
    setPoiList,
    changePoiItem,
    addEmptyPoi,
    resetPoiItem,
    getPoiByIndex,
    removePoi,
    getNotEmptyPoiLength,
    getCenterOfPoiList,
    isFullPoiList,
  };
}
