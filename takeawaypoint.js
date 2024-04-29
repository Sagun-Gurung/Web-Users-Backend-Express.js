/* 
create =>post
read => get
update => patch
delete => delete



always place dynamic route at the end

we can send data from postman by three way
body, params, query

what ever sent in url will come in string
one request must have one response

middleware
    middleware are the function which has req, res, next
    next is used to trigger another middleware
    we have two form of middleware
        error middleware  (err,req,res,next)=>{}
            to trigger error middleware we have to call next(data)
        normal middleware (req,res,next)=>{}
            to trigger  normal middleware we have to call next()
    middleware is divided into parts
        route middleware
        application middleware

model convention
    first letter of model name must be capital and singular
    variable name and model name must be same
route convention
    at index it is good to use plural routes

Teacher=[
{name:"nitan",address:"gagalphedi"},
{name:"ram",address:"gokerna"},

];


Product (name, price,quantity )
schema
model
service
controller
route
index


















*/
