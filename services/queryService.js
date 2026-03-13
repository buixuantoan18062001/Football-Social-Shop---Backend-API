exports.buildQuery = (model, query) => {

 let mongoQuery = model.find();

 /* FILTER */
 const queryObj = { ...query };
 const excluded = ["page","limit","sort","search"];
 excluded.forEach(el => delete queryObj[el]);

 mongoQuery = mongoQuery.find(queryObj);

 /* SEARCH */
 if(query.search){

  const regex = new RegExp(query.search,"i");

  mongoQuery = mongoQuery.find({
   $or:[
    {title:regex},
    {name:regex},
    {email:regex}
   ]
  });

 }

 /* SORT */
 if(query.sort){

  const sortBy = query.sort.split(",").join(" ");
  mongoQuery = mongoQuery.sort(sortBy);

 }else{

  mongoQuery = mongoQuery.sort("-createdAt");

 }

 /* PAGINATION */
 const page = parseInt(query.page) || 1;
 const limit = parseInt(query.limit) || 10;
 const skip = (page-1)*limit;

 mongoQuery = mongoQuery.skip(skip).limit(limit);

 return mongoQuery;

};