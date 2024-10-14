import { useEffect, useState, useRef } from 'react';
import styles from './progressBar.module.scss';
import Router from 'next/router';

export default function Progress() {
  const timerRef:any = useRef(null);
  const previousUrlRef = useRef("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = (url:any) => {
      if (url !== previousUrlRef.current) {
        previousUrlRef.current = url;
        setProgress(1);
        increment();
      }
    };

    const increment = () => {
      const timeout = 100;
      setProgress((prevProgress) => {
        const percent = Math.round(prevProgress + Math.random() * 10);
        const next = Math.min(prevProgress + percent, 80);
        if (next < 80) {
          timerRef.current = setTimeout(increment, timeout);
          return next;
        }
        return 80;
      });
    };

    const complete = () => {
      clearTimeout(timerRef.current);
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 250);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', complete);
    Router.events.on('routeChangeError', complete);

    return () => {
      clearTimeout(timerRef.current);
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
      Router.events.off('routeChangeError', complete);
    };
  }, []);

  return (
    <div className={`${styles['progress']}`}>
      <div
        className={styles.indicator}
        style={{
          width: `${progress}%`,
          opacity: progress > 0 && progress < 100 ? 1 : 0,
        }}
      />
    </div>
  );
}
