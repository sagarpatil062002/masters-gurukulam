"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Edit, Plus, Shield, User, Users } from "lucide-react"

interface Admin {
  _id: string
  username: string
  email: string
  role: 'superadmin' | 'admin' | 'moderator'
  createdAt: string
  updatedAt: string
}

export default function UserRoleManagement() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin' as 'superadmin' | 'admin' | 'moderator'
  })

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin')
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingAdmin ? 'PUT' : 'POST'
      const url = editingAdmin ? `/api/admin/${editingAdmin._id}` : '/api/admin/create'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchAdmins()
        setIsDialogOpen(false)
        setEditingAdmin(null)
        setFormData({ username: '', email: '', password: '', role: 'admin' })
      }
    } catch (error) {
      console.error('Failed to save admin:', error)
    }
  }

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '', // Don't pre-fill password for security
      role: admin.role
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin user? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchAdmins()
      }
    } catch (error) {
      console.error('Failed to delete admin:', error)
    }
  }

  const resetForm = () => {
    setEditingAdmin(null)
    setFormData({ username: '', email: '', password: '', role: 'admin' })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <Shield className="h-4 w-4 text-red-500" />
      case 'admin':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'moderator':
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-red-100 text-red-800'
      case 'admin':
        return 'bg-blue-100 text-blue-800'
      case 'moderator':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User & Role Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingAdmin ? 'Edit Admin User' : 'Add New Admin User'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    Password {editingAdmin && '(Leave blank to keep current password)'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingAdmin}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value: 'superadmin' | 'admin' | 'moderator') => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingAdmin ? 'Update' : 'Add'} Admin User
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : admins.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No admin users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{admin.username}</td>
                      <td className="py-3 px-4">{admin.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(admin.role)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(admin.role)}`}>
                            {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{new Date(admin.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(admin)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(admin._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Role Permissions</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-700">Super Admin</span>
              </div>
              <ul className="text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• Manage all users and roles</li>
                <li>• System configuration</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-blue-700">Admin</span>
              </div>
              <ul className="text-gray-600 space-y-1">
                <li>• Manage content (courses, faculty, etc.)</li>
                <li>• View and export data</li>
                <li>• Handle enquiries</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-green-500" />
                <span className="font-medium text-green-700">Moderator</span>
              </div>
              <ul className="text-gray-600 space-y-1">
                <li>• View content and data</li>
                <li>• Limited editing permissions</li>
                <li>• Handle basic enquiries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}