const commFunc = require("../Modules/common");
const messages = require("../languages/en.json");
const { blogModel} = require("../Models/blogModels");
const moment = require("moment");



exports.create_blog = async (req, res) => {
    try {
       
      let payload = {date,title,image,link,description,link} = req.body;
      console.log(payload)
      payload.date = moment(new Date(payload.date))
    
      let create_blog = await blogModel.create(payload);
  
      await commFunc.returnFunctionWithToken(res, 200, create_blog, messages.BLOG_CREATED);
    } catch (e) {
      await commFunc.returnErrorMessage(res, 400, messages.UNAUTHORIZED);
    }
  };
  
  exports.update_blog = async (req, res) => {
    try {
     
      let payload = req.body;
  
      if(payload.date){
        payload.date = moment(new Date(payload.date))
      }
  
     
      let update_bog = await blogModel.findOneAndUpdate(
        {
          _id: payload.blog_id,
        },
        payload,
        {
          new: true,
        }
      );
      console
  
      await commFunc.returnFunction(res, 200, update_bog, messages.BLOG_UPDATED);
    } catch (e) {
      await commFunc.returnErrorMessage(res, 400, messages.RETURNERROR);
    }
  };
  
  exports.delete_blog = async (req, res) => {
    try {
      let payload = req.query;
  
      let delete_blog = await blogModel.findOneAndDelete({
        _id: payload.blog_id,
      });
  
      await commFunc.returnFunction(res, 200, delete_blog, messages.BLOG_DELETED);
    } catch (e) {
      await commFunc.returnErrorMessage(res, 400, messages.UNAUTHORIZED);
    }
  };
  
  exports.get_blog = async (req, res) => {
    try {
     
      let query = {};
      let skip = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.pageSize) || 15;

      if (req.query.dateFilter == 1) {
        endDate = moment().toDate();
        startDate = moment().subtract(7, "d").toDate();
      } else if (req.query.dateFilter == 2) {
        endDate = moment().toDate();
        startDate = moment(endDate).startOf('month').toDate()
      } else if (
        req.query.dateFilter == 3 &&
        req.query.fromDate &&
        req.query.endDate
      ) {
        
        req.query.fromDate = moment(new Date(req.query.fromDate)).format('YYYY/MM/DD')
        req.query.endDate = moment(new Date(req.query.endDate)).format('YYYY/MM/DD')
        startDate = moment(new Date(req.query.fromDate)).format('YYYY/MM/DD')
        endDate = moment(req.query.endDate).add(1, 'day').format('YYYY/MM/DD')
      }

  
      if (req.query.searchTerm) {
        query = {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { image: { $regex: req.query.searchTerm, $options: "i" } },
            { link: { $regex: req.query.searchTerm, $options: "i" } },
            { description: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        };
      }
  
      let aggregateQuery = [
        {
          $match: {
            ...query,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];

      if (startDate) {
        aggregateQuery = [...aggregateQuery, {
            $match: {
                createdAt: { $gte: new Date(`${startDate}`), $lt: new Date(`${endDate}`) }
            }
        }]
    }
  
      let get_blog = await commFunc.dbPaginateaggregate(
        blogModel,
        aggregateQuery,
        skip,
        limit
      )
  
      await commFunc.returnFunction(res, 200, get_blog, messages.SUCCESS);
    } catch (e) {
      await commFunc.returnErrorMessage(res, 400, messages.UNAUTHORIZED);
    }
  };