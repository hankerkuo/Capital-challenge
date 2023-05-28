// TODO: add a map to show the location of the country
// we can have a world map base svg and then add a point to the country
// with some animation
import { useRef, useEffect } from 'react';
import styles from 'src/styles/components/worldMap/WorldMap.module.css';

type Props = {
  y: number | null;
  x: number | null;
};
const WorldMap = (props: Props) => {
  const circleRef = useRef(null);
  useEffect(() => {
    if (circleRef.current) {
      const circle = circleRef.current as HTMLDivElement;
      circle.style.top = props.y ? `${props.y * 100}%`: '0';
      circle.style.left = props.x ? `${props.x * 100}%`: '0';
    }
  }, [props.y, props.x])
  return (
    <div className={`${styles.container}`}>
      <img className={`${styles.mapLyt}`} src='/world-map/shokunin_World_Map.svg' />
      {props.x && props.y ? <div ref={circleRef} className={`${styles.circle}`}></div> : null}
    </div>
  );
};
export default WorldMap;
