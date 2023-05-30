// A map to show the location of the country
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
      circle.style.top = props.y ? `${props.y * 100}%` : '0';
      circle.style.left = props.x ? `${props.x * 100}%` : '0';
    }
  }, [props.y, props.x]);
  return (
    <div className={`${styles.container}`}>
      <picture>
        <img
          className={`${styles.mapLyt}`}
          src='/world-map/shokunin_World_Map.svg'
          alt='World Map'
        />
      </picture>
      {props.x && props.y ? (
        <div
          data-testid='circle'
          ref={circleRef}
          className={`${styles.circle}`}
        ></div>
      ) : null}
    </div>
  );
};
export default WorldMap;
