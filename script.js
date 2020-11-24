var Countries;
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
        e.preventDefault();
    }
}, false);


const randomTop12 = (arr, n) => {
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
    fetch('https://gist.githubusercontent.com/tiagodealmeida/0b97ccf117252d742dddf098bc6cc58a/raw/f621703926fc13be4f618fb4a058d0454177cceb/countries.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries.country
            Countries = randomTop12(countries, 12)
        })
}

loadCountries()