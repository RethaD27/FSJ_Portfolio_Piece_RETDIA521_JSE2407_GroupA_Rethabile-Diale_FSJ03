import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    console.log('Product ID:', params.id);

    const { id } = params;

    const paddedID = id.toString().padStart(3,"0");

    try {
        const docRef = doc(db, "products", paddedID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(JSON.stringify({ error: "Product not found"}), { status: 404 });
        }

        return NextResponse.json(docSnap.data()) 
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}




