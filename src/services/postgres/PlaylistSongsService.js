const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const { mapDBToModel } = require("../../utils");
const NotFoundError = require("../../exceptions/NotFoundError");

class PlaylistsongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistsong(songId, playlistId) {
    const checkSongQuery = {
      text: "SELECT title FROM songs WHERE id = $1",
      values: [songId],
    };
    const songResult = await this._pool.query(checkSongQuery);

    if (!songResult.rows.length) {
      throw new NotFoundError("Song Not Found");
    }
    const id = `playlistsong-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING playlist_id",
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Failed to added song");
    }

    return result.rows[0].id;
  }

  async getPlaylistsongById(id) {
    const query = {
      text: `SELECT playlists.*, users.username, songs.id as song_id, songs.title as song_title, songs.performer FROM playlists
      LEFT JOIN playlistsongs ON playlistsongs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlistsongs.song_id
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlist not found");
    }

    const songs = result.rows.map((row) => ({
      id: row.song_id,
      title: row.song_title,
      performer: row.performer,
    }));

    const playlstResult = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      username: result.rows[0].username,
      songs,
    };

    return playlstResult;
  }

  async deletePlaylistsong(songId, playlistId) {
    const query = {
      text: "DELETE FROM playlistsongs WHERE song_id = $1 AND playlist_id = $2 RETURNING id",
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Failed to deleted song");
    }
  }

  async verifyCollaborator(songId, playlistId) {
    const query = {
      text: "SELECT * FROM playlistsongs WHERE song_id = $1 AND playlist_id = $2",
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Failed to verified song");
    }
  }
}

module.exports = PlaylistsongsService;
