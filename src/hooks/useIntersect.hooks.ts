import { useState, useEffect, useCallback } from 'react';

const useIntersect = ({ onIntersect, target, isLoading, page }) => {
  useEffect(() => {
    let observer;
    if (target && !isLoading) {
      observer = new IntersectionObserver(onIntersect, {
        root: target,
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, isLoading, page]);
};

export default useIntersect;
