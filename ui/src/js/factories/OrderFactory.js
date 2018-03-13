define(['ojs/ojcore'],
function (oj) {

    var OrderFactory = {

        setOrderURI: function(orderId) {
        //   return "https://private-anon-2453842a28-sttcordersms.apiary-mock.com/api/orders/" + orderId;
          return "API-GW-PLACEHOLDER/api/orders/" + orderId;
        },
        createOrderModel: function(orderId) {
            var Order = oj.Model.extend({
                urlRoot: this.setOrderURI(orderId),
                parseSave: function(request) {

                    if (request.order.payment != null) {

                        return {
                            "payment": request.order.payment,
                            "customer": {
                                "loyalty_level": request.order.customer.loyalty_level,
                                "first_name": request.order.customer.first_name,
                                "last_name": request.order.customer.last_name,
                                "phone": request.order.customer.phone,
                                "email": request.order.customer.email
                            },
                            "shipping": request.order.shipping,
                            "special_details": request.order.special_details
                        };

                    } else {

                        return {
                            "customer": {
                                "loyalty_level": request.order.customer.loyalty_level,
                                "first_name": request.order.customer.first_name,
                                "last_name": request.order.customer.last_name,
                                "phone": request.order.customer.phone,
                                "email": request.order.customer.email
                            },
                            "shipping": request.order.shipping,
                            "special_details": request.order.special_details
                        };

                    }

                },
                idAttribute: '_id'
            });
            return new Order();
        }
    };

    return OrderFactory;

});
