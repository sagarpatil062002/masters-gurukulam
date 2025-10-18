"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Trash2, Search } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  mobile: string
  message: string
  createdAt: string
  updatedAt: string
}

interface AdmissionForm {
  _id: string
  // Add admission form fields based on your model
  name: string
  email: string
  mobile: string
  course: string
  message?: string
  createdAt: string
  updatedAt: string
}

export default function ContactEnquiryManager() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [admissionForms, setAdmissionForms] = useState<AdmissionForm[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("contacts")

  useEffect(() => {
    fetchContacts()
    fetchAdmissionForms()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAdmissionForms = async () => {
    try {
      // TODO: Create API endpoint for admission forms if separate from contacts
      // For now, we'll assume admission forms are part of contacts or create a separate endpoint
      // const response = await fetch('/api/admission-forms')
      // if (response.ok) {
      //   const data = await response.json()
      //   setAdmissionForms(data)
      // }
    } catch (error) {
      console.error('Failed to fetch admission forms:', error)
    }
  }

  const handleDelete = async (id: string, type: 'contact' | 'admission') => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    try {
      const endpoint = type === 'contact' ? '/api/contacts' : '/api/admission-forms'
      const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      if (response.ok) {
        if (type === 'contact') {
          fetchContacts()
        } else {
          fetchAdmissionForms()
        }
      }
    } catch (error) {
      console.error('Failed to delete entry:', error)
    }
  }

  const exportData = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const viewDetails = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Contact & Enquiry Manager</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button onClick={() => exportData(contacts, 'contacts.csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export Contacts CSV
            </Button>
            <Button onClick={() => exportData(admissionForms, 'admission-forms.csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export Admission Forms CSV
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="contacts">Contact Messages ({contacts.length})</TabsTrigger>
            <TabsTrigger value="admissions">Admission Forms ({admissionForms.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card className="p-6">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No contact messages found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Mobile</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Message</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts
                        .filter(contact =>
                          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.message.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((contact) => (
                          <tr key={contact._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{contact.name}</td>
                            <td className="py-3 px-4">{contact.email}</td>
                            <td className="py-3 px-4">{contact.mobile}</td>
                            <td className="py-3 px-4 max-w-xs truncate">{contact.message}</td>
                            <td className="py-3 px-4">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => viewDetails(contact)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(contact._id, 'contact')}>
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
          </TabsContent>

          <TabsContent value="admissions">
            <Card className="p-6">
              {admissionForms.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No admission forms found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Mobile</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissionForms.map((form) => (
                        <tr key={form._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{form.name}</td>
                          <td className="py-3 px-4">{form.email}</td>
                          <td className="py-3 px-4">{form.mobile}</td>
                          <td className="py-3 px-4">{form.course}</td>
                          <td className="py-3 px-4">{new Date(form.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(form._id, 'admission')}>
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
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm text-gray-600">{selectedContact.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-gray-600">{selectedContact.email}</p>
                </div>
                <div>
                  <Label>Mobile</Label>
                  <p className="text-sm text-gray-600">{selectedContact.mobile}</p>
                </div>
                <div>
                  <Label>Message</Label>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}