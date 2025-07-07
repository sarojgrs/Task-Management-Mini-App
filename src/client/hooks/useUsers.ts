import { useEffect, useState } from "react";
import { User } from "../models/User";
import userApi from "../api/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await userApi.getAllUsers();
      setUsers(users);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error };
};
