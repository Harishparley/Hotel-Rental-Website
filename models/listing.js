const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: "listingimage",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js")

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: {
//       url :String,
//       filename : String, 
//     },
//   },
//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
//   owner : {
//     type : Schema.Types.ObjectId,
//     ref : "User",
//   },
// });

// //post mongoose middleware jb listing delte ho to usse matching reviews bhi dlete ho
// listingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

// const Listing = mongoose.model("Listing", listingSchema);

// module.exports = Listing;
