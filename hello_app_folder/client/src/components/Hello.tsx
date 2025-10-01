import React from "react";

type Props = { message: string };

 const Hello=({ message }: Props) =>{
  return <h1>{message || "Loading..."}</h1>;
}
export default Hello;