var model = require("../../model/shop/review");

module.exports.reviewadd = async (req, res) => {
    try {
 
        let { user_id,shop_id, comment, heading, rating } = req.body;

        if (!shop_id || !comment || !heading || !rating || !user_id) {
            return res.send({
                result: false,
                message: "insufficient parameters"
            });
        }

        if (rating < 0 || rating > 5) {
            return res.send({
                result: false,
                message: "Rating should be between 0 and 5"
            })
        }

        let checkuser = await model.checkuserQuery(user_id);
        if (checkuser.length == 0) {
            return res.send({
                result: false,
                message: "user not found"
            });
        }

        let checkshop = await model.checkshopQuery(shop_id);
        if (checkshop.length == 0) {
            return res.send({
                result: false,
                message: "shop not found"
            });
        }

        // Add review
        let reviewadd = await model.reviewaddQuery(shop_id, comment, heading, user_id, rating);

        if (reviewadd.affectedRows > 0) {

            let ratings = await model.getAllRatingsQuery(shop_id);

            if (ratings.length > 0) {
                let totalRating = ratings.reduce((acc, cur) => acc + cur.r_rating, 0);

                let avgRating = (totalRating / ratings.length).toFixed(1);

                await model.updateshopRatingQuery(shop_id, avgRating);
            }

            return res.send({
                result: true,
                message: "review added successfully and rating updated"
            });
        } else {
            return res.send({
                result: false,
                message: "failed to add review"
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};
