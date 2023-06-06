import { useState, useEffect } from 'react';

import styles from 'src/styles/components/notification/ErrorNotification.module.css';

type Prop = {
  text: string;
  onCloseCallBack?: (args?: any) => void; // added optional argument
  onCloseCallBackArgs?: any; // added optional prop to pass arguments to onCloseCallBack
};

const ErrorNotification = ({
  text,
  onCloseCallBack,
  onCloseCallBackArgs,
}: Prop) => {
  const [showPopup, setShowPopup] = useState<boolean>(true);

  return (
    <>
      {showPopup ? (
        <div className={`${styles.container} ${styles.containerLyt}`}>
          <a
            href='#'
            className={`${styles.closeButton}`}
            role='button'
            onClick={() => {
              setShowPopup(false);
              if (onCloseCallBack) onCloseCallBack(onCloseCallBackArgs); // pass onCloseCallBackArgs to onCloseCallBack if it exists
            }}
          >
            close
          </a>
          <p className={`${styles.font}`}>{text}</p>
        </div>
      ) : null}
    </>
  );
};

export default ErrorNotification;
