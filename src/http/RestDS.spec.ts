import { RestDS } from '@/http/RestDS';
import fetch from 'jest-fetch-mock';

(global as any).fetch = fetch;

const successfulResponse = {
  status: 200,
  body: {
    name: 'John Snow'
  }
};

const unsuccessfulResponse = {
  status: 403,
  body: {
    name: 'ERROR'
  }
};

describe('RestDS test suite', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('$get should get data from and endpoint', () => {
    fetch.mockResponseOnce(JSON.stringify(successfulResponse));
    const ds = new RestDS('https://mockserver.net', {
      authorization: '12312313123123'
    });
    ds.$read('test').then(response => {
      expect(response.body).toEqual(successfulResponse.body);
    });
  });

  it('$get should fail to get data from and endpoint if no key is provided', () => {
    fetch.mockRejectOnce(new Error(JSON.stringify(unsuccessfulResponse)));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$read('')
      .then(response => {
        throw response;
      })
      .catch(error => {
        expect(error.message).toEqual('RESTDS: unable to make $get');
      });
  });

  it('$create should create a new item', () => {
    fetch.mockResponseOnce(JSON.stringify(successfulResponse));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$create('test', successfulResponse, {}).then(response => {
      expect(response.body).toEqual(successfulResponse.body);
    });
  });

  it('$create should fail to create a new item if key is not provided', () => {
    fetch.mockRejectOnce(new Error(JSON.stringify(unsuccessfulResponse)));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$create('', '', {})
      .then(response => {
        throw response;
      })
      .catch(error => {
        expect(error.message).toEqual('RESTDS: unable to make $post');
      });
  });

  it('$update should update an already created item', () => {
    fetch.mockResponseOnce(JSON.stringify(successfulResponse));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$update('test', successfulResponse, {}).then(response => {
      expect(response.body).toEqual(successfulResponse.body);
    });
  });

  it('$update should fail at update an already created item if no key is present', () => {
    fetch.mockRejectOnce(new Error(JSON.stringify(unsuccessfulResponse)));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$update('', '', {})
      .then(response => {
        throw response;
      })
      .catch(error => {
        expect(error.message).toEqual('RESTDS: unable to make $update');
      });
  });

  it('$delete should delete an already created item', () => {
    fetch.mockResponseOnce(JSON.stringify(successfulResponse));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$delete('test', successfulResponse, {}).then(response => {
      expect(response.body).toEqual(successfulResponse.body);
    });
  });

  it('$delete should fail at update an already created item if no key is present', () => {
    fetch.mockRejectOnce(new Error(JSON.stringify(unsuccessfulResponse)));
    const ds = new RestDS('https://mockserver.net', {});
    ds.$delete('', {}, {})
      .then(response => {
        throw response;
      })
      .catch(error => {
        expect(error.message).toEqual('RESTDS: unable to make $delete');
      });
  });

  it('$fetch should fail when making an invalid request', () => {
    const ds = new RestDS('https://mockserver.net', {});
    ds.$fetch('', '', null, null)
      .then(response => {
        throw response;
      })
      .catch(error => {
        expect(error.message).toEqual('RESTDS: Invalid request');
      });
  });

  it('headers should not be valid', () => {
    try {
      RestDS.setCustomHeaders('invalid header');
    } catch (error) {
      expect(error.message).toEqual('DSUtils: Invalid headers. invalid header');
    }
  });
});
