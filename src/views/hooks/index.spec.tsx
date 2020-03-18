import React, { FunctionComponent } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { render, wait } from '@testing-library/react';
import { useFetch } from './index';
// @ts-ignore  Cannot find module
import { noop } from '~/state/ducks';
// @ts-ignore  Cannot find module
import { sleep } from '~/utils';

describe('useFetch', () => {
  test('causes the containing component to be rendered twice around mounting', () => {
    // This spec is because the state is changed in the useFetch() after the first rendering.

    const checkValue = jest.fn();
    const Test: FunctionComponent<{ dataReady: boolean }> = ({ dataReady }) => {
      const fetching = useFetch(dataReady, { type: 'dataNotReady' }, { type: 'fetch' });
      checkValue(fetching);
      return <div />;
    };
    const store = createStore(() => {});

    render(
      <Provider store={store}>
        <Test dataReady />
      </Provider>,
    );
    expect(checkValue).toHaveBeenCalledTimes(2);
  });

  describe('called with noops', () => {
    test('returns false and then false, and dispatches the given 2 noops if dataReady is false', () => {
      const checkValue = jest.fn();
      const noopAction = noop();
      const Test: FunctionComponent<{ dataReady: boolean }> = ({ dataReady }) => {
        const fetching = useFetch(dataReady, noopAction, noopAction);
        checkValue(fetching);
        return <div />;
      };
      const reducer = jest.fn();
      const store = createStore(reducer);
      reducer.mockClear();

      render(
        <Provider store={store}>
          <Test dataReady={false} />
        </Provider>,
      );
      expect(checkValue).toHaveBeenCalledTimes(2);
      expect(checkValue).toHaveBeenNthCalledWith(1, false);
      expect(checkValue).toHaveBeenNthCalledWith(2, false);
      expect(reducer).toHaveBeenCalledTimes(2);
      expect(reducer).toHaveBeenNthCalledWith(1, undefined, noopAction);
      expect(reducer).toHaveBeenNthCalledWith(2, undefined, noopAction);
    });

    test('returns false and then false, and dispatches the given 1 noop if dataReady true', () => {
      const checkValue = jest.fn();
      const noopAction = noop();
      const Test: FunctionComponent<{ dataReady: boolean }> = ({ dataReady }) => {
        const fetching = useFetch(dataReady, noopAction, noopAction);
        checkValue(fetching);
        return <div />;
      };
      const reducer = jest.fn();
      const store = createStore(reducer);
      reducer.mockClear();

      render(
        <Provider store={store}>
          <Test dataReady />
        </Provider>,
      );
      expect(checkValue).toHaveBeenCalledTimes(2);
      expect(checkValue).toHaveBeenNthCalledWith(1, false);
      expect(checkValue).toHaveBeenNthCalledWith(2, false);
      expect(reducer).toHaveBeenCalledTimes(1);
      expect(reducer).toHaveBeenNthCalledWith(1, undefined, noopAction);
    });
  });

  describe('called with actions other than noop', () => {
    describe('around mounting', () => {
      test('returns true and then true, and dispatches the given 2 actions if dataReady is false', () => {
        const checkValue = jest.fn();
        const dataNotReadyAction = { type: 'dataNotReady' };
        const fetchAction = { type: 'fetchAction' };
        const Test: FunctionComponent<{ dataReady: boolean }> = ({ dataReady }) => {
          const fetching = useFetch(dataReady, dataNotReadyAction, fetchAction);
          checkValue(fetching);
          return <div />;
        };
        const reducer = jest.fn();
        const store = createStore(reducer);
        reducer.mockClear();

        render(
          <Provider store={store}>
            <Test dataReady={false} />
          </Provider>,
        );
        expect(checkValue).toHaveBeenCalledTimes(2);
        expect(checkValue).toHaveBeenNthCalledWith(1, true);
        expect(checkValue).toHaveBeenNthCalledWith(2, true);
        expect(reducer).toHaveBeenCalledTimes(2);
        expect(reducer).toHaveBeenNthCalledWith(1, undefined, dataNotReadyAction);
        expect(reducer).toHaveBeenNthCalledWith(2, undefined, fetchAction);
      });

      test('returns true and then false, and dispatches the given dataNotReadyAction if dataReady is true', () => {
        const checkValue = jest.fn();
        const dataNotReadyAction = { type: 'dataNotReady' };
        const fetchAction = { type: 'fetchAction' };
        const Test: FunctionComponent<{ dataReady: boolean }> = ({ dataReady }) => {
          const fetching = useFetch(dataReady, dataNotReadyAction, fetchAction);
          checkValue(fetching);
          return <div />;
        };
        const reducer = jest.fn();
        const store = createStore(reducer);
        reducer.mockClear();

        render(
          <Provider store={store}>
            <Test dataReady />
          </Provider>,
        );
        expect(checkValue).toHaveBeenCalledTimes(2);
        expect(checkValue).toHaveBeenNthCalledWith(1, true);
        expect(checkValue).toHaveBeenNthCalledWith(2, false);
        expect(reducer).toHaveBeenCalledTimes(1);
        expect(reducer).toHaveBeenNthCalledWith(1, undefined, dataNotReadyAction);
      });
    });

    describe('after a sequence of mounting', () => {
      test('returns false and dispatches no action if dataReady changes from false to true', async () => {
        const checkValue = jest.fn();
        const dataNotReadyAction = { type: 'dataNotReady' };
        const fetchAction = { type: 'fetchAction' };
        const Test: FunctionComponent<{ isDataReady: () => boolean }> = ({ isDataReady }) => {
          useSelector((state) => state); // just for this func to be called by store.dispatch().
          const fetching = useFetch(isDataReady(), dataNotReadyAction, fetchAction);
          checkValue(fetching);
          return <div />;
        };
        const reducer = jest.fn((state = {}) => {
          return {};
        });
        const store = createStore(reducer);

        const isDataReady = jest
          .fn()
          .mockReturnValueOnce(false) // This is used during the sequence of mounting.
          .mockReturnValueOnce(false) // This is used during the sequence of mounting, too.
          .mockReturnValueOnce(true); // This is used in the re-rendering.

        render(
          <Provider store={store}>
            <Test isDataReady={isDataReady} />
          </Provider>,
        );
        checkValue.mockClear();
        reducer.mockClear();

        const kickAction = { type: 'kick' };
        store.dispatch(kickAction); // This causes a re-rendering.
        expect(checkValue).toHaveBeenCalledTimes(1);
        expect(checkValue).toHaveBeenNthCalledWith(1, false);
        await sleep(1000);
        expect(reducer).toHaveBeenCalledTimes(1);
        expect(reducer).toHaveBeenNthCalledWith(1, {}, kickAction);
      });

      test('returns true and dispatches no action if dataReady changes from true to false', () => {
        const checkValue = jest.fn();
        const dataNotReadyAction = { type: 'dataNotReady' };
        const fetchAction = { type: 'fetchAction' };
        const Test: FunctionComponent<{ isDataReady: () => boolean }> = ({ isDataReady }) => {
          useSelector((state) => state); // just for this func to be called by store.dispatch().
          const fetching = useFetch(isDataReady(), dataNotReadyAction, fetchAction);
          checkValue(fetching);
          return <div />;
        };
        const reducer = jest.fn((state = {}) => {
          return {};
        });
        const store = createStore(reducer);

        const isDataReady = jest
          .fn()
          .mockReturnValueOnce(true) // This is used during the sequence of mounting.
          .mockReturnValueOnce(true) // This is used during the sequence of mounting, too.
          .mockReturnValueOnce(false); // This is used in the re-rendering.

        render(
          <Provider store={store}>
            <Test isDataReady={isDataReady} />
          </Provider>,
        );
        checkValue.mockClear();
        reducer.mockClear();

        const kickAction = { type: 'kick' };
        store.dispatch(kickAction); // This causes a re-rendering.
        expect(checkValue).toHaveBeenCalledTimes(1);
        expect(checkValue).toHaveBeenNthCalledWith(1, true);
        wait(() => {
          expect(reducer).toHaveBeenCalledTimes(2);
          expect(reducer).toHaveBeenNthCalledWith(1, {}, kickAction);
          expect(reducer).toHaveBeenNthCalledWith(2, {}, fetchAction);
        });
      });
    });
  });
});
