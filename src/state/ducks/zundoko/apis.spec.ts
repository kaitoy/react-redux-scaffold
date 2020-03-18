import MockAdapter from 'axios-mock-adapter';
import { zundokoSamples } from './models';
import {
  getZundokos,
  getZundoko,
  postZundoko,
  deleteZundoko,
  deleteZundokos,
  client,
  API_ZUNDOKOS,
} from './apis';

const axiosMock = new MockAdapter(client);

describe('getZundokos()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with fetched zundokos if a fetch succeeds", async () => {
    const zundokos = [...zundokoSamples];

    axiosMock.onGet(API_ZUNDOKOS).reply(200, zundokos);

    const res = await getZundokos();
    expect(res).toEqual(zundokos);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    axiosMock.onGet(API_ZUNDOKOS).timeout();

    try {
      await getZundokos();
      done.fail('The Promise returned by getZundokos() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    axiosMock.onGet(API_ZUNDOKOS).reply(200, { invalid: 'data' });

    try {
      await getZundokos();
      done.fail('The Promise returned by getZundokos() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    axiosMock
      .onGet(API_ZUNDOKOS)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getZundokos();
      done.fail('The Promise returned by getZundokos() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('getZundoko()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved with a fetched zundoko if a fetch succeeds", async () => {
    const zd = zundokoSamples[0];

    axiosMock.onGet(`${API_ZUNDOKOS}/${zd.id}`).reply(200, zd);

    const res = await getZundoko(zd.id);
    expect(res).toEqual(zd);
  });

  test("returns a Promise and it's rejected if timeout occurred during a fetch", async (done) => {
    const zd = zundokoSamples[0];
    axiosMock.onGet(`${API_ZUNDOKOS}/${zd.id}`).timeout();

    try {
      await getZundoko(zd.id);
      done.fail('The Promise returned by getZundoko() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if an invalid data is fetched", async (done) => {
    const zd = zundokoSamples[0];
    axiosMock.onGet(`${API_ZUNDOKOS}/${zd.id}`).reply(200, { invalid: 'data' });

    try {
      await getZundoko(zd.id);
      done.fail('The Promise returned by getZundoko() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a fetch", async (done) => {
    const zd = zundokoSamples[0];
    axiosMock
      .onGet(`${API_ZUNDOKOS}/${zd.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await getZundoko(zd.id);
      done.fail('The Promise returned by getZundoko() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('postZundoko()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a post succeeds", async () => {
    const zundoko = zundokoSamples[0];
    axiosMock.onPost(API_ZUNDOKOS).reply(200);

    const res = await postZundoko(zundoko);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a post", async (done) => {
    const zundoko = zundokoSamples[0];
    axiosMock.onPost(API_ZUNDOKOS).timeout();

    try {
      await postZundoko(zundoko);
      done.fail('The Promise returned by postZundoko() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a post", async (done) => {
    const zundoko = zundokoSamples[0];
    axiosMock
      .onPost(API_ZUNDOKOS)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await postZundoko(zundoko);
      done.fail('The Promise returned by postZundoko() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteZundoko()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if a delete request succeeds", async () => {
    const zundoko = zundokoSamples[0];
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundoko.id}`).reply(200);

    const res = await deleteZundoko(zundoko.id);
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const zundoko = zundokoSamples[0];
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundoko.id}`).timeout();

    try {
      await deleteZundoko(zundoko.id);
      done.fail('The Promise returned by deleteZundoko() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const zundoko = zundokoSamples[0];
    axiosMock
      .onDelete(`${API_ZUNDOKOS}/${zundoko.id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });

    try {
      await deleteZundoko(zundoko.id);
      done.fail('The Promise returned by deleteZundoko() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});

describe('deleteZundokos()', () => {
  beforeEach(() => axiosMock.reset());

  test("returns a Promise and it's resolved if all delete requests succeeds", async () => {
    const zundokos = zundokoSamples;
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[0].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[1].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[2].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[3].id}`).reply(200);

    const res = await deleteZundokos(zundokos.map((zd) => zd.id));
    expect(res).not.toBeNull();
  });

  test("returns a Promise and it's rejected if timeout occurred during a delete request", async (done) => {
    const zundokos = zundokoSamples;
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[0].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[1].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[2].id}`).timeout();
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[3].id}`).reply(200);

    try {
      await deleteZundokos(zundokos.map((zd) => zd.id));
      done.fail('The Promise returned by deleteZundokos() here should be rejected');
    } catch (ex) {
      // pass
    }

    done();
  });

  test("returns a Promise and it's rejected if 500 server error occurred on a delete request", async (done) => {
    const zundokos = zundokoSamples;
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[0].id}`).reply(200);
    axiosMock
      .onDelete(`${API_ZUNDOKOS}/${zundokos[1].id}`)
      .reply(500, { error: true, message: 'An unexpected error occurred.' });
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[2].id}`).reply(200);
    axiosMock.onDelete(`${API_ZUNDOKOS}/${zundokos[3].id}`).reply(200);

    try {
      await deleteZundokos(zundokos.map((zd) => zd.id));
      done.fail('The Promise returned by deleteZundokos() here should be rejected');
    } catch (ex) {
      done();
    }
  });
});
