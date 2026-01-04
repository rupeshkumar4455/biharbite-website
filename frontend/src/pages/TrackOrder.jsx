import { useEffect, useState } from "react";
import axios from "axios";
import LiveMap from "../components/LiveMap";
import { useParams } from "react-router-dom";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/orders/${id}`
    );
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000); // 10s refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Track Your Order</h2>

      {order?.riderLocation ? (
        <LiveMap
          lat={order.riderLocation.lat}
          lng={order.riderLocation.lng}
        />
      ) : (
        <p>Waiting for rider pickup…</p>
      )}
    </div>
  );
};

export default TrackOrder;
