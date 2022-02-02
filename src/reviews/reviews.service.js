const knex = require ("../db/connection");
const mapProperties = require ("../utils/map-properties")

const tableName = "reviews"

function read(review_id) {
    return knex(tableName)
    .select("*")
    .where({ review_id })
    .first();
}
function getCritics(critic_id){
    return knex("critics")
    .select("*")
    .where({ critic_id })
    .first()
}
async function waitForCritics(reviewData){
    const critic = await getCritics(reviewData.critic_id)
    const combined = {...reviewData, critic}
    return combined;
}
function readReviewCritics(review_id) {
    return knex(tableName)
    .select("*")
    .where({ review_id })
    .first()
    .then((data)=> waitForCritics(data))
}

function list(movieId) {
    //console.log(movieId);
    return knex(tableName)
        .join("critics", `${tableName}.critic_id`, "critics.critic_id")
        .select("*")
        .where({movie_id: movieId})
        .then((data) => {
            return Promise.all(data.map((review) => {
                return waitForCritics(review)
            }))
        })
        
}
function update(updatedReview) {
    return knex(tableName)
        .join("critics", `${tableName}.critic_id`, "critics.critic_id")
        .where({ review_id: updatedReview.review_id})
        .update(updatedReview, "*")
        .then(()=> readReviewCritics(updatedReview.review_id))
  }
function destroy(review_id) {
    return knex(tableName).where({ review_id }).del()
}
module.exports = {
    read,
    update: update,
    destroy,
    list
}