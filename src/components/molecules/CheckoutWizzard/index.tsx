import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { Typography } from 'src/components/atoms/Typography';
import { styled } from '@mui/material/styles';

// import { StepIconProps } from '@mui/material/StepIcon';
// import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
// import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
// import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';

// const ColorlibStepIconRoot = styled('div')<{
//     ownerState: { completed?: boolean; active?: boolean };
// }>(({ theme, ownerState }) => ({
//     backgroundColor:
//         theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//     zIndex: 1,
//     color: '#fff',
//     width: 50,
//     height: 50,
//     display: 'flex',
//     borderRadius: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...(ownerState.active && {
//         backgroundImage:
//             'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//         boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//     }),
//     ...(ownerState.completed && {
//         backgroundImage:
//             'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     }),
// }));

// function ColorlibStepIcon(props: StepIconProps) {
//     const { active, completed, className } = props;

//     const icons: { [index: string]: React.ReactElement } = {
//         1: <HowToRegRoundedIcon />,
//         2: <LocalShippingRoundedIcon />,
//         3: <PaymentRoundedIcon />,
//     };

//     return (
//         <ColorlibStepIconRoot
//             ownerState={{ completed, active }}
//             className={className}
//         >
//             {icons[String(props.icon)]}
//         </ColorlibStepIconRoot>
//     );
// }

type Props = { activeStep: number };

const CheckoutWizzard: React.FC<Props> = ({ activeStep = 0 }) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {[
                'Вход',
                'Адрес доставки',
                'Способ оплаты',
                'Размещение заказа',
            ].map((step) => (
                <Step key={step}>
                    <StepLabel>
                        <Typography preset="common4" color="paragraph">
                            {step}
                        </Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default CheckoutWizzard;
