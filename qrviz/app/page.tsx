'use client'
import Image from "next/image";
import { useState } from "react";
import QRCode from './qr'

export default function Home() {
  const [data, setData] = useState("")
  const [QR, setQR] = useState<QRCode>(new QRCode(1, ""))
  const [dummy, setDummy] = useState(1);

  const updateState = () =>
  {
    setDummy(dummy+1)
  }

  const generate = () => {
    QR.generateQRCode();
    updateState();

  }
   return (
     <div className="p-20 w-full flex items-center justify-center flex-col">
      <input className="text-black p-2" placeholder="Data"  onChange={(v) => {
        }}/>
      <button onClick={generate}>Generator Code</button>
      <div className="w-[600px] h-[600px] bg-white flex items-center justify-center">
        <div className="w-[500px] h-[500px] flex flex-col items-center justify-center">

       {QR.matrix.map((row: boolean[], rowIndex: number) => (
         <div key={rowIndex} className="flex">
    {row.map((square: boolean, squareIndex: number) => (
      <div className={`w-4 h-4 ${square == true ? "bg-black" : "bg/white"}`} key={squareIndex}></div>
    ))}
  </div>
))} 
</div>
          </div>
   </div> 
  );
}
