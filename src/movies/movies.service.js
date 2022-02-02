const knex = require ("../db/connection");


const tableName = "movies"


function read(movie_id) {
    return knex(tableName).select("*").where({ movie_id }).first();
}

function listShowingMovies() {
    return knex("movies as m")
      .join("movies_theaters as mt", { "m.movie_id": "mt.movie_id" })
      .join("theaters as t", { "mt.theater_id": "t.theater_id" })
      .select("m.*")
      .where({ is_showing: true })
      .distinct();
  }

module.exports = {
    read,
    listShowingMovies
}

