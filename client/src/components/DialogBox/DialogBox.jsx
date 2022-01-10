import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const DialogBox = (props) => {
  const { title, children, openPopup, setopenPopup, btntwo } = props;

  return (
    <>
      <Dialog fullWidth open={openPopup}>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h6">
              {title}
            </Typography>

            <Button onClick={() => setopenPopup(false)}>
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>

        <DialogContent dividers>{children}</DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setopenPopup(false)} color="primary">
            {btntwo}
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default DialogBox;
