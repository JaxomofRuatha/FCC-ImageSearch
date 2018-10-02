/* global document window */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('query-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = `${window.location.href}search?q=${document.getElementById('query-input').value}&offset=1`;
  });
});
