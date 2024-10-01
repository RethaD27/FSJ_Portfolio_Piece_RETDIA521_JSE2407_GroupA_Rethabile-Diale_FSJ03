import { notFound } from 'next/navigation';
import ImageGallery from '../../components/ImageGallery';
import ReviewsSection from './ReviewsSection';
import { fetchProductById } from '@/app/api';
import GoBackButton from '../../components/GoBackButton';

export async function generateMetadata({ params }) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title}`,
    description: product.description,
    openGraph: {
      title: `${product.title} | QuickCart Emporium`,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 600, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | QuickCart Emporium`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

async function fetchProductData(id) {
  const product = await fetchProductById(id);
  if (!product) notFound();
  return product;
}

export default async function ProductPage({ params }) {
  const product = await fetchProductData(params.id);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50">
      <GoBackButton />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <ImageGallery images={product.images} />
          </div>
          <div className="md:w-1/2 p-8 bg-gradient-to-br from-white to-indigo-50">
            <h1 className="text-4xl font-bold mb-4 text-indigo-800">{product.title}</h1>
            <p className="text-3xl font-semibold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</p>
            <div className="mb-4 flex flex-wrap">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 transform hover:scale-105 transition-transform duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Rating:{' '}
              <span className="font-semibold text-yellow-500">
                {product.rating} / 5
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Stock: <span className="font-semibold">{product.stock}</span>
              {product.stock > 0 ? (
                <span className="text-green-600 ml-2 font-semibold">
                  (In Stock)
                </span>
              ) : (
                <span className="text-red-600 ml-2 font-semibold">
                  (Out of Stock)
                </span>
              )}
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Add to Cart
            </button>
          </div>
        </div>
        <ReviewsSection reviews={product.reviews} />
      </div>
    </div>
  );
}