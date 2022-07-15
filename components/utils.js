const formatDate = (timestamp) => {
    const today = new Date(timestamp * 1000);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const result = dd + '/' + mm + '/' + yyyy;
    return result
}

function stripHTML(myString) {
    let el = document.createElement("div");
    el.innerHTML = myString;
    return el.textContent || el.innerText || "";
}

export { stripHTML, formatDate }