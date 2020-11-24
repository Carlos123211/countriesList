var Countries;
var SelectedCountry;
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById(m_ID).classList.add('open');
            e.preventDefault();
        }
    }

    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        if (SelectedCountry) {
            const modal = document.getElementById('content-modal')
            const countryM = document.getElementById(SelectedCountry)
            modal.removeChild(countryM)
        }
        e.preventDefault();
    }
}, false);


const randomTop = (arr, n) => {
    let result = new Array(n)
    let len = arr.length
    let taken = new Array(len);
    if (n > len) {
        throw new RangeError('randomTop seleccionaste más elementos de los que puedes.')
    }
    while (n--) {
        let x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result
}

const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            const countries = data
            Countries = randomTop(countries, 12)
            generateTable()
        })

}

const loadDataCountry = (country) => {
    const content_modal = document.getElementById('content-modal')
    SelectedCountry = country.alpha3Code
    const div = document.createElement('div')
    div.id = country.alpha3Code
    div.classList.add('contentM')
    const img = document.createElement('img')
    img.src = country.flag
    img.width = 200;
    img.height = 200;
    const div2 = document.createElement('div')

    const p = document.createElement('p')
    p.textContent = country.region
    p.classList.add('small-margin')
    const p2 = document.createElement('p')
    p2.textContent = 'Continente'
    p.classList.add('small-margin')
    const h2 = document.createElement('h2')
    h2.textContent = country.translations.es
    h2.classList.add('small-margin')
    div.appendChild(h2)
    div.appendChild(p)
    div.appendChild(img)
    content_modal.appendChild(div)
    console.log(country)
}

const generateTable = () => {
    let table = document.getElementById('country_list');
    let tbody = document.createElement('tbody');
    const list = Countries
    console.log(list)
    for (let i = 0; i < list.length; i++) {
        tr = tbody.insertRow()
        for (let j = 0; j < 3; j++) {
            if (i == list.length - 1 && j == 3) {
                break
            } else {
                const td = tr.insertCell();
                switch (j) {
                    case 0:
                        td.appendChild(document.createTextNode(list[i].translations.es));
                        td.classList.add('country_title')
                        td.setAttribute('data-target', 'modal_caracteristicas')
                        td.setAttribute('data-toggle', 'modal')
                        td.onclick = () => { loadDataCountry(list[i]) }
                        break;

                    case 1:
                        td.appendChild(document.createTextNode(list[i].capital));
                        break;

                    case 2:
                        td.appendChild(document.createTextNode(list[i].population));
                        break;

                    default:
                        break;
                }
            }
        }
    }
    /* for (let i = 0; i < list.length; i++) {
        const tr = tbody.insertRow();
        for (let j = 0; i < 3; j++) {
            if (i == list.length - 1 && j == 2) {
                break
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode('Cell'));
            }
        }
    } */
    table.appendChild(tbody)
}


loadCountries()