"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { AlertDialog } from "@heroui/react";
import toast from "react-hot-toast";

const BookingCancel = ({ bookingId, deleteBookingAction }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);

      await deleteBookingAction(bookingId);

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <AlertDialog>
        <Button variant="danger">Cancel</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Cancel Booking permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>This action cannot be undone.</p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Back
                </Button>
                <Button
                  onClick={handleCancel}
                  slot="close"
                  variant="danger"
                  isDisabled={loading}
                >
                  {loading ? "Cancelling..." : "Cancel Booking"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default BookingCancel;
