import MockAdapter from 'axios-mock-adapter';
import { userSamples } from './models';
import { getUsers, getUser, postUser, deleteUser, deleteUsers, client, API_USERS } from './apis';

const axiosMock = new MockAdapter(client);

describe('getUsers()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with fetched users if a fetch succeeds", async () => {
    const users = [...userSamples];

    axiosMock.onGet(API_USERS).reply(200, users);

    const res = await getUsers();
    expect(res).toEqual(users);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    axiosMock.onGet(API_USERS).timeout();

    try {
      await getUsers();
      done.fail('The Promise returned by getUsers() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    axiosMock.onGet(API_USERS).reply(200, { invalid: 'data' });

    try {
      await getUsers();
      done.fail('The Promise returned by getUsers() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    axiosMock
      .onGet(API_USERS)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getUsers();
      done.fail('The Promise returned by getUsers() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('getUser()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with a fetched user if a fetch succeeds", async () => {
    const user = userSamples[0];

    axiosMock.onGet(`${API_USERS}/${user.id}`).reply(200, user);

    const res = await getUser(user.id);
    expect(res).toEqual(user);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    const user = userSamples[0];
    axiosMock.onGet(`${API_USERS}/${user.id}`).timeout();

    try {
      await getUser(user.id);
      done.fail('The Promise returned by getUser() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    const user = userSamples[0];
    axiosMock.onGet(`${API_USERS}/${user.id}`).reply(200, { invalid: 'data' });

    try {
      await getUser(user.id);
      done.fail('The Promise returned by getUser() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    const user = userSamples[0];
    axiosMock
      .onGet(`${API_USERS}/${user.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getUser(user.id);
      done.fail('The Promise returned by getUser() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('postUser()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a post succeeds", async () => {
    const user = userSamples[0];
    axiosMock.onPost(API_USERS).reply(200);

    const res = await postUser(user);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a post", async (done) => {
    const user = userSamples[0];
    axiosMock.onPost(API_USERS).timeout();

    try {
      await postUser(user);
      done.fail('The Promise returned by postUser() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a post", async (done) => {
    const user = userSamples[0];
    axiosMock
      .onPost(API_USERS)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await postUser(user);
      done.fail('The Promise returned by postUser() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteUser()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a delete request succeeds", async () => {
    const user = userSamples[0];
    axiosMock.onDelete(`${API_USERS}/${user.id}`).reply(200);

    const res = await deleteUser(user.id);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const user = userSamples[0];
    axiosMock.onDelete(`${API_USERS}/${user.id}`).timeout();

    try {
      await deleteUser(user.id);
      done.fail('The Promise returned by deleteUser() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const user = userSamples[0];
    axiosMock
      .onDelete(`${API_USERS}/${user.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await deleteUser(user.id);
      done.fail('The Promise returned by deleteUser() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteUsers()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if all delete requests succeeds", async () => {
    const users = userSamples;
    axiosMock.onDelete(`${API_USERS}/${users[0].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[1].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[2].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[3].id}`).reply(200);

    const res = await deleteUsers(users.map((user) => user.id));
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const users = userSamples;
    axiosMock.onDelete(`${API_USERS}/${users[0].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[1].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[2].id}`).timeout();
    axiosMock.onDelete(`${API_USERS}/${users[3].id}`).reply(200);

    try {
      await deleteUsers(users.map((user) => user.id));
      done.fail('The Promise returned by deleteUsers() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const users = userSamples;
    axiosMock.onDelete(`${API_USERS}/${users[0].id}`).reply(200);
    axiosMock
      .onDelete(`${API_USERS}/${users[1].id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });
    axiosMock.onDelete(`${API_USERS}/${users[2].id}`).reply(200);
    axiosMock.onDelete(`${API_USERS}/${users[3].id}`).reply(200);

    try {
      await deleteUsers(users.map((user) => user.id));
      done.fail('The Promise returned by deleteUsers() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});
