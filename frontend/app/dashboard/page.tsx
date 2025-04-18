"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="text-gray-600">
            This is a development version of the dashboard.
          </p>
        </div>
     
      </div>
    </div>
  );
}
