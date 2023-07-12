const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumsHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbums({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumsByIdHandler(request, h) {

    const { id } = request.params;
    const album = await this._service.getAlbumsById(id);
    const songs = await this._service.getSongsInAlbum(id);
    const getDetailAlbumWichContainsSongs = { ...album, songs };
    return {
      status: 'success',
      data: {
        album: getDetailAlbumWichContainsSongs,
      },
    };
  }

  async putAlbumsByIdHandler(request, h) {

    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumsById(id, request.payload);
    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumsByIdHandler(request, h) {

    const { id } = request.params;
    await this._service.deleteAlbumsById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;