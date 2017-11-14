export const pushPage = (route) => ({
  type: 'PUSH_PAGE',
  route
});

export const postPush = () => ({
  type: 'POST_PUSH'
});

export const popPage = () => ({
  type: 'POP_PAGE'
});

export const postPop = () => ({
  type: 'POST_POP'
});

