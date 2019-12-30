// UserInfo
export interface UserInfo {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

// new Releases
export interface NewReleases {
  href: string;
  items: NewReleasesItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface NewReleasesItem {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single"
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum ArtistType {
  Artist = "artist"
}

export enum ReleaseDatePrecision {
  Day = "day"
}

//FeaturedList
export interface FeaturedList {
  href: string;
  items: FeaturedListItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface FeaturedListItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

export interface Owner {
  display_name: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  type: OwnerType;
  uri: URI;
}

export enum DisplayName {
  Spotify = "Spotify"
}

export enum ID {
  Spotify = "spotify"
}

export enum OwnerType {
  User = "user"
}

export enum URI {
  SpotifyUserSpotify = "spotify:user:spotify"
}

export interface Tracks {
  href: string;
  total: number;
}

export enum ItemType {
  Playlist = "playlist"
}

// Categories
export interface Categories {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

export interface Icon {
  height: number | null;
  url: string;
  width: number | null;
}

// commonly used
export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: null | number;
  url: string;
  width: null | number;
}
