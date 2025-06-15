import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      {user && (
        <p className="text-lg">
          Hello, <span className="font-semibold">{user.email}</span>!
        </p>
      )}
      <p className="mt-2 text-sm text-gray-500">
        We’ll start tracking your budget as soon as you add an expense.
      </p>
    </div>
  );
}
