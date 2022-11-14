import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './landingfooter.module.scss';
import { Typography } from 'src/components/atoms/Typography';
import aboutus from 'src/mocks/aboutus.json';
export const LandingFooter: React.FC = () => {
    return (
        <div className={styles.root}>
            {aboutus.map(
                (
                    element: any //FIXME: Типизация
                ) => (
                    <div className={styles.root__itemwrapper}>
                        <div className={styles.root__iconwrapper}>
                            <img
                                src={`/images/svgs/${element.imageName}.svg`}
                            ></img>
                        </div>
                        <Typography
                            preset="title3"
                            color="primary"
                            component="div"
                            align="center"
                        >
                            {element.title}
                        </Typography>
                        <Typography
                            preset="common3"
                            color="paragraph"
                            component="div"
                            align="center"
                        >
                            {element.script}
                        </Typography>
                    </div>
                )
            )}
        </div>
    );
};

export default LandingFooter;
