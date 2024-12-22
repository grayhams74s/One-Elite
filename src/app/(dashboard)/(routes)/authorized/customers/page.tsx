/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { UsersTable } from '@/app/components/UsersTable';
import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";

interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER' | 'MANAGER';
    status: 'ACTIVE' | 'INACTIVE';
}
export default function CustomersPage() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
     useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };
       fetchUsers();
    }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Separator className="border-none" />
        <UsersTable data={users} loading={loading} />
      </div>
    </div>
  );
}
