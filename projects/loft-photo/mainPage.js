import pages from './pages';
import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');

    headerPhotoComp.style.backgroundImage = `url(${friend.photo_50})`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`
  },

  handleEvents() {
    let start;
    const photo = document.querySelector('.component-photo');

    photo.addEventListener('touchstart', e => {
      e.preventDefault;
      start = {y: e.changedTouches[0].pageY};
    });

    photo.addEventListener('touchend', async e => {
      const direction = e.changedTouches[0].pageY - start.y;

      if (direction < 0) {
        await this.getNextPhoto();
      }
    })
    
  },
};
