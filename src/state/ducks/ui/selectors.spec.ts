import { isSidebarOpen, isErrorDialogOpen, getErrorDialogContentText } from './selectors';
import { UIState } from './reducers';

describe('isSidebarOpen', () => {
  test('returns sidebarOpen in the store.', () => {
    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: true,
          errorDialogOpen: false,
          errorDialogContentText: '',
        },
      };

      const open = isSidebarOpen(state);
      expect(open).toEqual(state.ui.sidebarOpen);
    }

    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: false,
          errorDialogOpen: true,
          errorDialogContentText: '',
        },
      };

      const open = isSidebarOpen(state);
      expect(open).toEqual(state.ui.sidebarOpen);
    }
  });

  test('returns errorDialogOpen in the store.', () => {
    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: true,
          errorDialogOpen: false,
          errorDialogContentText: '',
        },
      };

      const open = isErrorDialogOpen(state);
      expect(open).toEqual(state.ui.errorDialogOpen);
    }

    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: false,
          errorDialogOpen: true,
          errorDialogContentText: '',
        },
      };

      const open = isErrorDialogOpen(state);
      expect(open).toEqual(state.ui.errorDialogOpen);
    }
  });

  test('returns errorDialogContentText in the store.', () => {
    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: true,
          errorDialogOpen: false,
          errorDialogContentText: '',
        },
      };

      const text = getErrorDialogContentText(state);
      expect(text).toEqual(state.ui.errorDialogContentText);
    }

    {
      const state: { ui: UIState } = {
        ui: {
          sidebarOpen: false,
          errorDialogOpen: true,
          errorDialogContentText: 'test foo',
        },
      };

      const text = getErrorDialogContentText(state);
      expect(text).toEqual(state.ui.errorDialogContentText);
    }
  });
});
