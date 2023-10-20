import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services';
import { notFoundError } from '@/errors';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const booking = await bookingService.getBooking(userId);

  return res.status(httpStatus.OK).send({
    id: booking.id,
    Room: booking.Room,
  });
}

export async function bookRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  const booking = await bookingService.bookRoomById(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  const booking = await bookingService.changeBookingRoomById(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function getHotelBookings(req: AuthenticatedRequest, res: Response) {
  const {hotelId} = req.params
  if (!hotelId) throw notFoundError()
  let bookings = await bookingService.getHotelBookings(Number(hotelId))
  return res.status(httpStatus.OK).send(bookings)
}
