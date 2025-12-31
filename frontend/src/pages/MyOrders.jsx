const orders = [
  {
    id: "ORD123",
    status: "Delivered",
    steps: ["Placed", "Paid", "Shipped", "Delivered"],
  },
  {
    id: "ORD124",
    status: "Shipped",
    steps: ["Placed", "Paid", "Shipped"],
  },
];

const MyOrders = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-8">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border rounded-lg p-6 mb-6"
        >
          <div className="flex justify-between mb-4">
            <span className="font-medium">Order ID: {order.id}</span>
            <span className="text-primary font-semibold">
              {order.status}
            </span>
          </div>

          <div className="flex gap-4">
            {order.steps.map((step, index) => (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`h-2 rounded ${
                    index < order.steps.length
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                />
                <p className="text-xs mt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
