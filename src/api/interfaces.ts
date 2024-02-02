export interface IArtist {
  id: string,
  name: string,
  link: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string,
  tracklist: string,
  type: "artist"
}

export interface IAlbum {
  id: number,
  title: string,
  cover: string,
  cover_small: string,
  cover_medium: string,
  cover_big: string,
  cover_xl: string,
  md5_image: string,
  tracklist: string,
  type: "album",
}

export interface ISearch {
  id: string,
  readable: boolean,
  title: string,
  title_short: string,
  title_version: string,
  link: string,
  duration: number,
  rank: number,
  explicit_lyrics: boolean,
  explicit_content_lyrics: 1 | 0
  explicit_content_cover: 1 | 0,
  preview: string,
  md5_image: string,
  artist: IArtist,
  album: IAlbum,
}
