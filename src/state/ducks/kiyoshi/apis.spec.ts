import MockAdapter from 'axios-mock-adapter';
import { kiyoshiSamples } from './models';
import {
  getKiyoshies,
  getKiyoshi,
  postKiyoshi,
  deleteKiyoshi,
  deleteKiyoshies,
  client,
  API_KIYOSHIES,
} from './apis';

const axiosMock = new MockAdapter(client);

describe('getKiyoshies()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with fetched kiyoshies if a fetch succeeds", async () => {
    const kiyoshies = [...kiyoshiSamples];

    axiosMock.onGet(API_KIYOSHIES).reply(200, kiyoshies);

    const res = await getKiyoshies();
    expect(res).toEqual(kiyoshies);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    axiosMock.onGet(API_KIYOSHIES).timeout();

    try {
      await getKiyoshies();
      done.fail('The Promise returned by getKiyoshies() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    axiosMock.onGet(API_KIYOSHIES).reply(200, { invalid: 'data' });

    try {
      await getKiyoshies();
      done.fail('The Promise returned by getKiyoshies() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    axiosMock
      .onGet(API_KIYOSHIES)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getKiyoshies();
      done.fail('The Promise returned by getKiyoshies() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('getKiyoshi()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with a fetched kiyoshi if a fetch succeeds", async () => {
    const kiyoshi = kiyoshiSamples[0];

    axiosMock.onGet(`${API_KIYOSHIES}/${kiyoshi.id}`).reply(200, kiyoshi);

    const res = await getKiyoshi(kiyoshi.id);
    expect(res).toEqual(kiyoshi);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onGet(`${API_KIYOSHIES}/${kiyoshi.id}`).timeout();

    try {
      await getKiyoshi(kiyoshi.id);
      done.fail('The Promise returned by getKiyoshi() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onGet(`${API_KIYOSHIES}/${kiyoshi.id}`).reply(200, { invalid: 'data' });

    try {
      await getKiyoshi(kiyoshi.id);
      done.fail('The Promise returned by getKiyoshi() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock
      .onGet(`${API_KIYOSHIES}/${kiyoshi.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getKiyoshi(kiyoshi.id);
      done.fail('The Promise returned by getKiyoshi() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('postKiyoshi()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a post succeeds", async () => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onPost(API_KIYOSHIES).reply(200);

    const res = await postKiyoshi(kiyoshi);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a post", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onPost(API_KIYOSHIES).timeout();

    try {
      await postKiyoshi(kiyoshi);
      done.fail('The Promise returned by postKiyoshi() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a post", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock
      .onPost(API_KIYOSHIES)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await postKiyoshi(kiyoshi);
      done.fail('The Promise returned by postKiyoshi() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteKiyoshi()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a delete request succeeds", async () => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshi.id}`).reply(200);

    const res = await deleteKiyoshi(kiyoshi.id);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshi.id}`).timeout();

    try {
      await deleteKiyoshi(kiyoshi.id);
      done.fail('The Promise returned by deleteKiyoshi() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const kiyoshi = kiyoshiSamples[0];
    axiosMock
      .onDelete(`${API_KIYOSHIES}/${kiyoshi.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await deleteKiyoshi(kiyoshi.id);
      done.fail('The Promise returned by deleteKiyoshi() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteKiyoshies()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if all delete requests succeeds", async () => {
    const kiyoshies = kiyoshiSamples;
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[0].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[1].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[2].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[3].id}`).reply(200);

    const res = await deleteKiyoshies(kiyoshies.map((kiyoshi) => kiyoshi.id));
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const kiyoshies = kiyoshiSamples;
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[0].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[1].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[2].id}`).timeout();
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[3].id}`).reply(200);

    try {
      await deleteKiyoshies(kiyoshies.map((kiyoshi) => kiyoshi.id));
      done.fail('The Promise returned by deleteKiyoshies() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const kiyoshies = kiyoshiSamples;
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[0].id}`).reply(200);
    axiosMock
      .onDelete(`${API_KIYOSHIES}/${kiyoshies[1].id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[2].id}`).reply(200);
    axiosMock.onDelete(`${API_KIYOSHIES}/${kiyoshies[3].id}`).reply(200);

    try {
      await deleteKiyoshies(kiyoshies.map((kiyoshi) => kiyoshi.id));
      done.fail('The Promise returned by deleteKiyoshies() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});
