import { useState, useEffect } from 'react';

import styles from 'src/styles/components/notification/ErrorNotification.module.css'

const ErrorNotification = ({ text }: { text: string }) => {
  const [showPopup, setShowPopup] = useState<boolean>(true);

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

export default ErrorNotification