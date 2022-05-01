import React, { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './profilescreen.module.scss';
import NextLink from 'next/link';
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import { getError } from 'src/utils/routes/error.js';
import dynamic from 'next/dynamic';

const ProfileScreen: React.FC = () => {
    return <div className={styles.root}></div>;
};

export default dynamic(() => Promise.resolve(ProfileScreen), {
    ssr: false,
});
