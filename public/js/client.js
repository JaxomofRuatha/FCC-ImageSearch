//Code for submit button

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#query-form').addEventListener('submit', e => {
    e.preventDefault();
    window.location.href =
      location.href +
      'search?q=' +
      document.querySelector('#query-input').value +
      '&offset=1';
  });
});
