import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn){
        if ( reviews){
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
        }catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

static async addReview(movieID, user, review){
    try{
        const reviewDoc = {
            movieID: movieID,
            user: user,
            review: review
        }
        return await reviews.insertOne(reviewDoc)
    }catch (e){
        console.error(`Unable to post review: $(e)`)
        return {error: e}
    }
}

static async getReview(reviewID){
    try{
        return await reviews.findOne({_id: ObjectId(reviewID)})
    }catch(e){
        console.error(`Unable to get review: ${e}`)
        return { error: e}
    }
}

static async updateReview(reviewID, user, review){
    console.log("rev", reviewID)
}

static async updateReview(reviewID, user, review){
    try{
        const updateResponse = await reviews.updateOne(
            {_id: ObjectId(reviewID)},
            { $set: {user: user, review: review}}
        )

        return updateResponse
    }catch (e){
        console.error(`Unable to update review: ${e}`)
        return { error: e}

    }
}
static async deleteReview(reviewID){
    try{
        const deleteResponse = await reviews.deleteOne({
            _id: ObjectId(reviewID),
    })
    return deleteResponse
    }catch (e){
        console.error(`Unable to delete review: ${e}`)
        return {error: e}
    }
}

static async getReviewsByMovieID(movieID){
    try{ 
        const cursor = await reviews.find({ movieID:
        parseInt(movieID)})
        return cursor.toArray()
    }catch (e){
        console.error(`Unable to get review: ${e}`)
        return { error: e}
    }
}
}