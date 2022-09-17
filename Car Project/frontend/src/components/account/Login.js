import * as React from "react";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const loginUser = async () => {
    console.log(login)
    let response = await API.userLogin(login);
    console.log(login)
    if (response.isSuccess) {
        showError('');
        console.log(login)
        sessionStorage.setItem('Token', `Bearer ${response.data.Token}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ name: response.data.name, username: response.data.username });
        
        isUserAuthenticated(true);
        //setLogin(loginInitialValues);

        navigate('/');
    } else {
        showError('Something went wrong! please try again later');
    }
}


  const signupUser = async () => {
    console.log("Hello 1 ",signup);
    let response = await API.userSignup(signup);
    console.log("Hello 2 ",signup);
    if (response.isSuccess) {
      console.log(signup);
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  return (
    <Box>
      {account === "login" ? (
        <Box>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    value={login.email}
                    onChange={(e) => onValueChange(e)}
                    margin="normal"
                    required 
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    value={login.passsword}
                    onChange={(e) => onValueChange(e)}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => loginUser()}
                  >
                    login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => toggleSignup()}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      ) : (
        <Box>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => onInputChange(e)}
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        onChange={(e) => onInputChange(e)}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => onInputChange(e)}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => onInputChange(e)}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      {error && <Typography>{error}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => signupUser()}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => toggleSignup()}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
};

export default Login;
