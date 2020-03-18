import { useState, useEffect, EffectCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Action } from 'redux';
import { noop } from '~/state/ducks';

/**
 * Registers an effect with the given callback and no deps.
 *
 * @param callback - A callback.
 */
export const useComponentDidMount = (callback: EffectCallback) => {
  useEffect(callback, []);
};

/**
 * Fetches data when the component is mounted or the data is not ready.
 *
 * @param dataReady - True if the data is ready; false otherwise.
 * @param dataNotReadyAction - An action to set a data ready flag to false.
 * @param fetchAction - An action to actually start fetching data.
 * @returns True if a fetch is ongoing; false otherwise (i.e. the fetch is done).
 */
export const useFetch = (
  dataReady: boolean,
  dataNotReadyAction: Action<string>,
  fetchAction: Action<string>,
): boolean => {
  const dispatch = useDispatch();
  const [willMount, setWillMount] = useState(true);
  useComponentDidMount(() => {
    setWillMount(false);
    dispatch(dataNotReadyAction);
  });
  useEffect(() => {
    if (!dataReady) {
      dispatch(fetchAction);
    }
  }, [dataReady, dispatch, fetchAction]);

  return fetchAction.type === noop().type ? false : willMount || !dataReady;
};

/**
 * Gets query parameters.
 *
 * @returns a URLSearchParams object.
 */
export const useQuery = () => new URLSearchParams(useLocation().search);
