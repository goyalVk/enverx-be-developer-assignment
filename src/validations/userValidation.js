

const {check} = require("express-validator");
const errMessage = {
    required:"this fields is required!",
}

const { blogModel } = require("../Models/blogModels");



exports.createBlogValidation = [
    check("date").notEmpty().withMessage(errMessage.required).withMessage("date is required"),
    check("title").notEmpty().withMessage(errMessage.required).withMessage("title is required"),
    check("description").notEmpty().withMessage(errMessage.required).withMessage("description is required")
]

exports.updateBlogValidation = [ 
    check("blog_id").notEmpty().withMessage(errMessage.required).withMessage("blog_id is required"),
    check("").notEmpty().withMessage(errMessage.required).custom((value,{req})=>{
        return blogModel.findOne({_id:req.body.blog_id}).then((data)=>{
            if (!data) throw new Error("blog is not exist",400)
        })
    })
]

exports.deleteBlogValidation = [ 
    check("blog_id").notEmpty().withMessage(errMessage.required).withMessage("blog_id is required"),
    check("").notEmpty().withMessage(errMessage.required).custom((value,{req})=>{
        return blogModel.findOne({_id:req.query.blog_id}).then((data)=>{
            if (!data) throw new Error("blog_id is not exist",400)
        })
    })
]