"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      // Temporary development bypass
      localStorage.setItem("token", "development-token");
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
