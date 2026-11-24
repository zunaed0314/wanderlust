"use client";
import React from "react";
import { Button, AlertDialog } from "@heroui/react";

const DeleteButtonAction = ({ id, deleteDestinationAction, data }) => {
  return (
    <div>
      {/* <Button
        variant="danger"
        onClick={() => deleteDestinationAction(data._id)}
      >
        {" "}
        Remove
      </Button>{" "} */}
      <AlertDialog>
        <Button variant="danger">Remove</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete Destination permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>{data.destinationName}</strong> and all of its data.
                  This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  onClick={() => {
                    deleteDestinationAction(id);
                  }}
                >
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteButtonAction;
