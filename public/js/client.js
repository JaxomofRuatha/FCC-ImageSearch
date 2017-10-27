//Code for submit button

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#query-form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(location.href + document.querySelector("#input-url").value);
        window.location.href = location.href + "new/" +document.querySelector("#input-url").value; 
    })
});