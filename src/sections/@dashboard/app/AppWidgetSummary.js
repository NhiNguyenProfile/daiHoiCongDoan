// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/iconify";
import { CardCover } from "@mui/joy";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color ,
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        width: "100%",
        textAlign: "center",
          backgroundColor: "transparent",
          
        color: {color},
        borderRadius: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "none !important",
        ...sx,
      }}
      {...other}
    >
      <CardCover style={{width: "100%", boxShadow: "none !important"}}>
        
      </CardCover>
      <CardCover/>

      <Typography  sx={{ opacity: 0.92, fontSize: "3rem", fontWeight: "900"}}>{total%1==0?fShortenNumber(total):total+"%"}</Typography>

      <Typography  sx={{ opacity: 0.72 , fontWeight: "800"}}>
        {title}
      </Typography>
    </Card>
  );
}
