export const size = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560
};

const sizePx = {
    mobileS: `${size.mobileS}px`,
    mobileM: `${size.mobileM}px`,
    mobileL: `${size.mobileL}px`,
    tablet: `${size.tablet}px`,
    laptop: `${size.laptop}px`,
    laptopL: `${size.laptopL}px`,
    desktop: `${size.desktop}px`
};

export const device = {
    mobileS: `(min-width: ${sizePx.mobileS})`,
    mobileM: `(min-width: ${sizePx.mobileM})`,
    mobileL: `(min-width: ${sizePx.mobileL})`,
    tablet: `(min-width: ${sizePx.tablet})`,
    laptop: `(min-width: ${sizePx.laptop})`,
    laptopL: `(min-width: ${sizePx.laptopL})`,
    desktop: `(min-width: ${sizePx.desktop})`,
    desktopL: `(min-width: ${sizePx.desktop})`
};