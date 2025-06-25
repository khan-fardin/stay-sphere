import React, { use, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MyBookings = () => {

  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetch(`https://stay-sphere-server-ashen.vercel.app/my-bookings?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user]);

  const bookDetails = bookings.map(booking => booking.bookingDetails.find(r => r.email === user?.email));

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://stay-sphere-server-ashen.vercel.app/my-bookings/${bookingId}/booking?email=${user.email}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            Swal.fire({
              title: "Cancelled!",
              text: "Your booking has been cancelled.",
              icon: "success"
            });
            window.location.reload();
          });
      }
    })
  };

  const handleUpdateDates = (bookingId) => {

    const bookDetails = bookings.find(r => r._id == bookingId);
    const dates = bookDetails.bookingDetails.map(r => r.bookingDate);

    Swal.fire({
      title: 'Select a new booking date',
      input: 'date',
      inputLabel: 'New Date',
      inputAttributes: {
        min: new Date().toISOString().split("T")[0] // prevent past dates
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: (selectedDate) => {
        if (dates.includes(selectedDate)) {
          Swal.showValidationMessage('This date is already booked. Please choose another.');
          return false;
        }
        return selectedDate;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newDate = result.value;
        fetch(`https://stay-sphere-server-ashen.vercel.app/my-bookings/${bookingId}/update-date`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            newBookingDate: newDate
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              Swal.fire('Updated!', 'Your booking date has been updated.', 'success');
              window.location.reload(); // reload to reflect updated date
            } else {
              Swal.fire('Failed', data.message || 'Could not update date.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const handleReview = (bookingId) => {
    const targetBooking = bookings.find(r => r._id === bookingId);
    const userBooking = targetBooking.bookingDetails.find(b => b.email === user.email);

    if (userBooking.comment) return Swal.fire('Already Reviewed', 'You have already submitted a review for this booking.', 'info');

    Swal.fire({
      title: 'Leave a Review',
      html:
        '<input id="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" class="swal2-input">' +
        '<textarea id="comment" placeholder="Your comment" class="swal2-textarea"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        const rating = parseInt(document.getElementById('rating').value);
        const comment = document.getElementById('comment').value;

        if (!rating || rating < 1 || rating > 5) {
          Swal.showValidationMessage('Please enter a rating between 1 and 5.');
          return false;
        }

        if (!comment.trim()) {
          Swal.showValidationMessage('Comment cannot be empty.');
          return false;
        }

        return { rating, comment };
      },
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, comment } = result.value;

        fetch(`https://stay-sphere-server-ashen.vercel.app/reviews/${bookingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            rating,
            comment,
            commentDate: new Date().toISOString().split('T')[0]
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              Swal.fire('Thank you!', 'Your review has been submitted.', 'success');
              window.location.reload();
            } else {
              Swal.fire('Error', data.message || 'Failed to submit review.', 'error');
            }
          })
          .catch(() => Swal.fire('Error', 'Something went wrong.', 'error'));
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <h1 className='text-2xl font-black text-center my-5'>My Bookings</h1>

      <div className="container mx-auto px-4 py-8">
        {bookings.length === 0 ? (
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You don't have any bookings yet.</span>
          </div>
        ) : (
          <>
            {/* ✅ MOBILE CARD LAYOUT */}
            <div className="block sm:hidden space-y-4">
              {bookings.map(booking => (
                <div key={booking._id} className="border border-base-300 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-3">
                    <img src={booking.images} alt={booking.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{booking.name}</h3>
                      <p className="text-sm mt-2">
                        {bookDetails.bookingDate}{formatDate(booking.bookingDetails.find(r => r.email === user?.email)?.bookingDate)}
                      </p>
                      <p className="text-xs text-gray-500">1 nights</p>
                      <p className="font-bold text-base mt-1">${(booking.pricePerNight * 1.125 * 1).toFixed(2)}</p>
                      <span className={`badge mt-2 badge-success badge-sm`}>
                        confirmed
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 gap-2">
                    <button onClick={() => handleUpdateDates(booking._id)} className="btn btn-xs btn-outline btn-primary w-full">Update Date</button>
                    <button onClick={() => handleReview(booking._id)} className="btn btn-xs btn-outline btn-info w-full">Review</button>
                    <button onClick={() => handleCancel(booking._id)} className="btn btn-xs btn-outline btn-error w-full">Cancel</button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ DESKTOP TABLE LAYOUT */}
            <div className="hidden sm:block overflow-x-auto mt-6">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Room</th>
                    <th>Details</th>
                    <th>Dates</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {bookings.map(booking => (<tbody key={booking._id}>
                  <tr className="hover:bg-base-100">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img src={booking.images} alt={booking.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{booking.name}</div>
                    </td>
                    <td>
                      <div className="text-base">
                        {formatDate(booking.bookingDetails.find(r => r.email === user?.email)?.bookingDate)}
                      </div>
                      <div className="text-xs opacity-50">1 nights</div>
                    </td>
                    <td className="font-semibold">${(booking.pricePerNight * 1.125 * 1).toFixed(2)}</td>
                    <td>
                      <span className={`badge badge-success badge-md`}>
                        confirmed
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2 max-md:flex-col">
                        <button onClick={() => handleUpdateDates(booking._id)} className="btn btn-sm btn-outline btn-primary">Update Date</button>
                        <button onClick={() => handleReview(booking._id)} className="btn btn-sm btn-outline btn-info">Review</button>
                        <button onClick={() => handleCancel(booking._id)} className="btn btn-sm btn-outline btn-error">Cancel</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                ))}
              </table>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default MyBookings;