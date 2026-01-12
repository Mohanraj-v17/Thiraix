import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div>
    

<footer className="bg-white  m-0 shadow  dark:bg-gray-800">
    <div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="/" className="hover:underline">Cinebite™</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link to="#" className="hover:underline me-4 md:me-6">Youtube</Link>
        </li>
        <li>
            <Link to="#" className="hover:underline me-4 md:me-6">Facebook</Link>
        </li>
        <li>
            <Link to="#" className="hover:underline me-4 md:me-6">Instagram</Link>
        </li>
        <li>
            <Link to="#" className="hover:underline">x</Link>
        </li>
    </ul>
    </div>
</footer>

    </div>
  )
}

export default Footer