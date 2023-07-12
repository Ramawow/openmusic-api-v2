/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
    pgm.addConstraint(
        'playlists',
        'fk_playlists.owner_users.id',
        'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
    );
};

exports.down = (pgm) => {
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
};