class Music:
    def __init__(self, id_mus, name, url, external_url, artists, album):
        self.id = id_mus
        self.name = name
        self.url = url
        self.external_url = external_url
        self.artists = artists
        self.album = album
    
    def __repr__(self):
        return f"Music({self.id}, {self.name}, {self.url}, {self.external_url}, {self.artists}, {self.album})"
