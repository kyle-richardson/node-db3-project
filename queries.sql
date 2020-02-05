-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select ProductName, CategoryName from product
join category
on product.categoryId = category.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select distinct OrderId, ShipName 
from [order] as o
join OrderDetail as d
on o.id = d.orderId
and o.orderdate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select ProductName, quantity
from product as p
join orderdetail as d
on d.productid = p.id
where d.orderid = 10251
order by productname



-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select o.id as 'Order ID', companyname as 'Customer Company', lastname as 'Last Name'
from [order] as o
join customer as c
on o.customerid = c.id
join employee as e
on o.employeeid = e.id

--stretch

--   Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
    
--   Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.