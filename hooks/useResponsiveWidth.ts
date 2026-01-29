import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export enum Orientation {
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE",
}

export const useResponsiveWidth = () => {
  const {width: _width, height} = useWindowDimensions();
  
  const orientation = useMemo(() => {
    if (_width < height) return Orientation.PORTRAIT;
    return Orientation.LANDSCAPE;
  }, [_width, height]);

  const width = useMemo(() => {
    if (_width < 700) return _width;
    return _width * 0.8;
  }, [_width]);

  const numColumns = useMemo(() => {
    if (width < 700) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
  }, [width]);

  return { width, height,numColumns, orientation };
}
