import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled('h1')({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

IndividualCard.propTypes = {
  currentPerson: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function IndividualCard({ currentPerson, index }) {
  const { code, name, role, photoURL } = currentPerson;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: "#000",
                opacity: "0.3"
              },
           
              pt: {
                sm: '100%',
              },
            }}
        >
          <StyledAvatar
            alt={name}
            src={photoURL}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 50,
                height: 50,
              }),
            }}
          />

          <StyledCover alt={name} src={photoURL} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography variant="caption" sx={{fontSize:"25px"}}>{code}</Typography>
          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h3', height: "50%", fontWeight:"900" }),
              ...((latestPostLarge || latestPost) && {
                color: '#fff',
              }),
            }}
          >
            {currentPerson.name}
          </StyledTitle>

          <Typography variant="caption" sx={{fontSize:"30px"}}>{'CĐCS ' + role}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
