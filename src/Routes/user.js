const express = require('express')
const router = express.Router();
const validations = require('../validations/userValidation')
const validationsReqponse = require('../Middlewares/validResponse');


var user = require('../Controllers/userController'); 
    
    console.log('qwerty')
    /*** CRUD BLOG */
    router.post("/create_blog",validations.createBlogValidation, validationsReqponse.validBodyResponse,user.create_blog);
    router.patch("/update_blog",validations.updateBlogValidation, validationsReqponse.validBodyResponse,user.update_blog);
    router.delete("/delete_blog",validations.deleteBlogValidation, validationsReqponse.validBodyResponse,user.delete_blog);
    router.get("/get_blog",user.get_blog);

    
    exports.Router = router;  
