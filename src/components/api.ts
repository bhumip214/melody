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

// new Releases
export interface INewReleases {
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

export enum ArtistType {
  Artist = "artist"
}

// album
export interface IAlbum {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  genres: any[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  tracks: AlbumsTracks;
  type: AlbumTypeEnum;
  uri: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIDS {
  upc: string;
}

export interface AlbumsTracks {
  href: string;
  items: AlbumItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface AlbumItem {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

//FeaturedList
export interface IFeaturedList {
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
  owner: Artist;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

// Playlist
export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Artist;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

export interface PlaylistTracks {
  href: string;
  items: PlaylistItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface PlaylistItem {
  added_at: Date;
  added_by: Artist;
  is_local: boolean;
  primary_color: null;
  track: PlaylistTrack;
  video_thumbnail: VideoThumbnail;
}

export interface PlaylistTrack {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track"
}

export interface VideoThumbnail {
  url: null;
}

// Categories
export interface ICategories {
  href: string;
  items: CategoriesItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface CategoriesItem {
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

//Category
export interface CategoryPlaylists {
  href: string;
  items: CategoryPlaylistsItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface CategoryPlaylistsItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Artist;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

export enum ID {
  Spotify = "spotify",
  Spotifycharts = "spotifycharts"
}

// commonly used

export interface Followers {
  href: null;
  total: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: null | number;
  url: string;
  width: null | number;
}

export enum DisplayName {
  Spotify = "Spotify",
  Spotifycharts = "spotifycharts"
}

export enum OwnerType {
  Artist = "artist",
  User = "user"
}

export interface Artist {
  display_name?: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
  Compilation = "compilation"
}

export enum ReleaseDatePrecision {
  Day = "day",
  Month = "month",
  Year = "year"
}

export interface Tracks {
  href: string;
  total: number;
}

export enum ItemType {
  Playlist = "playlist"
}

export enum URI {
  SpotifyUserSpotify = "spotify:user:spotify",
  SpotifyUserSpotifycharts = "spotify:user:spotifycharts"
}

export interface PlayableTrack {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
  preview_url: null | string;
  track_number: number;
  uri: string;
}
