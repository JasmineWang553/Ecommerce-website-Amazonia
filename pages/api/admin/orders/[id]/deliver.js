import { getSession } from "next-auth/react";
import Order from "../../../../../models/Order";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("admin signin required");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = order.save();
    res.send({
      message: "order delivered successfully",
      order: deliveredOrder,
    });
  } else {
    db.disconnect();
    res.status(404).send({ message: "Error: order not found" });
  }
};

export default handler;
