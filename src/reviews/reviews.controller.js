const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")

const validFields = new Set([
    "score",
    "content"
])

function hasValidFields(req, res, next) {
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data).filter(
        (field) => !validFields.has(field)
    );

    if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
    next();
}

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found.`});
}
async function list(req, res) {
    const data = await service.list(req.params.movieId) 
    res.json({data});
}
async function update(req, res,) {
    const updatedReview = {
        ...req.body.data,
        review_id : res.locals.review.review_id
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}
async function read(req, res) {
    const data = await service.read(req.params.reviewId)
    res.json({ data })
}
async function destroy (req, res) {
    const data = await service.destroy(res.locals.review.review_id)
    res.status(204).json({ data })
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
    update: [
    asyncErrorBoundary(reviewExists), hasValidFields,
    asyncErrorBoundary(update)],
    destroy: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ],
    list
}