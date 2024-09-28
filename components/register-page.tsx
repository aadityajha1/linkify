"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function RegisterPageComponent() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    setPasswordStrength(strength)
  }

  const checkUsernameAvailability = async (username: string) => {
    // Simulating an API call to check username availability
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setUsernameAvailable(username.length > 3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the registration data to your backend
    console.log("Registration submitted:", { fullName, email, username, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    checkUsernameAvailability(e.target.value)
                  }}
                  required
                />
                {isLoading && <p className="text-sm text-muted-foreground mt-1">Checking availability...</p>}
                {!isLoading && username && (
                  <p className={`text-sm mt-1 ${usernameAvailable ? 'text-green-500' : 'text-red-500'}`}>
                    {usernameAvailable ? 'Username is available' : 'Username is not available'}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    checkPasswordStrength(e.target.value)
                  }}
                  required
                />
                <div className="flex mt-2">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-1/4 mr-1 rounded-full ${
                        index < passwordStrength ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {passwordStrength === 0 && 'Very weak'}
                  {passwordStrength === 1 && 'Weak'}
                  {passwordStrength === 2 && 'Medium'}
                  {passwordStrength === 3 && 'Strong'}
                  {passwordStrength === 4 && 'Very strong'}
                </p>
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={!usernameAvailable || passwordStrength < 3}>
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}