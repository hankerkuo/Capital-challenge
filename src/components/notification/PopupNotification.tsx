import { useState, useEffect } from 'react';

import styles from 'src/styles/components/notification/PopupNotification.module.css'

const PopupNotification = ({ renewSignal, text }: { renewSignal:boolean, text: string }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    setShowPopup(true);
  }, [renewSignal]);

  useEffect(() => {
    setShowPopup(false);
  }, []);

  return (
    <>
      {showPopup ?
        <div className={`${styles.container} ${styles.containerLyt}`}>
          <a href="#" className={`${styles.closeButton}`} 
            role="button" onClick={() => setShowPopup(false)}>close</a>
          <p className={`${styles.font}`}>{text}</p>
        </div>
        : null}
    </>
  );
}

export default PopupNotification