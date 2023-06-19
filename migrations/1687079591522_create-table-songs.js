/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("songs", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        title: {
            type: "TEXT",
            notNull: true,
        },
        year: {
            type: "INTEGER",
            notNull: true,
        },
        genre: {
            type: "TEXT",
            notNull: false,
        },
        performer: {
            type: "TEXT",
            notNull: true,
        },
        duration: {
            type: "INTEGER",
            notNull: false,
        },
        album_id: {
            type: "TEXT",
            notNull: false,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("songs");
};
