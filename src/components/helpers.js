export const getHeigth = (isMobile, isTablet) => {
  if (isMobile) {
    return '5vh';
  } else if (isTablet) {
    return '6vh';
  } else {
    return '7vh';
  }
};

export const getMinnHeight = (isMobile, isTablet) => {
  if (isMobile) {
    return 48;
  } else if (isTablet) {
    return 56;
  } else {
    return 64;
  }
};

export const getLogoHeigth = (isMobile, isTablet) => {
  if (isMobile) {
    return 22;
  } else if (isTablet) {
    return 24;
  } else {
    return 28;
  }
};

