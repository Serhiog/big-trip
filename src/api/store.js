export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getPoints() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setPoints(points) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(points)
    );
  }

  getDestinations() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey + `-` + `destinations`)) || {};
    } catch (err) {
      return {};
    }
  }

  setDestinations(destinations) {
    this._storage.setItem(
        this._storeKey + `-` + `destinations`,
        JSON.stringify(destinations)
    );
  }

  getOffers() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey + `-` + `offers`)) || {};
    } catch (err) {
      return {};
    }
  }

  setOffers(offers) {
    this._storage.setItem(
        this._storeKey + `-` + `offers`,
        JSON.stringify(offers)
    );
  }


  setPoint(key, value) {
    const store = this.getPoints();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removePoint(key) {
    const store = this.getPoints();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
