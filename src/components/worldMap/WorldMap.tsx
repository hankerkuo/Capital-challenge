// TODO: add a map to show the location of the country
// we can have a world map base svg and then add a point to the country
// with some animation
import styles from 'src/styles/components/worldMap/WorldMap.module.css';

const WorldMap = () => {
  return (
    <div className={`${styles.container}`}>
      <img src='/world-map/shokunin_World_Map.svg' />
      <div className={`${styles.circle} ${styles.circle1}`}></div>
      <div className={`${styles.circle} ${styles.circle2}`}></div>
    </div>
  );
};
export default WorldMap;
