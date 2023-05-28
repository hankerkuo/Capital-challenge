import React, { useState, useMemo, useRef, use } from 'react';
import useQuestfetch from 'src/hooks/useQuestfetch';
import PopupNotification from 'src/components/notification/PopupNotification';
import ErrorNotification from 'src/components/notification/ErrorNotification';
import styles from 'src/styles/ImageTagging.module.css';

interface FormData {
  country: string;
  capital: string;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

//TODO: [Important] do privilege gating
const WorldMapForm: React.FC = () => {
  const { quests, isLoading, isError, refetch } = useQuestfetch(197);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    capital: '',
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const [renewSignal, setRenewSignal] = useState(false);
  const [submitErrMsg, setSubmitErrMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const clickCircleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const filteredQuests = useMemo(() => {
    return quests?.filter((quest) => quest.YXAxisOnMap?.length === 0);
  }, [quests]);
  console.log(filteredQuests);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Send formData to the backend for further processing
    // post to backend
    const res = await fetch('/api/image-tagging', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (res.status !== 200) {
      setSubmitErrMsg((await res.json()).error);
    } else {
      console.log(formData);
      setRenewSignal(!renewSignal);
    }
  };

  const handleMapClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const mapWidth = event.currentTarget.offsetWidth;
    const mapHeight = event.currentTarget.offsetHeight;
    const x = (offsetX / mapWidth).toFixed(3);
    const y = (offsetY / mapHeight).toFixed(3);

    setFormData((prevData) => ({
      ...prevData,
      x: Number(x),
      y: Number(y),
      offsetX: offsetX,
      offsetY: offsetY,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDragging || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const offsetX = event.clientX - imageRect.left;
    const offsetY = event.clientY - imageRect.top;

    setFormData((prevData) => ({
      ...prevData,
      offsetX,
      offsetY,
    }));
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNextQuest = () => {
    const nextIndex = currentQuestIndex + 1;
    if (!filteredQuests) return;
    if (nextIndex < filteredQuests.length) {
      setCurrentQuestIndex(nextIndex);
      setFormData((prevData) => ({
        ...prevData,
        country: filteredQuests[nextIndex].country,
        capital: filteredQuests[nextIndex].capital[0],
      }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={`${styles.font}`}>
      <div>
        <label htmlFor='country'>Country:</label>
        <input
          type='text'
          id='country'
          name='country'
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <button type='button' onClick={handleNextQuest}>
          Next
        </button>
      </div>
      <div>
        <label htmlFor='capital'>Capital:</label>
        <input
          type='text'
          id='capital'
          name='capital'
          value={formData.capital}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor='x'>X Axis:</label>
        <input
          type='number'
          id='x'
          name='x'
          value={formData.x}
          onChange={handleInputChange}
          step={0.01}
          min={0}
          max={1}
          readOnly
        />
      </div>
      <div>
        <label htmlFor='y'>Y Axis:</label>
        <input
          type='number'
          id='y'
          name='y'
          value={formData.y}
          onChange={handleInputChange}
          step={0.01}
          min={0}
          max={1}
          readOnly
        />
      </div>
      <div className={`${styles.imageContainerPos}`}>
        <img
          src='/world-map/shokunin_World_Map.svg'
          alt='World Map'
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={imageRef}
          width='1000'
        />
        <div
          className={`${styles.clickCircle}`}
          style={{ left: formData.offsetX, top: formData.offsetY }}
          ref={clickCircleRef}
        />
      </div>

      <div>
        <button disabled={isLoading} type='submit'>
          Submit
        </button>
      </div>
      <div>
        <PopupNotification
          renewSignal={renewSignal}
          text={'update map success'}
        />
        {submitErrMsg !== '' && (
          <ErrorNotification
            text={submitErrMsg}
            onCloseCallBack={setSubmitErrMsg}
            onCloseCallBackArgs={''}
          />
        )}
      </div>
    </form>
  );
};

export default WorldMapForm;
