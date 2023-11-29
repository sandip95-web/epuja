const express = require("express");
const apiRouter = express.Router();
const Product = require("../models/product");
const { authMiddleware, authorizeRole } = require("../middleware/auth");
const User = require("../models/user");
//to add new product
apiRouter.post(
  "/admin/product/new",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      req.body.user = req.user.id;

      const product = await Product.create(req.body);
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
);

// to get the all product info or search by keyword
apiRouter.get("/product", async (req, res) => {
  try {
    const { keyword, category, page } = req.query;
    const filter = {};
    const itemsPerPage = 9;
    const currentPage = parseInt(page) || 1;

    if (keyword) {
      const regex = new RegExp(keyword, "i");
      filter.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ];
      if (category) {
        filter.category = category;
      }

      const totalProductsCount = await Product.countDocuments(filter);

      const product = await Product.find(filter)
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      if (product.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found with the provided keyword",
        });
      }

      return res.status(200).json({
        success: true,
        count: totalProductsCount,
        product,
        itemsPerPage,
      });
    } else {
      const totalProductsCount = await Product.countDocuments();
      
      const allProducts = await Product.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      res.status(200).json({
        success: true,
        count: totalProductsCount,
        product: allProducts,
        itemsPerPage,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//to get single product info by id

apiRouter.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not Found",
      });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {}
});

//to update the product
apiRouter.put(
  "/admin/product/:id",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
);

//to delete a product
apiRouter.delete(
  "/admin/product/:id",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true, message: "Product is deleted" });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
);

//to add the review for user
apiRouter.put("/product/review", authMiddleware, async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    product.rating =
      product.reviews.reduce((x, item) => item.rating + x, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });
    return res.status(200).json({ success: true, message: "Review is done" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//to get review of specific product
apiRouter.get("/reviews", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//to delete a review
apiRouter.delete("/reviews/delete", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );
    const rating =
      product.reviews.reduce((x, item) => item.rating + x, 0) / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        rating,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

module.exports = apiRouter;
