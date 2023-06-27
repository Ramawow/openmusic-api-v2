const mapDBToModel = ({ id, name, title, year, performer, genre, duration, album_id, playlist_id, created_at,
  updated_at, user_id }) => ({
    id,
    name,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id,
    playlistId: playlist_id,
    createdAt: created_at,
    updatedAt: updated_at,
    userId: user_id,
  });

module.exports = { mapDBToModel };
