// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }

    const i = Math.floor((Math.random() * array.length));
  
    return array[i];
  },
  getNextPhoto() {
    const friend = getRandomElement(friendsDB);
    const id = friend.id;
    const photo = getRandomElement(photosDB[id]);

    return {friend : friend.firstName, url : photo.url};
  },
};
