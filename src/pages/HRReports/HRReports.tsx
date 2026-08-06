import { useEffect, useState } from "react";

type UserRole = "CEO" | "MANAGER" | "PM" | "DEV";

type HrUser = {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
};

const HRReports = () => {
  const [users, setUsers] = useState<HrUser[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/hr/users", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load HR users");
        }

        return response.json();
      })
      .then((data: HrUser[]) => {
        setUsers(data);
        setError("");
      })
      .catch(() => {
        setUsers([]);
        setError("Nu am putut incarca rapoartele HR.");
      });
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white p-6">
      <h1 className="mb-6 text-3xl font-bold text-[#29255E]">HR Reports</h1>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-lg border border-[#DDD6FE]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-[#EDE9FE] text-[#29255E]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id ?? user.email} className="border-t border-[#DDD6FE] text-[#29255E]">
                <td className="px-4 py-3 font-semibold">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
              </tr>
            ))}

            {users.length === 0 && !error && (
              <tr>
                <td className="px-4 py-6 text-center text-[#6B7280]" colSpan={3}>
                  Nu exista date HR de afisat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRReports;