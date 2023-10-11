import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Store } from "../utils/Store";

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of Stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
    toast.success("Product added to the cart");
    console.log("pitme add cart end");
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={300}
          layout="responsive"
          className="rounded shadow"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          onClick={addToCartHandler}
          className="primary-button"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
