[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-v291.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
# TS-CRUD
A simple CRUD interface around localStorage, sessionStorage and fetch Api.

## Installation
`yarn add @dvelasquez/ts-crud`

or

`npm i @dvelasquez/ts-crud`

## Getting started
Import the library using `import {CRUD, RestDS} from '@dvelasquez/ts-crud';`.

Create a new datasource object using `new RestDS('http://localhost:3000/api/', {})`.

```typescript
import {Ad} from '@/store/types';
import {CRUD, RestDS} from '@dvelasquez/ts-crud';

export default class ListingService {
    private ds: CRUD;

    constructor() {
        this.ds = new RestDS('http://localhost:3000/api/', {});
    }

    public load(): Promise<Ad[]> {
        return this.ds.$read('Ads', '?filter=' + JSON.stringify({where: {}, limit: 100}))
            .then((response: any) => {
                return response;
            })
            .catch((error: any) => {
                return error;
            });
    }
}
```