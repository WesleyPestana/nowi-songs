function findAlbums(album) {
  return fetch(`http://127.0.0.1:5000/albums/${album}`)
}

const form = document.querySelector('.form-search')
const table = document.querySelector('table')
form.addEventListener('submit', el => {
  el.preventDefault()
  if (table.classList.contains('hide')) {
    hidePlayers()
    setTimeout(() => {
      doSubmit()
    }, 200)
  } else {
    table.classList.add('hide')
    setTimeout(() => {
      doSubmit()
    }, 200)
  }
})

async function doSubmit() {
  const album = document.querySelector('#album')

  try {
    const response = await findAlbums(album.value)
    album.value = ''
    const data = await response.json()
    showAlbums(data)

  } catch (err) {
    console.log(err)
  }
}

function showAlbums(albums) {
  const header = ['image', 'name', 'artists', 'quantity', 'external_url']
  const bodyTable = document.querySelector('#list-albums')
  bodyTable.innerHTML = ''
  for (let album of albums) {
    const row = document.createElement('tr')

    for (key of header) {
      let rowValue = ''
      switch (key) {
        case 'name':
          rowValue = createDefault(album[key])
          break;
        case 'artists':
          rowValue = createDefault(album[key])
          break;
        case 'quantity':
          rowValue = createDefault(album[key])
          break;
        case 'image':
          rowValue = createImage(album[key])
          break;
        case 'external_url':
          rowValue = createLinkSpotify(album[key])
          break;
      }

      row.appendChild(rowValue)
    }

    bodyTable.appendChild(row)
    table.classList.remove('hide')
  }
}

function createDefault(text) {
  const textEl = document.createTextNode(text)
  const colText = document.createElement('td')
  colText.appendChild(textEl)

  return colText
}

function createImage(text) {
  const imageEl = document.createElement('img')
  imageEl.setAttribute('src', text)
  const colImage = document.createElement('td')
  colImage.appendChild(imageEl)

  return colImage
}

function createLinkSpotify(text) {
  const iconEl = document.createElement('i')
  iconEl.classList.add('fab')
  iconEl.classList.add('fa-spotify')
  const linkEl = document.createElement('a')
  linkEl.setAttribute('href', `${text}`)
  linkEl.setAttribute('target', '_blank')
  linkEl.appendChild(iconEl)

  const colLinkSpotify = document.createElement('td')
  colLinkSpotify.classList.add('text-center')
  colLinkSpotify.classList.add('spotify-icon')
  colLinkSpotify.appendChild(linkEl)

  return colLinkSpotify
}

function hidePlayers() {
  document.querySelector('.players').classList.toggle('hide')
}