import { useWindowDimensions } from 'react-native';

export const useCardDimensions = (hidden: boolean=false) => {
  const { width: screenWidth } = useWindowDimensions();

  let width = screenWidth - 32;
  if(screenWidth>=768) width = 300;
  if(screenWidth>=1024) width = 340;
  if(screenWidth>=1200) width = 400;
   
  const height = hidden ? width / 2 : width;
  
  return {
    width,
    height,
  };
}
