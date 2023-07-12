/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('playlists', 'owner', {
        type: 'TEXT',
    });
};

exports.down = (pgm) => {
    pgm.alterColumn('playlists', 'owner', {
        type: 'VARCHAR(50)',
    });
};
