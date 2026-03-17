import Link from 'next/link';
import Image from 'next/image';
import img from '@/app/assets/error.png';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="max-w-md w-full text-center">
        <Image 
          src={img} 
          alt="Error 404" 
          width={400} 
          height={300} 
          className="mx-auto mb-8"
          priority
        />
        <h1 className="text-4xl font-extrabold text-secondary mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-primary text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-lime-400 transition transform active:scale-95"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;