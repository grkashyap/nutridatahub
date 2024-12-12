export default function Footer() {

    return (
        <>
            <div className="col-span-4 h-4 min-w-full bg-brown">
            </div>
            <footer className="bg-white mt-4 object-bottom">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-black-800 sm:text-center text-left justify-start">
                        &copy; {new Date().getFullYear()}
                        &nbsp;
                        <a href="https://www.nutridatahub.com/" className="hover:underline">Nutri Data Hub</a>. All Rights Reserved.
                    </span>
                    <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-black-800 sm:mt-0">
                        <div className="flex flex-nowrap ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6"> 
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            &nbsp;
                            Data powered by&nbsp;
                            <a href="https://world.openfoodfacts.org/data" className="hover:underline font-extrabold subpixel-antialiased text-green-600">
                                Open Food Fact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}