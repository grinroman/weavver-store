import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { Typography } from 'src/components/atoms/Typography';

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
