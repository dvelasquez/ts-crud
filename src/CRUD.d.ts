export interface CRUD {
  $read(
    key: string,
    body?: string | object,
    customHeaders?: object
  ): Promise<any>;

  $create(
    key: string,
    body: string | object,
    customHeaders?: object
  ): Promise<any>;

  $update(
    key: string,
    body: string | object,
    customHeaders?: object
  ): Promise<any>;

  $delete(
    key: string,
    body: string | object,
    customHeaders?: object
  ): Promise<any>;
}
