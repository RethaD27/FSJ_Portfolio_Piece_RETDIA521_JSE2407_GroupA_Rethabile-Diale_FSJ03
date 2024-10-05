import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(request, { params }) {

    const { id } = params;

    const paddedID = id.toString().padStart(3,"0");

    try {
        const docRef = doc(db, "products", paddedID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(JSON.stringify({ error: "Product not found"}), { status: 404 });
        }

        return new Response(JSON.stringify(docSnap.data()), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// app/api/products/[id]/route.js
/*import { NextResponse } from "next/server";
import { fetchProductById } from "@/app/api";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const product = await fetchProductById(id);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}*/