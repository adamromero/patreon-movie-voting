export default function NotFound() {
   return (
      <div className="text-center px-[20px] py-[80px]">
         <h1 className="text-[32px] mb-[16px]">404 - Page Not Found</h1>

         <p className="text-[18px] mb-[24px]">
            Sorry, we couldn&#39;t find the page you&#39;re looking for.
         </p>

         <a href="/" className="underline text-[#0070f3]">
            Go back home
         </a>
      </div>
   );
}
