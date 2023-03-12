const options = {
    url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'content-type': 'application/json;charset=UTF-8'
    }
}
const searchInput = document.querySelector('.search__input')

let data = []
let searchContent = ""

axios(options).then(res => {
    // console.log(res);
    data = res.data
    // console.log(data.data);
    showData()
})

const showData = () => {
    data.map(item => {
        addToPage(item)
    })
}

searchInput.addEventListener('input', (e) => {
    searchContent = e.target.value
    const coinsDiv = document.querySelector('.coins')
    coinsDiv.innerHTML = ""
    data.filter(item =>
        item.name.toLowerCase().includes(searchContent.toLowerCase())
    ).forEach(item => {
        addToPage(item)
    })
})

const addToPage = (item) => {
    console.log(item);
    const coinsDiv = document.querySelector('.coins')
    const coinDiv = document.createElement('div')
    const coinRank = document.createElement('p')
    coinRank.innerText = `${item.market_cap_rank}`
    coinRank.classList.add('coin__market-rank')
    const coinName = document.createElement('h2')
    coinName.innerText = `${item.name}`
    coinName.classList.add('coin__title')
    const coinPrice = document.createElement('p')
    coinPrice.innerText = `${item.current_price}`
    coinPrice.classList.add('coin__price')
    const marketCap = document.createElement('p')
    marketCap.innerText = item.market_cap
    marketCap.classList.add('coin__market-cap')
    const coinImg = document.createElement('img')
    coinImg.setAttribute('src', item.image)
    coinImg.classList.add('coin__market-img')
    const coinImgContainer = document.createElement('div')
    coinImgContainer.classList.add("coin__imagebox")
    coinImgContainer.appendChild(coinImg)
    coinDiv.appendChild(coinRank)
    coinDiv.appendChild(coinName)
    coinDiv.appendChild(coinPrice)
    coinDiv.appendChild(marketCap)
    coinDiv.appendChild(coinImgContainer)
    coinDiv.classList.add("coin")
    coinsDiv.appendChild(coinDiv)
}
