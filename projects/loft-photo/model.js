const APP_ID = 51837781;

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }

    const i = Math.floor((Math.random() * array.length));
  
    return array[i];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id)
    const photo = this.getRandomElement(photos.item);
    const photoSize = this.findSize(photo);

    return {friend, id: photo.id, url : photoSize.url};
  },

  findSize(photo) {
    const size = photo.sizes.find(size => size.width >= 360);

    return size;
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId : APP_ID,
      })

      VK.Auth.login (data => {
        if (data.session) {
          resolve(data);
        } else {
          reject(new Error ('Не удалось авторизоваться'))
        }
      }, 2, 4)
    })
  },

  callApi(method, params) {
    params.v = '5.199';

    return new Promise ((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          reject(new Error (data.error.error_msg));
        } else {
          resolve(data.response);
        }
      })
    });
  },

  async init() {
    this.friends = await this.getFriends();
  },

  photoCache: {},

  getFriends() {
    const params = {
      fields : ['photo_50', 'photo_100'],
    };

    return this.callApi('friends.get', params);
  },

  getPhotos(owner) {
    const params = {
      owner_id : owner,
    };

    return this.callApi ('photos.getAll', params);
  },

  async getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
},

};


