// const ClientError = require('../../exceptions/ClientError');

// class PlaylistsongsHandler {
//     constructor(service, playlistsService, validator) {
//         this._service = service;
//         this._playlistsService = playlistsService;
//         this._validator = validator;

//         this.postPlaylistsongHandler = this.postPlaylistsongHandler.bind(this);
//         this.getPlaylistsongByIdHandler = this.getPlaylistsongByIdHandler.bind(this);
//         this.deletePlaylistsongHandler = this.deletePlaylistsongHandler.bind(this);
//     }

//     async postPlaylistsongHandler(request, h) {
//         try {
//             this._validator.validatePlaylistsongPayload(request.payload);
//             const { id: credentialId } = request.auth.credentials;
//             const { songId } = request.payload;
//             const { id: playlistId } = request.params;

//             await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
//             const playlistSongsId = await this._service.addPlaylistsong(songId, playlistId);

//             const response = h.response({
//                 status: 'success',
//                 message: 'Successfully to added song',
//                 data: {
//                     playlistSongsId,
//                 },
//             });
//             response.code(201);
//             return response;
//         } catch (error) {
//             if (error instanceof ClientError) {
//                 const response = h.response({
//                     status: 'fail',
//                     message: error.message,
//                 });
//                 response.code(error.statusCode);
//                 return response;
//             }

//             // Server ERROR!
//             const response = h.response({
//                 status: 'error',
//                 message: 'Sorry, server failed!',
//             });
//             response.code(500);
//             console.error(error);
//             return response;
//         }
//     }

//     async getPlaylistsongByIdHandler(request, h) {
//         try {
//             const { id: credentialId } = request.auth.credentials;
//             const { id: playlistId } = request.params;

//             await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
//             const songs = await this._service.getPlaylistsongById(playlistId);

//             return {
//                 status: 'success',
//                 data: {
//                     playlist: songs,
//                 },
//             };
//         } catch (error) {
//             if (error instanceof ClientError) {
//                 const response = h.response({
//                     status: 'fail',
//                     message: error.message,
//                 });
//                 response.code(error.statusCode);
//                 return response;
//             }

//             // Server ERROR!
//             const response = h.response({
//                 status: 'error',
//                 message: 'Sorry, server failed!',
//             });
//             response.code(500);
//             console.error(error);
//             return response;
//         }
//     }

//     async deletePlaylistsongHandler(request, h) {
//         try {
//             this._validator.validatePlaylistsongPayload(request.payload);
//             const { id: credentialId } = request.auth.credentials;
//             const { songId } = request.payload;
//             const { id: playlistId } = request.params;

//             await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
//             await this._service.deletePlaylistsong(songId, playlistId);

//             return {
//                 status: 'success',
//                 message: 'Successfully added song',
//             };
//         } catch (error) {
//             if (error instanceof ClientError) {
//                 const response = h.response({
//                     status: 'fail',
//                     message: error.message,
//                 });
//                 response.code(error.statusCode);
//                 return response;
//             }

//             // Server ERROR!
//             const response = h.response({
//                 status: 'error',
//                 message: 'Sorry, server failed!',
//             });
//             response.code(500);
//             console.error(error);
//             return response;
//         }
//     }
// }

// module.exports = PlaylistsongsHandler;