const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const div = document.querySelector(name);
    div.classList.remove('hidden');
  },
};

