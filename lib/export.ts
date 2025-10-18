import { Parser } from 'json2csv'

export const exportToCSV = (data: any[], filename: string) => {
  try {
    const parser = new Parser()
    const csv = parser.parse(data)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error exporting to CSV:', error)
    alert('Error exporting data. Please try again.')
  }
}

export const exportToExcel = (data: any[], filename: string) => {
  // For now, we'll use CSV export as Excel export requires additional libraries
  // In production, you might want to use libraries like 'xlsx' or 'exceljs'
  exportToCSV(data, filename.replace('.xlsx', '.csv'))
  alert('Excel export not implemented yet. CSV file downloaded instead.')
}

export const exportToPDF = (data: any[], filename: string) => {
  // PDF export would require additional libraries like 'jspdf' or 'puppeteer'
  alert('PDF export not implemented yet. Please use CSV export.')
}