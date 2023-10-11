import React from "react";
import Link from "next/link";

export default function DropdownLink(props) {
  let { href, children, className, onClick } = props;
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
