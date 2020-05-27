function findMusics(song) {
  return fetch(`http://127.0.0.1:5000/musics/${song}`)
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
  const song = document.querySelector('#song')

  try {
    const response = await findMusics(song.value)
    song.value = ''
    const data = await response.json()
    showMusics(data)

  } catch (err) {
    console.log(err)
  }
}

function showMusics(musics) {
  const header = ['name', 'artists', 'album', 'url', 'external_url']
  const bodyTable = document.querySelector('#list-musics')
  bodyTable.innerHTML = ''
  for (let music of musics) {
    const row = document.createElement('tr')

    row.appendChild(createMusicIcon())

    for (key of header) {
      let rowValue = ''
      switch (key) {
        case 'name':
          rowValue = createDefault(music[key])
          break;
        case 'artists':
          rowValue = createDefault(music[key])
          break;
        case 'album':
          rowValue = createDefault(music[key])
          break;
        case 'url':
          rowValue = createPreview(music[key])
          break;
        case 'external_url':
          rowValue = createLinkSpotify(music[key])
          break;
      }

      // const text = document.createTextNode(music[key])
      // const col = document.createElement('td')
      // col.appendChild(text)
      // row.appendChild(col)
      row.appendChild(rowValue)
    }

    bodyTable.appendChild(row)
    table.classList.remove('hide')
  }
}

function createMusicIcon() {
  const songIcon = document.createElement('i')
  const colIcon = document.createElement('td')
  songIcon.classList.add('fas')
  songIcon.classList.add('fa-music')
  colIcon.appendChild(songIcon)

  return colIcon
}

function createDefault(text) {
  const textEl = document.createTextNode(text)
  const colText = document.createElement('td')
  colText.appendChild(textEl)

  return colText
}

function createPreview(text) {
  console.log(text)
  const sourceEl = document.createElement('source')
  sourceEl.setAttribute('src', `${text}`)
  sourceEl.setAttribute('type', 'audio/mpeg')
  const audioEl = document.createElement('audio')
  audioEl.setAttribute('controls', '')
  audioEl.setAttribute('name', 'media')

  audioEl.appendChild(sourceEl)

  const colPreview = document.createElement('td')
  colPreview.appendChild(audioEl)

  return colPreview
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