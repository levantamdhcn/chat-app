import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegisterInput } from '../../../types/api';
import { SigninInput } from '../../../views/auth/Login';
import { clearState } from '../../reducers/auth';
const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;



// export { register, login, logout };