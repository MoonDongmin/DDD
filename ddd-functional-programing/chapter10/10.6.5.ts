const validateOrder : ValidateOrder = (checkProductCodeExists, checkAddressExists) => ({
    orderId,
    customerInfo,
    lines,
    shippingAddress,
    billingAddress
}: UnvalidatedOrder) => pipe(
    E.Do,
    E.bind('validId', () => ...),
)