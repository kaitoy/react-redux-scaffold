import {
  isUserDataReady,
  isUserDataBeingPosted,
  isUserDataBeingDeleted,
  getUsers,
  getUser,
} from './selectors';
import { UserState } from './index';
import { userSamples } from './models';

describe('isUserDataReady', () => {
  test('returns dataReady in the store.', () => {
    {
      const state: { user: UserState } = {
        user: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
      };

      const ready = isUserDataReady(state);
      expect(ready).toBe(false);
    }

    {
      const sampleZd = userSamples[0];
      const state: { user: UserState } = {
        user: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
        },
      };

      const ready = isUserDataReady(state);
      expect(ready).toBe(true);
    }
  });
});

describe('isUserDataBeingPosted', () => {
  test('returns dataBeingPosted in the store.', () => {
    {
      const state: { user: UserState } = {
        user: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
      };

      const result = isUserDataBeingPosted(state);
      expect(result).toBe(false);
    }

    {
      const sampleZd = userSamples[0];
      const state: { user: UserState } = {
        user: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
        },
      };

      const result = isUserDataBeingPosted(state);
      expect(result).toBe(true);
    }
  });
});

describe('isUserDataBeingDeleted', () => {
  test('returns dataBeingDeleted in the store.', () => {
    {
      const state: { user: UserState } = {
        user: {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
      };

      const result = isUserDataBeingDeleted(state);
      expect(result).toBe(false);
    }

    {
      const sampleZd = userSamples[0];
      const state: { user: UserState } = {
        user: {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
        },
      };

      const result = isUserDataBeingDeleted(state);
      expect(result).toBe(true);
    }
  });
});

describe('getUsers', () => {
  test('returns a list of all users in the store.', () => {
    {
      const state: { user: UserState } = {
        user: {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
      };

      const users = getUsers(state);
      expect(users).toEqual([]);
    }

    {
      const sampleZd = userSamples[0];
      const state: { user: UserState } = {
        user: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
        },
      };

      const users = getUsers(state);
      expect(users).toEqual([sampleZd]);
    }
  });
});

describe('getUser', () => {
  test('returns undefined if no user exists.', () => {
    const state: { user: UserState } = {
      user: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
      },
    };

    expect(getUser(state, 'test')).toBeUndefined();
    expect(getUser(state, '')).toBeUndefined();
  });

  test("returns undefined if users doesn't contain the specified ID.", () => {
    const user1 = userSamples[0];
    const user2 = userSamples[1];
    const user3 = userSamples[2];
    const state: { user: UserState } = {
      user: {
        dataReady: true,
        dataBeingPosted: true,
        dataBeingDeleted: true,
        data: {
          ids: [user1.id, user2.id],
          entities: {
            [user1.id]: user1,
            [user2.id]: user2,
          },
        },
      },
    };

    expect(getUser(state, user3.id)).toBeUndefined();
    expect(getUser(state, '')).toBeUndefined();
  });

  test('returns a user if users contains the specified ID.', () => {
    const user1 = userSamples[0];
    const user2 = userSamples[1];
    const state: { user: UserState } = {
      user: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: {
          ids: [user1.id, user2.id],
          entities: {
            [user1.id]: user1,
            [user2.id]: user2,
          },
        },
      },
    };

    expect(getUser(state, user1.id)).toEqual(user1);
    expect(getUser(state, user2.id)).toEqual(user2);
  });
});
