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
    return 24;
  } else if (isTablet) {
    return 28;
  } else {
    return 32;
  }
};

export const getMaxWidthCarousel = (isMobile, isTablet) => {
  if (isMobile) {
    return '100%';
  } else if (isTablet) {
    return '90%';
  } else {
    return '80%';
  }
};

export const getImageContainerHeigth = (isMobile, isTablet) => {
  if (isMobile) {
    return 220;
  } else if (isTablet) {
    return 280;
  } else {
    return 350;
  }
};

export const getCarouselArrowSize = (isMobile, isTablet) => {
  if (isMobile) {
    return 38;
  } else if (isTablet) {
    return 48;
  } else {
    return 56;
  }
};
export const getCarouselDotGap = (isMobile, isTablet) => {
  if (isMobile) {
    return 1.5;
  } else if (isTablet) {
    return 2;
  } else {
    return 3;
  }
};

export const getCarouselDotWidth = (isMobile, isTablet, condition) => {
  if (condition) {
    if (isMobile) {
      return 20;
    } else if (isTablet) {
      return 24;
    } else {
      return 28;
    }
  } else {
    if (isMobile) {
      return 10;
    } else if (isTablet) {
      return 12;
    } else {
      return 16;
    }
  }
};
