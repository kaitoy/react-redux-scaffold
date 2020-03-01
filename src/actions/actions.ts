export function zundokoButtonClicked() {
  return { type: 'ZUNDOKO_BUTTON_CLICKED' };
}

export function zundokoFetchSucceeded(payload: { zundoko: string }) {
  return { type: 'ZUNDOKO_FETCH_SUCCEEDED', payload };
}

export function zundokoFetchFailed(payload: Object) {
  return { type: 'ZUNDOKO_FETCH_FAILED', payload, error: true };
}

export function kiyoshied() {
  return { type: 'KIYOSHIED' };
}
