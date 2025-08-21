import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Users, Mail, Phone, CheckCircle, XCircle, Clock as ClockIcon, Printer, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Reservation, getReservations, updateReservationStatus, getReservationById, formatReservationDateTime } from '@/lib/reservationService';

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'seated', label: 'Seated', color: 'bg-purple-100 text-purple-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

const ReservationManager = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setIsLoading(true);
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (reservationId: string, newStatus: string) => {
    try {
      await updateReservationStatus(reservationId, newStatus as any);
      await loadReservations();
      
      // Update the selected reservation if it's the one being modified
      if (selectedReservation?.id === reservationId) {
        const updatedReservation = await getReservationById(reservationId);
        if (updatedReservation) {
          setSelectedReservation(updatedReservation);
        }
      }
    } catch (error) {
      console.error('Failed to update reservation status:', error);
    }
  };

  const handlePrintReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    // Small delay to ensure state is updated before printing
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const filteredReservations = statusFilter === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === statusFilter);

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return (
      <Badge className={`${statusOption?.color} hover:opacity-80`}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Print section - only visible when printing */}
      <div className="hidden print:block">
        {selectedReservation && (
          <div className="p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-800">Crush Café</h2>
              <p className="text-gray-600">Reservation Confirmation</p>
            </div>
            
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reservation #{selectedReservation.id}</h3>
                {getStatusBadge(selectedReservation.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{selectedReservation.customerName}</p>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {formatReservationDateTime(
                        selectedReservation.reservationDate, 
                        selectedReservation.reservationTime
                      )}
                    </p>
                    <p className="text-sm text-gray-600">Date & Time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{selectedReservation.partySize} people</p>
                    <p className="text-sm text-gray-600">Party Size</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{selectedReservation.customerEmail}</p>
                    <p className="text-sm text-gray-600">Email</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{selectedReservation.customerPhone}</p>
                    <p className="text-sm text-gray-600">Phone</p>
                  </div>
                </div>
                
                {selectedReservation.specialRequests && (
                  <div className="pt-2 mt-2 border-t">
                    <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                    <p className="text-sm text-gray-600">{selectedReservation.specialRequests}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-4 mt-4 border-t text-center text-xs text-gray-500">
                <p>Thank you for choosing Crush Café!</p>
                <p>Please arrive 5-10 minutes before your reservation time.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main reservation manager UI */}
      <div className="print:hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Reservation Manager</h2>
            <p className="text-sm text-gray-500">
              Manage and track all customer reservations
            </p>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reservations</SelectItem>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredReservations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No reservations found</p>
              <p className="text-sm mt-1">
                {statusFilter === 'all' 
                  ? 'There are no reservations yet.' 
                  : `There are no ${statusFilter} reservations.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div className="font-medium">{reservation.customerName}</div>
                        <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {new Date(reservation.reservationDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.reservationTime}
                        </div>
                      </TableCell>
                      <TableCell>{reservation.partySize} people</TableCell>
                      <TableCell>
                        <Select
                          value={reservation.status}
                          onValueChange={(value) => 
                            handleStatusChange(reservation.id, value)
                          }
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintReservation(reservation)}
                          className="text-amber-600 hover:bg-amber-50"
                        >
                          <Printer className="h-4 w-4 mr-1" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationManager;
