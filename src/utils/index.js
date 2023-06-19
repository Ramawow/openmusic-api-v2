const mapDBToModel = ({ id, name, title, year, performer, genre, duration, album_id, playlist_id, user_id }) => ({
  id,
  name,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
  playlistId: playlist_id,
  userId: user_id,
});

module.exports = { mapDBToModel };
