import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export enum Orientation {
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE",
}

export const useResponsiveWidth = () => {
  const { width: screenWidth, height } = useWindowDimensions();
  
  const orientation = useMemo(() => {
    if (screenWidth < height) return Orientation.PORTRAIT;
    return Orientation.LANDSCAPE;
  }, [screenWidth, height]);

  const width = useMemo(() => {
    if (screenWidth < 768) return screenWidth;
    return Math.min(screenWidth * 0.8, 1200);
  }, [screenWidth]);

  const numColumns = useMemo(() => {
    if (screenWidth < 768) return 1;
    if (screenWidth < 1024) return 2;
    return 3
  }, [screenWidth]);

  return { width, height, numColumns, orientation };
}
