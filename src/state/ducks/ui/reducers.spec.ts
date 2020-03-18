import { uiReducer } from './reducers';
import { UIState } from './index';
import { sidebarOpened, sidebarClosed, errorDialogOpened, errorDialogClosed } from './actions';

describe('uiReducer', () => {
  test('returns the passed state as it is when the dispatched action is not ui/*.', () => {
    const action: unknown = { type: 'test/sidebarOpened' };

    {
      const initialState: UIState = {
        sidebarOpen: true,
        errorDialogOpen: false,
        errorDialogContentText: '',
      };

      const state = uiReducer(initialState, action as ReturnType<typeof sidebarOpened>);
      expect(state).toEqual(initialState);
    }

    {
      const initialState: UIState = {
        sidebarOpen: false,
        errorDialogOpen: true,
        errorDialogContentText: 'test',
      };

      const state = uiReducer(initialState, action as ReturnType<typeof sidebarOpened>);
      expect(state).toEqual(initialState);
    }
  });

  test('returns a state with sidebarOpen:true when a sidebarOpened action is dispatched.', () => {
    {
      const initialState: UIState = {
        sidebarOpen: true,
        errorDialogOpen: true,
        errorDialogContentText: '',
      };

      const state = uiReducer(initialState, sidebarOpened());
      expect(state.sidebarOpen).toBe(true);
    }

    {
      const initialState: UIState = {
        sidebarOpen: false,
        errorDialogOpen: false,
        errorDialogContentText: '',
      };

      const state = uiReducer(initialState, sidebarOpened());
      expect(state.sidebarOpen).toBe(true);
    }
  });

  test('returns a state with sidebarOpen:false when a sidebarClosed action is dispatched.', () => {
    {
      const initialState: UIState = {
        sidebarOpen: true,
        errorDialogOpen: false,
        errorDialogContentText: '',
      };

      const state = uiReducer(initialState, sidebarClosed());
      expect(state.sidebarOpen).toBe(false);
    }

    {
      const initialState: UIState = {
        sidebarOpen: false,
        errorDialogOpen: true,
        errorDialogContentText: '',
      };

      const state = uiReducer(initialState, sidebarClosed());
      expect(state.sidebarOpen).toBe(false);
    }
  });

  test(
    'returns a state with errorDialogOpen:true and the given content text ' +
      'when an errorDialogOpened action is dispatched.',
    () => {
      {
        const initialState: UIState = {
          sidebarOpen: true,
          errorDialogOpen: false,
          errorDialogContentText: '',
        };

        const text = 'unexpected error occurred';
        const state = uiReducer(initialState, errorDialogOpened(text));
        expect(state.errorDialogOpen).toBe(true);
        expect(state.errorDialogContentText).toBe(text);
      }

      {
        const initialState: UIState = {
          sidebarOpen: false,
          errorDialogOpen: true,
          errorDialogContentText: 'hoge',
        };

        const text = 'foo';
        const state = uiReducer(initialState, errorDialogOpened(text));
        expect(state.errorDialogOpen).toBe(true);
        expect(state.errorDialogContentText).toBe(text);
      }
    },
  );

  test(
    'returns a state with errorDialogOpen:false and the original errorDialogContentText ' +
      'when an errorDialogClosed action is dispatched.',
    () => {
      {
        const initialState: UIState = {
          sidebarOpen: true,
          errorDialogOpen: false,
          errorDialogContentText: '',
        };

        const state = uiReducer(initialState, errorDialogClosed());
        expect(state.errorDialogOpen).toBe(false);
        expect(state.errorDialogContentText).toBe('');
      }

      {
        const initialState: UIState = {
          sidebarOpen: false,
          errorDialogOpen: true,
          errorDialogContentText: 'hoge',
        };

        const state = uiReducer(initialState, errorDialogClosed());
        expect(state.errorDialogOpen).toBe(false);
        expect(state.errorDialogContentText).toBe('hoge');
      }
    },
  );
});
