# Product Consumer Service
This service is responsible for reading  product events from "a516817-soaring-add-to-shopping-cart-value"
which are generated by users browsing the product Product Catalogue page and adding items to the shopping cart.

The code is based on the example from Guido Schmutz:
https://github.com/gschmutz/product-soaring-clouds-sequel/tree/master/example/nodejs

## To run:

1) Clone locally all the content of this folder locally

```bash
	git clone https://github.com/luisw19/orders-microservice-soaring-clouds-sequel.git
```

2) Make sure Orders MS is up and running (check out following link for instructions on how to start it up: https://github.com/luisw19/orders-microservice-soaring-clouds-sequel/blob/master/README.md)

3) Install kafka-avro:

```bash
	npm install kafka-avro --save
```

4) Set environment variables as following:

```bash
export KAFKA_BROKER=129.150.77.116:6667
export KAFKA_REGISTRY=http://129.150.114.134:8081
export ORDERSAPI_HOST=127.0.0.1
export ORDERSAPI_PORT=3000
```

5) Then run:

```bash
	node product-subscriber-ms.js
```

6) Add a Product Item to the Kafka Topic "a516817-soaring-add-to-shopping-cart"

```bash
curl -X POST http://129.150.114.134:8080/shoppingCart -H "Content-Type: application/json" -d '{"sessionId":"abbfc4f9-83d5-49ac-9fa5-2909c5dc86e6","customerId":"232422","currency":"USD","quantity":1,"product":{"productId":"abbfc4f9-83d5-49ac-9fa5-2909c5dc86e6","code":"AX329T","name":"Light Brown Men Shoe 1","description":"Some very nice light brown shoes", "imageUrl":"01_men_one.jpg","price":68.39,"size":43,"weight":0.0,"dimension":{"unit":"cm","length":10.2,"height":10.4,"width":5.4},"color":"lightbrown","sku":"S15T-Flo-RS","tags":["tag"],"categories":["men"]}}'
```

7) Check that the Shopping Cart Order was created by running the following command (replace HOST and PORT accordingly)

```bash
curl http://$ORDERSAPI_HOST:$ORDERSAPI_PORT/orders?shoppingCart_id=232422&status=SHOPPING_CART
```

8) Add more products to Shopping Cart with same "customerId" and read again the order. See how new lines are added.
