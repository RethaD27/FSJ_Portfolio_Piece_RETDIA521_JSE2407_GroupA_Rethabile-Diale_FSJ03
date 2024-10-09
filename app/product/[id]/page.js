import { notFound } from 'next/navigation';
import { fetchProductById } from '@/app/api';
import ProductPage from './ProductPage';

/**
 * Generates metadata for the product page based on the product ID.
 * 
 * This function retrieves product details by ID and generates metadata
 * for the page, including the title and description. If the product is not
 * found, it returns a default metadata object indicating that the product 
 * could not be found.
 * 
 * @async
 * @function generateMetadata
 * @param {Object} params - Object containing route parameters.
 * @param {string} params.id - The ID of the product to fetch.
 * @returns {Promise<Object>} Metadata object containing `title` and `description`.
 * 
 * @example
 * // Usage in a Next.js page
 * export async function generateMetadata({ params }) {
 *   const metadata = await generateMetadata({ params });
 *   return metadata;
 * }
 */
export async function generateMetadata({ params }) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | QuickCart Emporium`,
    description: product.description,
  };
}

/**
 * Fetches product data by product ID.
 * 
 * This function retrieves product details based on the provided product ID. If the product
 * does not exist, it calls the `notFound()` function from Next.js to return a 404 page.
 * 
 * @async
 * @function fetchProductData
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * 
 * @throws Will trigger a 404 error if the product is not found.
 * 
 * @example
 * // Fetching a product
 * const product = await fetchProductData('12345');
 */
async function fetchProductData(id) {
  const product = await fetchProductById(id);
  if (!product) notFound();
  return product;
}

/**
 * The main page component that renders product details.
 * 
 * This function retrieves product data and passes it to the `ProductPage` component
 * for rendering. The `params` object contains the product ID needed to fetch the
 * product details.
 * 
 * @async
 * @function Page
 * @param {Object} params - Object containing route parameters.
 * @param {string} params.id - The ID of the product to fetch.
 * @returns {JSX.Element} A React component rendering the product page.
 * 
 * @example
 * // Example of rendering the page
 * export default function Page({ params }) {
 *   return <ProductPage product={product} params={params} />;
 * }
 */
export default async function Page({ params }) {
  const product = await fetchProductData(params.id);
  return <ProductPage product={product} params={params} />;
}
