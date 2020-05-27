import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from pysongs.models.music import Music
from pysongs.models.artist import Artist
from pysongs.models.album import Album

SPOTIPY_CLIENT_ID = 'e029f2a8b3df4947a5e19cec50d042f9'
SPOTIPY_CLIENT_SECRET = 'cda1c43214ad4e73914162e64aee2ba9'

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET))


def search_music(user_search):
    musics = []
    data = spotify.search(q=user_search, limit=10, type='track')['tracks']['items']

    for music in data:
        artists = ''
        for artist in music['artists']:
            artists += artist['name']
            if len(music['artists']) > 1:
                artists += ', '

        musics.append(Music(music['id'], music['name'], music['preview_url'], music['external_urls']['spotify'], artists, music['album']['name']))
    
    return musics


def search_artist(user_search):
    artists = []
    data = spotify.search(q=user_search, limit=10, type='artist')['artists']['items']

    for artist in data:
        genres = ''
        if len(artist['genres']) > 1:
            genres = ', '.join(artist['genres'])
        
        image = '../static/img/image-not-found.png'
        if len(artist['images']) > 0:
            image = artist['images'][0]['url']
        
        artists.append(Artist(artist['id'], artist['name'], genres, artist['external_urls']['spotify'], image))
    
    return artists


def search_album(user_search):
    albums = []
    data = spotify.search(q=user_search, limit=10, type='album')['albums']['items']

    for album in data:
        artists = []
        for artist in album['artists']:
            artists.append(artist['name'])
        artists = ', '.join(artists)

        image = '../static/img/image-not-found.png'
        if len(album['images']) > 0:
            image = album['images'][0]['url']

        albums.append(Album(album['id'], album['name'], artists, album['total_tracks'], album['external_urls']['spotify'], image))

    return albums
