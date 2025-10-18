"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Edit, Plus, FileText, Download, Eye } from "lucide-react"

interface Exam {
  _id: string
  title: string
  description: string
  banner?: string
  registrationStartDate: string
  registrationEndDate: string
  examFee: number
  isRegistrationOpen: boolean
  resultPublished: boolean
  resultLink?: string
  answerBookLink?: string
  createdAt: string
  updatedAt: string
}

interface ExamRegistration {
  _id: string
  examId: string
  name: string
  email: string
  mobile: string
  dob: string
  examCentre: string
  languagePreference: string
  idProof: string
  optionalDocuments?: string[]
  paymentStatus: 'pending' | 'successful' | 'failed'
  paymentAmount?: number
  hallTicketGenerated: boolean
  hallTicketLink?: string
  grievance?: string
  grievanceProof?: string
  grievanceStatus: 'pending' | 'resolved'
  createdAt: string
  updatedAt: string
}

export default function ExamsManager() {
  const [exams, setExams] = useState<Exam[]>([])
  const [registrations, setRegistrations] = useState<ExamRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    banner: '',
    registrationStartDate: '',
    registrationEndDate: '',
    examFee: 0,
    isRegistrationOpen: true,
    resultPublished: false,
    resultLink: '',
    answerBookLink: ''
  })

  useEffect(() => {
    fetchExams()
    fetchRegistrations()
  }, [])

  const fetchExams = async () => {
    try {
      const response = await fetch('/api/exams')
      if (response.ok) {
        const data = await response.json()
        setExams(data)
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    try {
      // TODO: Create API endpoint for exam registrations
      // const response = await fetch('/api/exam-registrations')
      // if (response.ok) {
      //   const data = await response.json()
      //   setRegistrations(data)
      // }
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingExam ? 'PUT' : 'POST'
      const url = editingExam ? `/api/exams/${editingExam._id}` : '/api/exams'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchExams()
        setIsDialogOpen(false)
        setEditingExam(null)
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save exam:', error)
    }
  }

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam)
    setFormData({
      title: exam.title,
      description: exam.description,
      banner: exam.banner || '',
      registrationStartDate: exam.registrationStartDate.split('T')[0],
      registrationEndDate: exam.registrationEndDate.split('T')[0],
      examFee: exam.examFee,
      isRegistrationOpen: exam.isRegistrationOpen,
      resultPublished: exam.resultPublished,
      resultLink: exam.resultLink || '',
      answerBookLink: exam.answerBookLink || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exam?')) return

    try {
      const response = await fetch(`/api/exams/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchExams()
      }
    } catch (error) {
      console.error('Failed to delete exam:', error)
    }
  }

  const resetForm = () => {
    setEditingExam(null)
    setFormData({
      title: '',
      description: '',
      banner: '',
      registrationStartDate: '',
      registrationEndDate: '',
      examFee: 0,
      isRegistrationOpen: true,
      resultPublished: false,
      resultLink: '',
      answerBookLink: ''
    })
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Exams Manager</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingExam ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="banner">Banner URL (Optional)</Label>
                  <Input
                    id="banner"
                    type="url"
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationStartDate">Registration Start Date</Label>
                    <Input
                      id="registrationStartDate"
                      type="date"
                      value={formData.registrationStartDate}
                      onChange={(e) => setFormData({ ...formData, registrationStartDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationEndDate">Registration End Date</Label>
                    <Input
                      id="registrationEndDate"
                      type="date"
                      value={formData.registrationEndDate}
                      onChange={(e) => setFormData({ ...formData, registrationEndDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="examFee">Exam Fee</Label>
                  <Input
                    id="examFee"
                    type="number"
                    value={formData.examFee}
                    onChange={(e) => setFormData({ ...formData, examFee: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resultLink">Result Link (Optional)</Label>
                    <Input
                      id="resultLink"
                      type="url"
                      value={formData.resultLink}
                      onChange={(e) => setFormData({ ...formData, resultLink: e.target.value })}
                      placeholder="https://example.com/result.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="answerBookLink">Answer Book Link (Optional)</Label>
                    <Input
                      id="answerBookLink"
                      type="url"
                      value={formData.answerBookLink}
                      onChange={(e) => setFormData({ ...formData, answerBookLink: e.target.value })}
                      placeholder="https://example.com/answer-book.pdf"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingExam ? 'Update' : 'Add'} Exam
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="exams" className="space-y-6">
          <TabsList>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="exams">
            <Card className="p-6">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : exams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No exams found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Registration Period</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Fee</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam) => (
                        <tr key={exam._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{exam.title}</td>
                          <td className="py-3 px-4">
                            {new Date(exam.registrationStartDate).toLocaleDateString()} - {new Date(exam.registrationEndDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">₹{exam.examFee}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              exam.isRegistrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {exam.isRegistrationOpen ? 'Open' : 'Closed'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(exam)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(exam._id)}>
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

          <TabsContent value="registrations">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Exam Registrations</h2>
              <Button onClick={() => exportData(registrations, 'exam-registrations.csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            <Card className="p-6">
              {registrations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No registrations found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Mobile</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Hall Ticket</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration) => (
                        <tr key={registration._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{registration.name}</td>
                          <td className="py-3 px-4">{registration.email}</td>
                          <td className="py-3 px-4">{registration.mobile}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              registration.paymentStatus === 'successful' ? 'bg-green-100 text-green-800' :
                              registration.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {registration.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {registration.hallTicketGenerated ? (
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            ) : (
                              <span className="text-gray-500">Not Generated</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
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
      </div>
    </div>
  )
}