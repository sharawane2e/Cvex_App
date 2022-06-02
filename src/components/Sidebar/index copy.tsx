import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import AppMenu from './AppMenu'
import "./Sidebar.scss";

const PageDashboard = () => <Typography variant="h3" component="h1">Dashboard Page</Typography>
const PageOrders = () => <Typography variant="h3" component="h1">Orders Page</Typography>
const PageCustomers = () => <Typography variant="h3" component="h1">Customers Page</Typography>
const PageReports = () => <Typography variant="h3" component="h1">Reports Page</Typography>

const SideBar: React.FC = () => {
  // const classes = useStyles()

  return (
    <BrowserRouter>
      <div >
        <CssBaseline />
        <Drawer
          variant="permanent"

        >
        </Drawer>
        <main >
          <Container maxWidth="lg" >

            <Routes>
              <Route path="/" element={<PageDashboard />} />
              <Route path="/orders" element={<PageOrders />} />
              <Route path="/customers" element={<PageCustomers />} />
              <Route path="/reports" element={<PageReports />} />
            </Routes>

          </Container>
        </main>
      </div>
    </BrowserRouter>
  )
}

const drawerWidth = 320

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     // paddingTop: theme.spacing(4),
//     // paddingBottom: theme.spacing(4),
//     background: '#051C2C',
//     color: '#fff',
//   },
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
//   container: {

//     // paddingTop: theme.spacing(4),
//     // paddingBottom: theme.spacing(4),
//   },
// }))

export default SideBar;
