import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  marginLeft: "22px",
});

const BracketSVG = () => (
  <svg
    width="15"
    height="100%"
    viewBox="0 0 15 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="3" r="3" fill="#F9A33F" />
    <circle cx="12" cy="39" r="3" fill="#F9A33F" />
    <path d="M12 3.5H1V39H12" stroke="#F9A33F" />
  </svg>
);

const Label = styled(Typography)({
  fontWeight: "bold",
  color: "#1237BF",
  marginRight: "8px",
  fontSize:"14px"
});

const Email = styled(Link)({
  marginLeft: "8px",
  textDecoration: "underline",
  color: "#000",
  fontSize:"14px"
});

const SenderReceiverInfo = ({
  senderName,
  senderEmail,
  receiverName,
  receiverEmail,
  sx = {}
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative", ...sx}}>
      <Box sx={{ position: "absolute", top: "0", bottom: "0" }}>
        <BracketSVG />
      </Box>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Label>Sender:</Label>
          <Typography sx={{fontSize:"14px"}}>{senderName},</Typography>
          <Email href={`mailto:${senderEmail}`}>{senderEmail}</Email>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
          <Label>Receiver:</Label>
          <Typography sx={{fontSize:"14px"}}>{receiverName},</Typography>
          <Email href={`mailto:${receiverEmail}`}>{receiverEmail}</Email>
        </Box>
      </Container>
    </Box>
  );
};

export default SenderReceiverInfo;
