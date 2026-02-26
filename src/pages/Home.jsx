export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Your To-Do List
      </h2>
      <p className="text-gray-700 text-center mb-6 max-w-md">
        Organize your day, track your tasks, and never forget anything. Get
        started by adding your first task!
      </p>
     

      <div className="mt-10 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Sample Tasks
        </h3>
        <ul className="space-y-2">
          <li className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>Buy groceries</span>
            <span className="text-sm text-gray-500">Incomplete</span>
          </li>
          <li className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>Finish homework</span>
            <span className="text-sm text-gray-500">Incomplete</span>
          </li>
          <li className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>Call a friend</span>
            <span className="text-sm text-gray-500">Incomplete</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
