import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to fetch a product by its ID.
 * 
 * @async
 * @function
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - An object containing route parameters.
 * @param {string} params.id - The ID of the product to fetch.
 * @returns {Promise<Response>} A Promise that resolves to a Response containing the product data or an error message.
 * 
 * @example
 * // Example of calling the GET function
 * const response = await GET(request, { params: { id: '1' } });
 * const productData = await response.json();
 */
export async function GET(request, { params }) {
    console.log('Product ID:', params.id);

    const { id } = params;

    // Pad the ID to ensure it is three digits
    const paddedID = id.toString().padStart(3, "0");

    try {
        const docRef = doc(db, "products", paddedID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
        }

        return NextResponse.json(docSnap.data());
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
