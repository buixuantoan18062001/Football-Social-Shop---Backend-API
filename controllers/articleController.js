const Article = require("../models/Article");

const { buildQuery } = require("../services/queryService");

exports.getArticles = async (req, res) => {

    const query = buildQuery(
        Article.find().populate("author", "email"),
        req.query       
    );
            
    const articles = await query;


    const result = articles.map(article => ({
        ...article.toObject(),
        likeCount: article.likes.length
    }));

    res.json(result);

};

exports.getArticle = async (req, res) => {

    const article = await Article
        .findById(req.params.id)
        .populate("author");

    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }

    article.views++;

    await article.save();

    res.json(article);
};



exports.createArticle = async (req, res) => {

    const article = await Article.create({
        ...req.body,
        author: req.user.id,

    });

    res.status(201).json(article);
};



exports.likeArticle = async (req, res) => {

    const article = await Article.findById(req.params.id);

    const index = article.likes.indexOf(req.user.id);

    if (index === -1) {
        article.likes.push(req.user.id);
    } else {
        article.likes.splice(index, 1);
    }

    await article.save();

    res.json(article);
};


exports.updateArticle = async (req, res) => {

    const article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json({
            success: false,
            message: "Article not found"
        });
    }

    Object.assign(article, req.body);

    await article.save();

    res.json({
        success: true,
        message: "Article updated",
        article
    });

};


exports.deleteArticle = async (req, res) => {

    const article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json({
            success: false,
            message: "Article not found"
        });
    }

    await article.deleteOne();

    res.json({
        success: true,
        message: "Article deleted"
    });

};

// Trending Articles

exports.getTrendingArticles = async (req, res) => {

    const articles = await Article
        .find()
        .sort({ views: -1 })
        .limit(5)
        .populate("author", "email");

    const result = articles.map(article => ({
        ...article.toObject(),
        likeCount: article.likes.length
    }));

    res.json(result);

};

