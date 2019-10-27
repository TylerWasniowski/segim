// @flow

export const HomeRoute: string = '/';

export const ImageRoute: ?string => string = imageId => `/image/${imageId || ":imageId"}`;